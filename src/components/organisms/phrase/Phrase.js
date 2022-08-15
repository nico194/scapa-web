import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Pictogram } from "../pictogram/Pictogram";

export const Phrase = ({ phrase, onPictogramClick, from = 'other' }) => {

  const routine = phrase.pictograms.map((pictogram) => {
    return (
      <Pictogram
        key={pictogram.id}
        img={`${process.env.REACT_APP_API_URL}${pictogram.attributes.image_url}`}
        description={pictogram.attributes.description}
        styles={{ width: '170px', marginRight: 4, marginBottom: 4 }}
        onClick={() => onPictogramClick(pictogram)}
      />
    );
  });

  return (
    <Container maxWidth='xl'>
      { from === 'other' && <Typography variant='h6' marginBottom={2} >{phrase.description}</Typography>}
      <Grid container>
        {routine}
      </Grid>
    </Container>
  );
}
