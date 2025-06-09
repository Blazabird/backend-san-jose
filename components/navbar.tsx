'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '@fontsource/poppins/700.css';

const pages = ['Inicio', 'Academico', 'Inscripciones'];

function ResponsiveAppBar() {
    const [mounted, setMounted] = React.useState(false);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; 

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
        <AppBar position="static" sx={{ backgroundColor: '#16a34a' }}>
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
                            alt="Colegio San Jose"
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

            {/* Dropdown Menus */}
            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                        {page}
                    </MenuItem>
                ))}
            </Menu>

            <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
            </Menu>
        </AppBar>
    );
}

export default ResponsiveAppBar;
