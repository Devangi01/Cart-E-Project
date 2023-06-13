
import { useState,useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';


// ----------------------------------------------------------------------



export default function App() {


  useEffect(()=>{
   // signupHandler()
  },[])
  const signupHandler = async () => {
    try {
      const response = await axios.post(`/api/auth/signup`, {
        firstName: "Adarsh",
        lastName: "Balika",
        email: "adarshbalika@neog.camp",
        password: "adarshBalika",
      });
      // saving the encodedToken in the localStorage
      localStorage.setItem("token", response.data.encodedToken);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
