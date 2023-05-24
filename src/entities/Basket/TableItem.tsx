import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material'
import React, { FC, useState } from 'react'
import { Basket, IProduct } from '.'
import { GridDeleteIcon } from '@mui/x-data-grid'
import axios from 'axios'

interface IBasket extends IProduct {
  setBasket: React.Dispatch<React.SetStateAction<Basket[]>>
  basket: Basket[];
  handleDelete:(id: number) => Promise<void>
}
const TableItem: FC<IBasket> = ({
  FullProductCost,
  count,
  description,
  id,
  setBasket,
  basket,
  name,
  price,
  handleDelete
}) => {
  const [counter, setCounter] = useState(count)
  const addBasket = (id: number) => {
    const checkItemInBasket = basket.findIndex((item) => item.id === id)
    console.log(counter)
    if (checkItemInBasket < 0) {
      setBasket((item) => [...item, { id, count: 1 }])
      setCounter((count) => count + 1)
    } else {
      setCounter((count) => count + 1)
      setBasket((item) =>
        item.map((data) => (data.id === id ? (data = { ...data, count: counter + 1 }) : data)),
      )
    }
  }
  const minusBasket = (id: number) => {
    const checkItemInBasket = basket.findIndex((item) => item.id === id)
    console.log(counter)
    if (checkItemInBasket < 0) {
      setBasket((item) => [...item, { id, count: 1 }])
      setCounter((count) => count - 1)
    } else {
      setCounter((count) => count - 1)
      setBasket((item) =>
        item.map((data) => (data.id === id ? (data = { ...data, count: counter - 1 }) : data)),
      )
    }
    if (counter == 1) {
      console.log('popal')
      setBasket((item) => item.filter((data) => data.id !== id))
    }
  }

 
  return (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell sx={{ overflow: 'hidden', maxWidth: '200px' }}>{name}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell sx={{ overflow: 'hidden', maxWidth: '200px' }}>{description}</TableCell>
      <TableCell>
        <ButtonGroup variant='text' aria-label='text button group'>
          <Button onClick={() => counter > 0 && minusBasket(id)}>-</Button>
          <Button> {counter}</Button>
          <Button onClick={() => addBasket(id)}>+</Button>
        </ButtonGroup>
      </TableCell>
      <TableCell>{price * counter}</TableCell>
      <TableCell onClick={()=>handleDelete(id)}>
        <GridDeleteIcon />
      </TableCell>
    </TableRow>
  )
}

export default TableItem
