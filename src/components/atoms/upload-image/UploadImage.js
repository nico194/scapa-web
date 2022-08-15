import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

export default function UploadImage({ handleImage, src, alt }) {
  return (
    <Grid container direction='column'>
      <Grid item container justifyContent='space-between' marginBottom={4}>
        <Typography variant='h6'>Selecciona una imagen:</Typography>
        <Button variant='contained' component='label'>
          Seleccionar
          <input
            hidden
            accept='image/*'
            multiple
            type='file'
            onChange={handleImage}
          />
        </Button>
      </Grid>
      {src !== '' && (
        <Grid item container justifyContent='center'>
          <img style={{ height: '150px' }} src={src} alt={alt} loading='lazy' />
        </Grid>
      )}
    </Grid>
  );
}
