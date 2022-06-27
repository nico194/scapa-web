import React from 'react';
import Button from '@mui/material/Button';

export default function ButtonMUI({
  text = '',
  type = 'primary',
  position = 'center',
  extraClassName = '',
  onClick = () => {},
}) {
  return (
    <Button variant={type}>
      {text}
    </Button>
  );
}
