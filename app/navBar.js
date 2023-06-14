'use client';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation'
import styled from '@emotion/styled';
//import { authenticationService } from '../../services/authentication.service';
//import Login from './Login';

const NavBar = ({ loggedIn, navn, pages }) => {
    const activeSegment = useSelectedLayoutSegment();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(!openModal);

    /* const logout = () => {
        authenticationService.logout();
    } */

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    //background-color: ${(activeSegment === )}

    const MenuItems = ({ farve }) => {
        const StyledLink = styled(Link)`
            text-decoration: none;
            color: ${farve};
                &:focus, &:hover, &:visited, &:link, &:active {
                    text-decoration: none;
                    color: ${farve};
            }
        `;
        const bgfarve = farve === 'purple' ? 'yellow' : 'purple'

        return (
            /*loggedIn ?*/ pages?.map((p) => {
            const aktiv = (activeSegment === p.targetSegment) ? bgfarve : 'inherit'
            return (
                <Typography textAlign="center" key={p.name}>
                    <StyledLink className='link' href={p.link} sx={{
                        backgroundColor: aktiv
                    }}><MenuItem onClick={handleCloseNavMenu}>{p.name}</MenuItem></StyledLink>
                </Typography>
            )
        })/* : (<Typography textAlign="center" >
                <StyledLink className='link' to='/gaester'><MenuItem onClick={handleCloseNavMenu}>Gæster</MenuItem></StyledLink>
            </Typography>)*/)
    }

    return (
        <AppBar position="fixed" sx={{
            color: '#fff',
            background: 'aqua'
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        {navn}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="purple"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItems farve='purple' />
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        {navn}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <MenuItems farve='purple' />
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: 'red' }} aria-label="S">
                                    S
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {/*loggedIn ? (
                                <Link to='/'><MenuItem >
                                    <Typography textAlign="center">log ud</Typography>
                                </MenuItem></Link>
                            ) : (
                                <MenuItem onClick={() => setAnchorElUser(false)}>
                                    <Login handleOpen={handleOpen} open={openModal} />
                            </MenuItem>)*/}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;