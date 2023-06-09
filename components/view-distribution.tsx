import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import SegmentImage from "./segment-image";
import { ParameterSet } from "@/domain/ParameterSet";

export default function ViewDistribution({addImageVisible, setAddImageVisible}: {addImageVisible: boolean, setAddImageVisible: Function}) {

  const [imageURL, setImageURL] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [parameterSet, setParameterSet] = useState<ParameterSet | undefined>(undefined);

  return (
    <>
    <div className="container pt-5">
      <h2 className="text-4xl font-extrabold text-white">
        Segmentation inspector
      </h2>
      <div className="flex justify-center">

      <div className="flex justify-center items-center row m-5 w-[80%] rounded bg-opacity-50">
            {
              loading ?
              <div className="flex justify-center pt-5">

                <h2 className="mb-2 text-lg font-semibold text-white">Segmenting your image:</h2>
                <ul className="max-w-md space-y-2 text-gray-300 list-inside">
                    <li className="flex items-center">
                        <svg aria-hidden="true" className="w-5 h-5 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        Upload your file to our website
                    </li>
                    <li className="flex items-center">
                        <svg aria-hidden="true" className="w-5 h-5 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        Draw the initial contour
                    </li>
                    <li className="flex items-center">
                        <svg aria-hidden="true" className="w-5 h-5 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        Define the edge indicator and parameters
                    </li>
                    <li className="flex items-center">
                        <div role="status">
                            <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        Preparing your file
                    </li>
                </ul>

              </div>
              :
              null
            }
            {
              imageURL.length > 0 ? 
              // <img src={imageURL} className="h-auto w-auto" />
              <>
              <div className="row flex justify-center">
                <img className="w-auto max-h-lg rounded-lg col-6" src={images[images.length - 1]} alt="image description" />
                <img className="w-auto max-h-lg rounded-lg col-6" src={images[images.length - 1]} alt="image description" />
              </div>
              <div className="w-full rounded-full h-2.5 bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full w-100"></div>
              </div>
              </>
              : 
              null
            }
            {
              finished ?
              <>
                <div className="row flex justify-center">
                  <img className="w-auto max-h-lg rounded-lg col-6" src={images[images.length - 1]} alt="image description" />
                  <img className="w-auto max-h-lg rounded-lg col-6" src={images[images.length - 1]} alt="image description" />
                </div>
                <label htmlFor="inspect-contour" className="block mb-2 mt-4 text-sm font-medium text-white">Inspect contour evolution</label>
                <input id="inspect-contour" type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              </>
              :
              null
            }

      </div>
      {addImageVisible == true && <SegmentImage setAddImageVisible={setAddImageVisible} segmentImage={segmentImage} />}
    </div>
    </div>
    </>
  );

  function segmentImage(coordinates: string, image: File, parameterSet: ParameterSet) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('parameters', JSON.stringify(parameterSet));

    const coordinatesJSON: {x: number, y: number}[] = JSON.parse(coordinates);
    const contour = [Math.round(coordinatesJSON[0].y), Math.round(coordinatesJSON[2].y), Math.round(coordinatesJSON[0].x), Math.round(coordinatesJSON[2].x)];
    formData.append('contour', JSON.stringify(contour));

    //formData.append('parameters', JSON.stringify(parameterSet));
    fetch('http://127.0.0.1:8000/segment', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log(data);
        openSocketConnection(data.filename);
      })
      .catch(error => {
        // Handle any errors that occurred during the API call
        console.error(error);
      });
  }

  function openSocketConnection(filename: string) {
    const reader = new FileReader();
    setLoading(true);

    reader.onload = (e) => {
      if (e.target != null && e.target.result != null){
        setImageURL(e.target.result as string);
      }
    }


    const socket = new WebSocket('ws://localhost:8000/ws');
    socket.addEventListener('open', () => {
      //const message = { filename: filename }; // Replace with your desired filename

      //socket.send(JSON.stringify(message));

      //const message = filename;
      socket.send(filename);
    });

    socket.addEventListener('message', event => {
      //console.log('Received message from server:', event.data);
      // Handle received messages from the server$
      setLoading(false);
      const url = 'data:image/png;base64,' + event.data;
      setImageURL('data:image/png;base64,' + event.data);
      const newImages = images.slice();
      newImages.push(url);
      setImages(newImages);
    });

    return () => {
      socket.close(); // Close the WebSocket connection on component unmount
    };
  }
}
