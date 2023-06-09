import { useEffect, useState } from "react";
import SegmentImage from "./segment-image";

export default function Credits({addImageVisible, setAddImageVisible}: {addImageVisible: boolean, setAddImageVisible: Function}) {

  return (
    <>
      <div>credits</div>
      {addImageVisible == true && <SegmentImage setAddImageVisible={setAddImageVisible} />}
    </>
  )
}