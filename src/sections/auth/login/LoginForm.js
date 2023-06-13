import axios from 'axios';
import { useState, useContext , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { MainContext } from '../../../context/MainContext';
import Iconify from '../../../components/iconify';





// ----------------------------------------------------------------------

export default function LoginForm() {

  const {mainState, setMainState} = useContext(MainContext)
  const navigate = useNavigate();
 
  const [loginState, setLoginState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    showPassword: false,

  })
 

  const handleChange = (event) => {
    
   setLoginState({...loginState, [event.target.name]: event.target.value})
  }
  const encodedToken = localStorage.getItem("token");
  const handleClick = async () => {
    
    try {
      const response = await axios.post(`/api/auth/login`, {
        firstname: loginState.firstname,
        lastname: loginState.lastname,
        email: loginState.email,
        password: loginState.password,
        headers: {
          authorization: encodedToken, // passing token as an authorization header
        },
        
      });
      console.log("loginResponse",response.email)
      // saving the encodedToken in the localStorage
      // if(response.status){
      //   alert(response.status);
      //   localStorage.setItem("token", response.data.encodedToken);
       
      // }
      if(response.status === 200){
        localStorage.setItem("token", response.data.encodedToken);
        setMainState({ ...mainState, isLoggedIn: true }); // Update isLoggedIn state in MainContext
           navigate('/dashboard', { replace: true });
  
      }
     
      
    } catch (error) {
      console.log(error);
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
        
        <TextField name="email" label="Email address" onChange={(event)=> handleChange(event)} value={loginState.email}/>

        <TextField
          name="password"
          label="Password"
          value= {loginState.password}
          onChange={(event)=> handleChange(event)}
          type={loginState.showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setLoginState({...loginState, showPassword:!loginState.showPassword})} edge="end">
                  <Iconify icon={loginState.showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
       {" "}
      </Stack>


      <Stack direction="row" spacing={2}>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
      {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login as guest
      </LoadingButton> */}
  
</Stack>
    </>
  );
}
