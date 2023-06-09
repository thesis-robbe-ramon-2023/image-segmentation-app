import Credits from "@/components/credits";
import SegmentImage from "@/components/segment-image";
import ViewDistribution from "@/components/view-distribution";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(0);
  const [addImageVisible, setAddImageVisible] = useState(false);

  return (
    <div className="bg-gray-900 h-screen">
      {/* <div className="absolute bottom-0 left-0 flex">
        <img
          src="kuleuven-logo.png"
          alt="Your Image"
          className="m-4 w-32"
        />
        <p>Tool was developed in the context of Robbe Ramon's master's thesis.</p>
      </div> */}

      <Head>
        <title>Image segmentation</title>
        <meta name="description" content="Created by Robbe Ramon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {page == 0 && <ViewDistribution addImageVisible={addImageVisible} setAddImageVisible={setAddImageVisible}></ViewDistribution>}

        {/* {page == 1 && <SegmentImage></SegmentImage>} */}

        {page == 2 && <Credits addImageVisible={addImageVisible} setAddImageVisible={setAddImageVisible}></Credits>}


        <div className="fixed z-50 w-full h-16 max-w-xs -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
          <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
            <button
              data-tooltip-target="tooltip-home"
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
              onClick={() => setPage(0)}
            >
              <svg
                className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
              <span className="sr-only">Segment</span>
            </button>
            <div
              id="tooltip-home"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Segment
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div className="flex items-center justify-center">
              <button
                data-tooltip-target="tooltip-new"
                type="button"
                className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => setAddImageVisible(true)}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414l8.128-8.127a1 1 0 00-1.414-1.414L10 8.586l-1.42-1.42A3.5 3.5 0 005.5 2zM4 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                  ></path>
                  <path d="M12.828 11.414a1 1 0 00-1.414 1.414l3.879 3.88a1 1 0 001.414-1.415l-3.879-3.879z"></path>
                </svg>
                <span className="sr-only">New item</span>
              </button>
            </div>
            <div
              id="tooltip-new"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Segment
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              data-tooltip-target="tooltip-profile"
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
              onClick={() => setPage(2)}
            >
              <svg
                className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                ></path>
              </svg>
              <span className="sr-only">Profile</span>
            </button>
            <div
              id="tooltip-profile"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Profile
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
