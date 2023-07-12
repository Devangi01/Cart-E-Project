import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { MainContext } from '../../../context/MainContext';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { mainState, setMainState } = useContext(MainContext);
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (event) => {
    setLoginState({ ...loginState, [event.target.name]: event.target.value });
  };
  const encodedToken = localStorage.getItem('token');
  const handleClick = async (userType) => {
    const alertObject = mainState.alertBox;
    alertObject.text = '';
    alertObject.type = 'error';
    setMainState({ ...mainState, alertBox: alertObject });
    try {
      const response = await axios.post(`/api/auth/login`, {
        firstname: userType === 'user' ? loginState.firstname : 'Guest',
        lastname: userType === 'user' ? loginState.lastname : 'User',
        email: userType === 'user' ? loginState.email : 'guest@gmail.com',
        password: userType === 'user' ? loginState.password : 'Guest@123',
        headers: {
          authorization: encodedToken, // passing token as an authorization header
        },
      });
      // saving the encodedToken in the localStorage
      // if(response.status){
      //   alert(response.status);
      //   localStorage.setItem("token", response.data.encodedToken);

      // }
      if (response.status === 200) {
        localStorage.setItem('token', response.data.encodedToken);
        const alertObject = mainState.alertBox;
        alertObject.text = 'Login Successfull';
        alertObject.type = 'success';
        setMainState({ ...mainState, isLoggedIn: true, loggedUserInfo: response.data.foundUser }); // Update isLoggedIn state in MainContext
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.log(error);
      const alertObject = mainState.alertBox;
      alertObject.text = 'Please login with valid credential';
      alertObject.type = 'error';
      setMainState({ ...mainState, alertBox: alertObject });
    }
  };
  useEffect(() => {
    if (mainState.isLoggedIn) {
      navigate('/cart'); // Navigating to the cart page if logged in
    }
  }, [mainState.isLoggedIn, navigate]);
  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          onChange={(event) => handleChange(event)}
          value={loginState.email}
        />

        <TextField
          name="password"
          label="Password"
          value={loginState.password}
          onChange={(event) => handleChange(event)}
          type={loginState.showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setLoginState({ ...loginState, showPassword: !loginState.showPassword })}
                  edge="end"
                >
                  <Iconify icon={loginState.showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {' '}
      </Stack>

      <Stack direction="row" spacing={2}>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={() => handleClick('user')}>
          Login
        </LoadingButton>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={() => handleClick('guest')}>
          Login as guest
        </LoadingButton>
      </Stack>
    </>
  );
}
