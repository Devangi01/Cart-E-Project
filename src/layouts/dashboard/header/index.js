import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from "@mui/material/Alert"
// import MuiAlert from '@mui/material/Alert';
// utils
import { MainContext } from '../../../context/MainContext';
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';




// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;



const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};



export default function Header({ onOpenNav }) {
  const [open, setOpen] = useState(false)
  const { mainState } = useContext(MainContext)


  const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    if (mainState.alertBox.text !== '') {
      setOpen(true);
    }

  }, [mainState.alertBox.text]);

  const ref = React.createRef();
  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />
        <Snackbar open={open} autoHideDuration={6000} >
          <Alert severity={mainState.alertBox.type} sx={{ width: '100%' }}>
            {mainState.alertBox.text}
          </Alert>
        </Snackbar>

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={mainState.alertBox.type} sx={{ width: "100%" }}>
            {mainState.alertBox.text}
          </Alert>
        </Snackbar>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >

          {/* <LanguagePopover /> */}
          {/* <NotificationsPopover /> */}


          <AccountPopover />
        </Stack>

      </StyledToolbar>
    </StyledRoot>
  );
}
