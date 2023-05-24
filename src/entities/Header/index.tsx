import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const pages = [
  { id: 1, name: 'Создание товара', url: '/create' },
  { id: 2, name: 'Корзина', url: '/generation' },
]

const Header = () => {
  const navigate = useNavigate()
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Button
                onClick={() => navigate(page.url)}
                key={page.id}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
