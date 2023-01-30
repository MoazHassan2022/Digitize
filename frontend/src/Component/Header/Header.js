import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import {HiMenu} from 'react-icons/hi';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import {  useCookies } from "react-cookie";
import {IoMdSettings} from "react-icons/io"

const Header = () => {
  const history = useNavigate();
  const [cookies, removeCookie] = useCookies(['user']);

  const Logout =() =>{
    removeCookie("token");
    removeCookie("email");
    removeCookie("name");
    removeCookie("userType");
    removeCookie("id");
    history("/");
  }

  var pages;
  const userType = cookies.userType;

  var settings = [
   ['الاعدادات الشخصية' , () =>  {return history("/PersonalSetting")}],
   ['سجل الخروج' , Logout ]
  ];
  
  if(userType === "0") {
    pages = [['سجل استطلاع', () => {return window.location.assign("/SubmitSurvey");}  ]];
  }
  else {
    settings = [['تغيير بيانات الاستطلاع' , () =>  {return history("/Setting")}], ...settings];
    pages = [['احدث خرائط المشاريع' , () => {return history("/ProjectMaps");}],['طلب تنزيل بيانات' , () => {return history("/RequestData");}] , ["اضف مشرف" , () => {return history("/AddSupervisor")}] ];
  }


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


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



  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h3"
            noWrap
            component="a"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Montserrat',
              //fontWeight: 700,
              color: 'White',
              textDecoration: 'none',
              mr:4
            }}
          >
            DIGITIZE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } , marginLeft:-2 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <HiMenu />
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography component={"span"} textAlign="center"onClick={page[1]}>{page[0].toString()}{" "}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Digitize
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}/>

          <Box sx={{ mr:3 , flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={page[1]}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page[0]}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, fontSize:"25px", color:"white" }} >
                <IoMdSettings />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting[1]}>
                  <Typography component={'span'} textAlign="center">{setting[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
