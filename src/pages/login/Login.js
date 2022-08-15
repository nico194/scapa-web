import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, clearError } from '../../redux/actions/users';
import { Spinner } from '../../components/atoms/spinner/Spinner'
import { Card } from '../../components/molecules/card/Card';
import { Container, Box, TextField, Typography, Button, Grid, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, login, err } = useSelector((state) => state.users);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    login && navigate('/categories');
  }, [login]);

  useEffect(() => {
    err && err.status === 401 && setShowAlert(true);
  }, [err]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email === '' || password === '') return setShowAlert(true);
    setShowAlert(false);
    dispatch(signIn({ email, password }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(to right bottom, #cd69cb, #47e5fe)',
      }}
    >
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          stylesCard={{
            width: 450,
            padding: 2,
            borderRadius: 5,
          }}
          image={`${process.env.PUBLIC_URL}/icon.ico`}
          stylesImage={{ width: 100, margin: '0 auto' }}
          content={
            <>
              <Typography variant='h4' textAlign='center' marginBottom={2}>
                Scapa
              </Typography>
              <Typography variant='body1' textAlign='center' marginBottom={6}>
                Sistema de Comunicacion Aumentativo y Alternativo para Personas
                con Autismo
              </Typography>
              {(err || showAlert) && (
                <Grid container marginBottom={4}>
                  <Alert
                    severity='error'
                    sx={{
                      width: '100%',
                      borderRadius: 2,
                      padding: 1,
                      paddingX: 4,
                      fontSize: 18,
                      alignItems: 'center',
                    }}
                    action={
                      <IconButton
                        color='inherit'
                        size='large'
                        onClick={() => err ? dispatch(clearError()) : setShowAlert(false)}
                      >
                        <CloseIcon fontSize='inherit' />
                      </IconButton>
                    }
                  >
                    {err ? err : 'Complete todos los datos del formulario'}
                  </Alert>
                </Grid>
              )}
              <Box paddingX={5}>
                <TextField
                  fullWidth
                  label='Email'
                  variant='outlined'
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ marginBottom: 4 }}
                />
                <TextField
                  fullWidth
                  label='Password'
                  variant='outlined'
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ marginBottom: 4 }}
                />
              </Box>
            </>
          }
          actions={
            <Box paddingX={2} width='100%'>
              <Button fullWidth variant='contained' sx={{ textAlign: 'center' }}onClick={handleSubmit}>
                { loading ? <Spinner type='light'/> : 'Ingresar'}
              </Button>
            </Box>
          }
        />
      </Container>
    </Box>
  );
};

export default Login;
