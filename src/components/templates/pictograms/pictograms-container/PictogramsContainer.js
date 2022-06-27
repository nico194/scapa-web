import React from 'react'
import Spinner from '../../../atoms/spinner/Spinner';
import Pictogram from '../../../organisms/pictogram/Pictogram';

export default function PictogramsContainer({pictograms, loading, onPictogramClick}) {

	const pictogramsContainer = pictograms.map((pictogram) => {
    return (
      <Pictogram
        key={pictogram.id}
        width={130}
        img={`${process.env.REACT_APP_API_URL}${pictogram.attributes.image_url}`}
        description={pictogram.attributes.description}
				onClick={() => onPictogramClick(pictogram)}
      />
    );
  });

	if (loading) {
		return <Spinner />
	}

  return (
    <div className='d-flex flex-row flex-wrap border border-dark border-1 py-3 '>
			{pictogramsContainer}
		</div>
  )
}
