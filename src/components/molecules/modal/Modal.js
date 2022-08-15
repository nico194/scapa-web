import { Box, Container, Modal as ModalUI } from '@mui/material'

export const Modal = ({ children, modal, handleModal }) => {
  return (
    <ModalUI
      open={modal}
      onClose={handleModal}
    >
      <Box
        sx={{
          display: 'flex',
          margin: '0 auto',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
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
          { children }
        </Container>
      </Box>
    </ModalUI>
  ) 
}
