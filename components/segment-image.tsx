import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
//import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

import dynamic from "next/dynamic";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

import * as jPolygon from "../custom_libraries/jPolygon";
import { TextInput } from "flowbite-react";
import { EdgeIndicator, ParameterSet } from "@/domain/ParameterSet";

let x = 50;
const y = 50;

export default function SegmentImage({
  setAddImageVisible,
  segmentImage,
}: {
  setAddImageVisible: Function;
  segmentImage: Function;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const [image, setImage] = useState<File | undefined>();
  const [imageURL, setImageURL] = useState<string | undefined>();

  const canvasRef = useRef(null);

  const [iter_inner, setIter_inner] = useState<number>(-1);
  const [iter_outer, setIter_outer] = useState<number>(-1);
  const [alpha, setAlpha] = useState<number>(0);
  const [lambda, setLambda] = useState<number>(-1);
  const [sigma, setSigma] = useState<number>(-1);
  const [edgeIndicator, setEdgeIndicator] = useState<string>("");

  useEffect(() => {
    setAddImageVisible(open);

    //const canvas = canvasRef.current;
    const canvas = document.getElementById("draw-polygon") as HTMLCanvasElement;
    if (canvas != null) {
      const context = canvas.getContext("2d");
      const backgroundImage = new Image();
      jPolygon.setCanvas(canvas);

      if (imageURL) {
        backgroundImage.src = imageURL!;
        backgroundImage.onload = () => {
          canvas.width = backgroundImage.width; // Set canvas width to image width
          canvas.height = backgroundImage.height; // Set canvas height to image height
          context!.drawImage(backgroundImage, 0, 0);
        };
      }
    }
  }, [open, imageURL]);

  // See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    if (imageURL) {
      const bg = p5.loadImage(imageURL);
      p5.background(bg);
      p5.createCanvas(bg.width, bg.height).parent(canvasParentRef);
      console.log(bg);
    } else {
      p5.background(0);
      p5.createCanvas(500, 500).parent(canvasParentRef);
    }
  };

  const draw = (p5: p5Types) => {
    p5.ellipse(x, y, 70, 70);
    x++;
  };

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Add image
                      </Dialog.Title>
                      <div className="mt-2">
                        {/* <p className="text-sm text-gray-500">
                          Please upload your image.
                        </p> */}
                      </div>
                    </div>

                    <div
                      className={
                        "flex items-center justify-center w-full" +
                        (imageURL ? " hidden" : "")
                      }
                    >
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG or JPG
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(event) => {
                            if (event.target.files != null) {
                              handleUpload(event.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {imageURL != null ? (
                  <>
                    <p className="text-sm text-gray-500 text-center">
                      Please draw the initial contour.
                    </p>
                    <div className="flex justify-center items-center">
                      <canvas
                        id="draw-polygon"
                        className="cursor-crosshair"
                        width="640"
                        height="480"
                        ref={canvasRef}
                        onMouseDown={jPolygon.point_it}
                        onContextMenu={() => false}
                      >
                        Your browser does not support the HTML5 canvas tag.
                      </canvas>
                      <input id="coordinates" className="hidden" />
                    </div>
                  </>
                ) : null}
                <div className="row container mt-3">
                  <form className="ml-11">
                    <div className="grid md:grid-cols-2 md:gap-3">
                      <div className="relative z-0 w-full group">
                        <label htmlFor="underline_select" className="sr-only">
                          Underline select
                        </label>
                        <select
                          id="underline_select"
                          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                          onChange={(e) => setEdgeIndicator(e.target.value)}
                        >
                          <option selected>Choose an edge indicator</option>
                          <option value="scalar-difference">
                            Scalar difference
                          </option>
                          <option value="geodesic-distance">
                            Geodesic distance
                          </option>
                          <option value="euclidean-distance">
                            Euclidean distance
                          </option>
                        </select>
                      </div>
                      <div className="relative z-0 w-full group">
                        <input
                          type="number"
                          name="sigma"
                          id="sigma"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          onChange={(e) => setSigma(+e.target.value)}
                        />
                        <label
                          htmlFor="sigma"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Sigma
                        </label>
                      </div>
                      <div className="relative z-0 w-full group">
                        <input
                          type="text"
                          name="iter_inner"
                          id="iter_inner"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          onChange={(e) => setIter_inner(+e.target.value)}
                        />
                        <label
                          htmlFor="iter_inner"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Inner iterations
                        </label>
                      </div>
                      <div className="relative z-0 w-full group">
                        <input
                          type="text"
                          name="iter_outer"
                          id="iter_outer"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          onChange={(e) => setIter_outer(+e.target.value)}
                        />
                        <label
                          htmlFor="iter_outer"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Outer iterations
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="alpha"
                          id="alpha"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          onChange={(e) => setAlpha(+e.target.value)}
                        />
                        <label
                          htmlFor="alpha"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Alpha
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="lambda"
                          id="lambda"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          onChange={(e) => setLambda(+e.target.value)}
                        />
                        <label
                          htmlFor="lambda"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Lambda
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    disabled={!validParameters()}
                    className={"mt-3 ml-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto" + (validParameters() ? " bg-green-500 hover:bg-green-400 " : " bg-gray-400" )}
                    onClick={() => {
                      setOpen(false);
                      setAddImageVisible(false);
                      segmentImage(
                        (
                          document.getElementById(
                            "coordinates"
                          ) as HTMLInputElement
                        ).value || "",
                        image,
                        new ParameterSet(edgeIndicatorStringToEnum(edgeIndicator), iter_inner, iter_outer, alpha, lambda, sigma)
                      );
                      jPolygon.clear_canvas();
                    }}
                  >
                    Start
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setOpen(false);
                      setAddImageVisible(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );

  function handleUpload(newFile: File) {
    if (newFile == null) return;

    setImage(newFile);
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target != null && e.target.result != null) {
        setImageURL(e.target.result as string);
      }
    };

    reader.readAsDataURL(newFile);
  }

  function validParameters(): boolean {
    return (iter_outer > 0) &&
    (iter_inner > 0) &&
    (alpha != 0) &&
    (lambda > 0) &&
    (sigma > 0) &&
    (edgeIndicator !== null && edgeIndicator !== undefined && edgeIndicator != "") &&
    (imageURL !== null && imageURL !== undefined && imageURL != "")
    ;
  }

  function edgeIndicatorStringToEnum(edgeIndicator: string): EdgeIndicator {
    switch(edgeIndicator) {
      case "scalar-difference":
        return EdgeIndicator.SCALAR_DIFFERENCE;
      case "geodesic-distance":
        return EdgeIndicator.GEODESIC_DISTANCE;
      case "euclidean-distance":
        return EdgeIndicator.EUCLIDEAN_DISTANCE;
      default:
        return EdgeIndicator.GEODESIC_DISTANCE;
    }
  }
}
