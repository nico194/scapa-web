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

export const CategoriesModal = ({
  modal,
  handleModal,
  category,
  isUpdate,
  setCategory,
  createCategory,
}) => {
  const [emptyForm, setEmptyForm] = useState(null);

  const uploadImagen = (e) => {
    setCategory({
      ...category,
      previewImage: URL.createObjectURL(e.target.files[0]),
      attributes: {
        ...category.attributes,
        image_url: e.target.files[0],
      },
    });
  };

  const handleButton = () => {
    if (category.attributes.description === '' || !category.previewImage)
      return setEmptyForm(true);
    createCategory();
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
              Ingrese una nueva categoria:
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
              label='Ingrese aquí su categoría...'
              sx={{ marginBottom: 4 }}
              value={
                category.attributes.description !== ''
                  ? category.attributes.description
                  : ''
              }
              onChange={(e) =>
                setCategory({
                  ...category,
                  attributes: {
                    ...category.attributes,
                    description: e.target.value,
                  },
                })
              }
            />
            <UploadImage
              src={
                category.previewImage
                  ? category.previewImage
                  : category.attributes.image_url !== ''
                  ? `${process.env.REACT_APP_API_URL}${category.attributes.image_url}`
                  : ''
              }
              alt={category.attributes.description}
              handleImage={(e) => uploadImagen(e)}
            />
          </>
        }
        actions={
          <Grid container justifyContent='flex-end'>
            <Button sx={{ marginRight: 2 }} onClick={() => handleModal(false)}>
              Cancelar
            </Button>
            <Button variant='contained' onClick={handleButton}>
              {isUpdate ? 'Actualizar ' : 'Agregar '}Categoria
            </Button>
          </Grid>
        }
      />
    </Modal>
  );
};
