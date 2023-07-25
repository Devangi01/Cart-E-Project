import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Container, Stack, Typography, CircularProgress, TextField } from '@mui/material';
import { MainContext } from '../context/MainContext';
import { ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';

export default function ProductsPage() {
  const [searchProduct, setSearchProduct] = useState("")
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

  console.log('After Redirect:', mainState.showOneProduct);
  if (mainState.showOneProduct.display) {
    console.log('Main State', mainState.productData);
    const filterDAta = mainState.productData.filter((data) => data.category === mainState.showOneProduct.category);
    console.log('After Filter', filterDAta);

  }

  const handleSearch = (e) => {
    console.log("Devag",e.target.value)
        setSearchProduct(e.target.value)
      const filterData = mainState.storeOriginalProductData.filter(
          (eachObject) => eachObject.title.includes(searchProduct)
        );  
        setMainState({
          ...mainState,
          productData: filterData,  
        });
        if(e.target.value==='') {
          setMainState({
            ...mainState,
            productData: mainState.storeOriginalProductData,  
          });
        }
  }
  return (
    <>
      <Helmet>
        <title>Cart-E | Products</title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" style={{display:"flex",justifyContent:"space-between"}} spacing={1} flexShrink={0} sx={{ my: 1 }}>
        <TextField
            name="search"
            value={searchProduct}
            id="search-bar"
            label="Search Products"
            variant="outlined"
            size="small"
            onChange={(event)=>handleSearch(event)}
            
            // Add any additional styles if needed
          />
          <ProductFilterSidebar
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          {/* Add other filter components here */}
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
        ) : (
          <>
            {/* <ProductSort /> */}
            <ProductList
              products={
                mainState.showOneProduct.display
                  ? mainState.productData.filter((data) => data.category === mainState.showOneProduct.category)
                  : mainState.productData
              }
            />
            <ProductCartWidget />
          </>
        )}
      </Container>
    </>
  );
}
