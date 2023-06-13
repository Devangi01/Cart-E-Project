import React, { useState , useContext} from 'react';

import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';


// sections
import { LoginForm, SignUpForm } from '../sections/auth/login';

import { MainContext } from '../context/MainContext';




// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));



// ----------------------------------------------------------------------

const LoginPage = ()=> {
  const mdUp = useResponsive('up', 'md');

  // const [mainState, setMainState] = useState({
  //   loginFalg :true
  // });

  const {mainState, setMainState} = useContext(MainContext);
  const handleClick = ()=>{
    setMainState({
      ...mainState,loginFalg:!mainState.loginFalg
    })
  }
  return (
    <>
      <Helmet>
        <title> {mainState.loginFalg ? "Login" : "Sign Up"} |Cart-E Management </title>
      </Helmet>

      <StyledRoot>
      

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
                   {mainState.loginFalg ? "Sign in" : "Sign up" }    to Cart-E
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              {mainState.loginFalg ? "Don’t" : "Already"} have an account? {''}
              <Link variant="subtitle2" style={{cursor:"pointer"}} onClick={()=>handleClick()}> {mainState.loginFalg ? "Get started":"Please Login"}</Link>
            </Typography>

            { mainState.loginFalg ? <LoginForm /> : <SignUpForm /> }
            
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
export default LoginPage;