'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import '@fontsource/poppins/700.css';

const pages = ['Inicio', 'Sobre Nosotros', 'Servicios'];


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#34a33a' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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
                            alt="Colegio Salesiano San Jose"
                            style={{
                                width: '80px',
                                height: '80px',
                                objectFit: 'cover',
                                marginTop: '5px',
                            }}
                        />
                    </div>


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

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: '1.5rem',
                            boxShadow: '0 6px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        San Jose
                    </Typography>
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
                                onClick={handleCloseNavMenu}
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
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
