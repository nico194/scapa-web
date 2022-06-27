import React from "react";
import Pictogram from "../pictogram/Pictogram";

export default function Phrase({ phrase, from = 'other', onPictogramClick }) {

  const routine = phrase.pictograms.map((pictogram) => {
    return (
      <Pictogram
        key={pictogram.id}
        width={180}
        img={`${process.env.REACT_APP_API_URL}${pictogram.attributes.image_url}`}
        description={pictogram.attributes.description}
        onClick={() => onPictogramClick(pictogram)}
      />
    );
  });

  return (
    <>
      {
        from !== 'routine' &&
          <div className="d-flex flex-row mb-3 ">
            <i className="bi bi-circle-fill" style={{ fontSize: "1.5rem" }}></i>
            <h3 className="mx-3 mb-0">{phrase.description}</h3>
          </div>
      }
      <div className="d-flex flex-row flex-wrap">
        {routine}
      </div>
    </>
  );
}
