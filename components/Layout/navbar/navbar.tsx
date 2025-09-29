'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';

const pages = ['Inicio', 'Academico', 'Noticias & Eventos'];

const pageRoutes: { [key: string]: string } = {
  "Inicio": "/",
  "Academico": "/academics",
  "Noticias & Eventos": "/news"
};

function ResponsiveAppBar() {
  const [mounted, setMounted] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#16a34a' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ width: '100%' }}>
          {/* Logo */}
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              marginRight: '20px',
            }}
          >
            <img
              src="/logo.png"
              alt="Colegio San Jose"
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                marginTop: '5px',
              }}
            />
          </div>

          {/* Title (desktop only) */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '1.9rem',
            }}
          >
            San Jose
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              alignItems: 'center',
              fontFamily: "'Poppins', sans-serif",
              gap: '50px',
              mr: '90px'
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  const route = pageRoutes[page];
                  if (route) router.push(route);
                }}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 50,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  position: 'relative',
                  transition: 'color 0.4s ease',
                  '&:hover': {
                    color: 'yellow',
                  },
                  '&:after': {
                    content: "''",
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '0%',
                    height: '4px',
                    backgroundColor: 'yellow',
                    transition: 'width 0.4s ease',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Mobile Hamburger (right aligned) */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'flex-end' }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    const route = pageRoutes[page];
                    if (route) router.push(route);
                  }}
                >
                  {page}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
