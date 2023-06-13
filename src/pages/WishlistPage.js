
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
 // Adjust the file path accordingly


// @mui
import { Container, Stack, Typography } from '@mui/material';
import { MainContext } from '../context/MainContext';
// components
// import ProductWishlist from 'src/sections/@dashboard/products/ProductWishlist';
import  ProductWishlist  from '../sections/@dashboard/products/ProductWishlist';
// mock
import PRODUCTS from '../_mock/products';



// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function WishlistPage() {
  const {mainState, setMainState} = useContext(MainContext)

  return (
    <>
      <Helmet>
        <title> Cart-E | Wishlist </title>
      </Helmet>

      <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
         Wishlist Management
        </Typography>
{mainState.wishlist.length > 0 ? (<ProductWishlist products={mainState.wishlist} />) : (
   <Typography align="center" variant="h6" sx={{ mb: 5 }}>
  No more item in wishlist page
  </Typography>
)}
        
    
      </Container>
    </>
  );
}
