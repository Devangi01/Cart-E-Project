import axios from 'axios';
import React, { useState, useEffect, useContext, useNavigate } from 'react';
import { Card, Box, Typography, Button, FormControlLabel, Rating, Radio, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { MainContext } from '../context/MainContext';

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);
  const { title, price, category, img, rating, _id } = product;
  const { mainState, setMainState } = useContext(MainContext);
  const navigate = useNavigate();

  const [mainProductCardState, setMainProductCardState] = useState({
    addToCartIconFlag: true,
  });

  const wishlist = mainState.wishlist;
  const cartlist = mainState.cartlist;
  const isProductInWishlist = wishlist.some((product) => product._id === _id);
  const isProductCartlist = cartlist.some((product) => product._id === _id);

  const encodedToken = localStorage.getItem('token');
  const handleIconClick = async () => {
    const alertObject = mainState.alertBox;
    alertObject.text = '';
    alertObject.type = '';
    setMainState({ ...mainState, alertBox: alertObject });
    if (isProductInWishlist) {
      try {
        const response = await axios.delete(`/api/user/wishlist/${_id}`, {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },
        });
        debugger; // eslint-disable-line no-debugger
        if (response.status === 200) {
          // const updatedWishlist = wishlist.filter((product) => product.id !== _id);
          const alertObject = mainState.alertBox;
          alertObject.text = title.concat(' removed from the wish list');
          alertObject.type = 'error';
          setMainState({ ...mainState, wishlist: response.data.wishlist, alertBox: alertObject });
        }
      } catch (error) {
        debugger; // eslint-disable-line no-debugger
        console.log(error);

        const alertObject = mainState.alertBox;
        alertObject.text = 'Please login with valid credential';
        alertObject.type = 'error';
        setMainState({ ...mainState, alertBox: alertObject });
      }
    } else {
      try {
        const response = await axios.post(
          `/api/user/wishlist`,
          {
            _id,
            title,
            price,
            category,
            img,
            rating,
          },
          {
            headers: {
              authorization: encodedToken, // passing token as an authorization header
            },
          }
        );
        console.log(response);
        if (response.status === 201) {
          const alertObject = mainState.alertBox;
          alertObject.text = title.concat(' added to the wish list');
          alertObject.type = 'success';
          setMainState({ ...mainState, wishlist: response.data.wishlist, alertBox: alertObject });
        }
      } catch (error) {
        debugger; // eslint-disable-line no-debugger
        console.log(error);
        const alertObject = mainState.alertBox;
        alertObject.text = 'Please login with valid credential';
        alertObject.type = 'error';
        setMainState({ ...mainState, alertBox: alertObject });
      }
    }
  };

  const handleCartClick = async () => {
    const alertObject = mainState.alertBox;
    alertObject.text = '';
    alertObject.type = '';
    setMainState({ ...mainState, alertBox: alertObject });
    if (isProductCartlist) {
      debugger; // eslint-disable-line no-debugger
      try {
        const response = await axios.delete(`/api/user/cart/${_id}`, {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },
        });
        debugger; // eslint-disable-line no-debugger
        if (response.status === 200) {
          // const updatedWishlist = wishlist.filter((product) => product.id !== _id);
          const alertObject = mainState.alertBox;
          alertObject.text = title.concat(' removed from the cart list');
          alertObject.type = 'error';
          setMainState({ ...mainState, cartlist: response.data.cart, alertBox: alertObject });
        }
      } catch (error) {
        console.log(error);
        const alertObject = mainState.alertBox;
        alertObject.text = 'Please login with valid credential';
        alertObject.type = 'error';
        setMainState({ ...mainState, alertBox: alertObject });
      }
    } else {
      debugger; // eslint-disable-line no-debugger
      try {
        const response = await axios.post(
          `/api/user/cart`,
          {
            _id,
            title,
            price,
            category,
            img,
            rating,
          },
          {
            headers: {
              authorization: encodedToken, // passing token as an authorization header
            },
          }
        );
        console.log(response);
        debugger; // eslint-disable-line no-debugger
        if (response.status === 201) {
          const alertObject = mainState.alertBox;
          alertObject.text = title.concat(' added to the cart list');
          alertObject.type = 'success';
          setMainState({ ...mainState, cartlist: response.data.cart, alertBox: alertObject });
        }
      } catch (error) {
        console.log(error);
        const alertObject = mainState.alertBox;
        alertObject.text = 'Please login with valid credential';
        alertObject.type = 'error';
        setMainState({ ...mainState, alertBox: alertObject });
      }
    }
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'row' }}>
      {product && (
        <Box sx={{ flex: 1, padding: 2, borderRadius: '8px' }}>
          <img
            src={product.img}
            alt={product.title}
            style={{
              width: '50%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Box>
      )}

      <Box sx={{ flex: 1, padding: 2 }}>
        {product && (
          <>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              {product.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Price: ${product.price}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Category: {product.category}
            </Typography>
            <FormControlLabel
              key={product.rating}
              value={product.rating}
              control={
                <Radio
                  disableRipple
                  color="default"
                  icon={<Rating name="half-rating" precision={0.5} readOnly value={product.rating} />}
                  checkedIcon={<Rating name="half-rating" precision={0.5} readOnly value={product.rating} />}
                  sx={{
                    '&:hover': { bgcolor: 'transparent' },
                  }}
                />
              }
              sx={{
                my: 0.5,
                borderRadius: 1,
                '&:hover': { opacity: 0.48 },
              }}
            />
            <Stack style={{ display: 'flex', flexDirection: 'row' }}>
              <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                Add to wishList
              </Button>
              <Button variant="contained" color="primary" sx={{ mb: 2, ml: 2 }}>
                Add to Cart
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Card>
  );
};

export default SingleProductPage;
