import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import { Breakpoints } from './breakpoints';
import { Colors } from './colors';
import { Typography } from './typografy';

const theme = createTheme({
  breakpoints: Breakpoints,
  palette: Colors,
  typography: Typography,
});

export const ThemeConfig = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
