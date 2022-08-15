import { Box, Button, TextField } from '@mui/material';
import React from 'react';

export const SearchComponent = ({
  inputPlaceholder,
  buttonText,
  onHandleChange,
  onHandleClick,
}) => {
  return (
    <Box alignItems='center'>
      <TextField size='small' variant='outlined' label={inputPlaceholder} onChange={onHandleChange} sx={{ marginRight: 4}}/>
      <Button onClick={onHandleClick} variant='contained'>{buttonText}</Button>
    </Box>
  );
}
