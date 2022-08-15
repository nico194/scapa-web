import { Grid, Typography } from '@mui/material';
import { Spinner } from '../../../atoms/spinner/Spinner';
import { Pictogram } from '../../../organisms/pictogram/Pictogram';

export const PictogramsContainer = ({pictograms , loading, onPictogramClick}) => {
	const pictogramsContainer = pictograms.map((pictogram) => {
    return (
      <Grid key={pictogram.id} sx={{ margin: 4 }}>
        <Pictogram
          img={`${process.env.REACT_APP_API_URL}${pictogram.attributes.image_url}`}
          description={pictogram.attributes.description}
          styles={{ width: '170px'}}
          onClick={() => onPictogramClick(pictogram)}
        />
      </Grid>
    );
  });

	if (loading) {
		return <Spinner type='primary'/>
	}

  return (
    <Grid container justifyContent='center' border={1} borderColor='grey.300' direction='row'>
      {Object.keys(pictograms).length > 0
        ? pictogramsContainer
        : <Typography variant='h6' sx={{ padding: 4 }}>No hay resultados</Typography>
      }
		</Grid>
  )
}
