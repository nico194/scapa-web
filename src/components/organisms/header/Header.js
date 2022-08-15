import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import navigation from '../../../configs/navigation';
import { logOut } from '../../../redux/actions/users';

export const Header = () => {
  const dispatch = useDispatch();
  const { user, loading, login } = useSelector((state) => state.users);

  // useEffect(() => {
  //     if (!login) window.location.href = '/admin'
  // }, [login])

  const linkList = navigation.map((link, index) => (
    <Button
      key={index}
      href={link.goto}
      sx={{ color: '#fff' }}
    >
      {link.text}
    </Button>
  ));

  const logOutUser = () => {
    dispatch(logOut(user));
  };

  return (
    <AppBar component='nav' position='static' sx={{ marginBottom: 5 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant='h5'>SCAPA</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {linkList}
          <Button sx={{ color: '#fff' }} onClick={logOutUser}>
            Salir
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
