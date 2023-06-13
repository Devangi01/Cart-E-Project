import { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/iconify';

import { MainContext } from '../../../context/MainContext';
// ----------------------------------------------------------------------

export default function SignUpForm() {
  const navigate = useNavigate();

  const [signUpState,setsignUpState] = useState({
    showPassword : false,
    showConfirmPassword: false,
    firstname: "",
    lastname: "",
    email:"",
    password:"",
    confirmpassword:""
  })

  const {mainState, setMainState} = useContext(MainContext)
  const handleClick = async () => {
    
    try {
      const response = await axios.post(`/api/auth/signup`, {
        email: signUpState.email,
        password: signUpState.password
      });
      console.log(response)
      // saving the encodedToken in the localStorage
    
      if(response.status===201){
   
        localStorage.setItem("token", response.data.encodedToken);
        setMainState({...mainState, loginFalg: true})
        navigate('/login', { replace: true });
        
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleChange = (event)=>{
   

      const value = event.target.value;
     setsignUpState({...signUpState, [event.target.name]:value})
  }

  return (
    <>
      <Stack spacing={3} sx={{mb:2}}>
      <TextField name="firstname" label="First Name" onChange={(event)=> handleChange(event)} value={signUpState.firstname}/>
      <TextField name="lastname" label="Last Name" onChange={(event)=> handleChange(event)} value={signUpState.lastname}/>

        <TextField name="email" label="Email address" onChange={(event)=> handleChange(event)} value={signUpState.email}/>

        <TextField
          name="password"
          label="Password"
          value={signUpState.password}
          type={signUpState.showPassword ? 'text' : 'password'}
          onChange={(e)=> handleChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setsignUpState({...signUpState,showPassword:!signUpState.showPassword})} edge="end">
                  <Iconify icon={signUpState.showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="confirmpassword"
          label="Confrim Password"
          onChange={(e)=> handleChange(e)}
          value={signUpState.confirmpassword}
          type={signUpState.showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setsignUpState({...signUpState,showConfirmPassword:!signUpState.showConfirmPassword})} edge="end">
                  <Iconify icon={signUpState.showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Sign Up
      </LoadingButton>
    </>
  );
}
