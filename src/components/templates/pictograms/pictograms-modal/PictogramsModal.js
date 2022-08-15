import {
  Alert,
  AlertTitle,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import UploadImage from '../../../atoms/upload-image/UploadImage';
import { Card } from '../../../molecules/card/Card';
import { Modal } from '../../../molecules/modal/Modal';
import { CategoriesSelect } from '../../categories/categories-select/CategoriesSelect';

export const PictogramsModal = ({
  user,
  modal,
  handleModal,
  pictogram,
  isUpdate,
  setPictogram,
  createPictogram,
}) => {
  const [emptyForm, setEmptyForm] = useState(null);

  const selectCategory = (category) => {
    setPictogram({
      ...pictogram,
      relationships: { classifiable: { data: { id: category } } },
    });
  };

  const uploadImagen = (e) => {
    setPictogram({
      ...pictogram,
      previewImage: URL.createObjectURL(e.target.files[0]),
      attributes: {
        ...pictogram.attributes,
        image_url: e.target.files[0],
      },
    });
  };

  const handleButton = () => {
    const imageValidation = isUpdate ? pictogram.attributes.image_url === '' : !pictogram.previewImage 
    if (pictogram.attributes.description === '' || imageValidation )
      return setEmptyForm(true);
    createPictogram();
  };

  return (
    <Modal modal={modal} onClose={handleModal}>
      <Card
        stylesCard={{
          width: 450,
          padding: 2,
          borderRadius: 2,
        }}
        content={
          <>
            <Typography variant='h5' marginBottom={4}>
              Ingrese un nuevo pictograma:
            </Typography>
            {emptyForm && (
              <Alert
                severity='error'
                sx={{ marginBottom: 4 }}
                onClose={() => setEmptyForm(false)}
              >
                <AlertTitle>Error</AlertTitle>
                  Por favor, complete el formulario.
                </Alert>
            )}
            <TextField
              fullWidth
              label='Ingrese aquí su pictograma...'
              sx={{ marginBottom: 4 }}
              value={
                pictogram.attributes.description !== ''
                  ? pictogram.attributes.description
                  : ''
              }
              onChange={(e) =>
                setPictogram({
                  ...pictogram,
                  attributes: {
                    ...pictogram.attributes,
                    description: e.target.value,
                  },
                })
              }
            />
            <Grid container justifyContent='space-between' alignItems='baseline' marginBottom={4}>
              <Grid item>
                <Typography variant='h6' >Seleccione una categoria:</Typography>
              </Grid>
              <Grid item>
                <CategoriesSelect
                  user={user}
                  categorySelected={pictogram.relationships.classifiable.data.id}
                  selectCategory={(id) => selectCategory(id)} 
                />
              </Grid>
            </Grid>
            <UploadImage
              src={
                pictogram.previewImage
                  ? pictogram.previewImage
                  : pictogram.attributes.image_url !== ''
                  ? `${process.env.REACT_APP_API_URL}${pictogram.attributes.image_url}`
                  : ''
              }
              alt={pictogram.attributes.description}
              handleImage={(e) => uploadImagen(e)}
            />
          </>
        }
        actions={
          <Grid container justifyContent='flex-end'>
            <Button variant='text' sx={{ marginRight: 2 }} onClick={() => handleModal(false)}>
              Cancelar
            </Button>
            <Button variant='contained' onClick={handleButton}>
              {isUpdate ? 'Actualizar ' : 'Agregar '}Pictograma
            </Button>
          </Grid>
        }
      />
    </Modal>
  );
};

