import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TableItem from './TableItem'
import SendIcon from '@mui/icons-material/Send'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})
interface IAxios {
  product: IProduct[]
}
export interface IProduct {
  id: number
  name: string
  price: number
  description: string
  count: number
  FullProductCost: number
}
export type Basket = Pick<IProduct, 'id' | 'count'>
const Basket = () => {
  const [item, setItem] = useState<IProduct[]>([])
 const handleProductGetAll = async () => {
    try {
      const { data } = await axios.get<IAxios>('http://localhost:8000/products/all')
      setItem(data.product)
    } catch (error) {
      console.log(error)
    }
  }

  const [name, setName] = useState('')
  const [phone_number, setPhone_number] = useState("")
  const [adress, setAdress] = useState('')
  const [open, setOpen] = React.useState(false)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const [basket, setBasket] = useState < Basket[]>([])
  const handleCreateItem = (e: any) => {
    e.preventDefault()
    try {
      const data = axios.post('http://localhost:8000/check/create', { name, phone_number,adress,products:basket })
    } catch (error) {
      console.log(error)
    } finally {
      setOpen(true)
      console.log('finally')
    }
  }
  const handleDelete = async (id: number) => {
    try {
      const data = await axios.get('http://localhost:8000/products/delete/' + id)
    } catch (error) {
        console.log(error)
    } finally {
      handleProductGetAll()
    }
  }
  useEffect(() => {
    handleProductGetAll()
  }, [])
  console.log(basket,"basket")
  return (
    <Container sx={{ padding: '25px' }}>
      <Box sx={{ height: '100%', width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={'90px'}>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>FullProductCost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {item.map((row) => (
              <TableItem
                FullProductCost={row.FullProductCost}
                count={row.count}
                description={row.description}
                id={row.id}
                name={row.name}
                price={row.price}
                key={row.id}
                setBasket={setBasket}
                basket={basket}
                handleDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
      <form onSubmit={handleCreateItem} style={{ marginTop: '20px' }}>
        <Typography
          variant='h3'
          component='h6'
          display={'flex'}
          sx={{ width: '100%', justifyContent: 'center' }}
        >
          Данные
        </Typography>
        <Stack direction='column' spacing={3} padding={'25px'}>
          <TextField
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant='outlined'
            label='Название'
          ></TextField>
          <TextField
            onChange={(e) => setPhone_number(e.target.value)}
            fullWidth
            variant='outlined'
            label='Телефон'
          ></TextField>
          <TextField
            onChange={(e) => setAdress(e.target.value)}
            fullWidth
            variant='outlined'
            label='Описание'
          ></TextField>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type='submit'
              //  onClick={handleCreateItem}
              variant='contained'
              endIcon={<SendIcon />}
            >
              Отправить
            </Button>
          </Box>
        </Stack>
      </form>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Чек создан
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Basket
