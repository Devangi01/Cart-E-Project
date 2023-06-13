import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Container, Stack, Typography, CircularProgress } from '@mui/material';
import { MainContext } from '../context/MainContext';
import { ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';


export default function ProductsPage() {
  const { mainState, setMainState } = useContext(MainContext);
  const encodedToken = localStorage.getItem('token');
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products', {
          headers: {
            authorization: encodedToken,
          },
        });

        setMainState({
          ...mainState,
          productData: response.data.products,
          storeOriginalProductData: response.data.products,
        });
        
        setIsLoading(false);
      
      
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart-E | Products</title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            {/* Add other filter components here */}
          </Stack>
        </Stack>

        {isLoading ? (
         <Stack
         sx={{
           height: '100vh',
           alignItems: 'center',
           justifyContent: 'center',
         }}
       >
        <CircularProgress size={80} />
       </Stack>
     ): (
          <>
            {/* <ProductSort /> */}
            <ProductList products={mainState.productData} />
            <ProductCartWidget />
          </>
        )}
      </Container>
    </>
  );
}
