import { Box, Button, Container, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import axios from 'axios'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const CreateProduct = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')

  const handleCreateItem = (e:any) => {
    e.preventDefault()
    try {
      const data = axios.post('http://localhost:8000/products/create', { name, price, description })
    } catch (error) {
      console.log(error)
    } finally {
      setOpen(true)
      console.log('finally')
    }
  }

  const [open, setOpen] = React.useState(false)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Container sx={{ padding: '25px' }}>
      <form onSubmit={handleCreateItem}>
        <Typography
          variant='h3'
          component='h6'
          display={'flex'}
          sx={{ width: '100%', justifyContent: 'center' }}
        >
          Создание товара
        </Typography>
        <Stack direction='column' spacing={3} padding={'25px'}>
          <TextField
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant='outlined'
            label='Название'
          ></TextField>
          <TextField
            type='number'
            onChange={(e) => setPrice(Number(e.target.value))}
            fullWidth
            variant='outlined'
            label='Цена'
          ></TextField>
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            variant='outlined'
            label='Описание'
          ></TextField>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
            type='submit'
            //  onClick={handleCreateItem}
              variant='contained' endIcon={<SendIcon />}>
              Отправить
            </Button>
          </Box>
        </Stack>
      </form>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Товар создан
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default CreateProduct
