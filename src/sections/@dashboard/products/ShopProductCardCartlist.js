import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { Box, Card, Link, Typography, Stack, Radio, FormControlLabel, Rating, IconButton, Alert } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { styled } from '@mui/material/styles';
import { fCurrency } from '../../../utils/formatNumber';
import { MainContext } from '../../../context/MainContext';
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

ShopProductCardCartlist.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCardCartlist({ product }) {
  const { title, price, category, img, rating, _id, qty } = product;
  const { mainState, setMainState } = useContext(MainContext);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const wishlist = mainState.wishlist;
  const isProductInWishlist = wishlist.some((productWishlist) => productWishlist._id === product._id);
  const encodedToken = localStorage.getItem('token');

  const handleIconClick = () => {
    setShowAlert(true);
  };

  const handleDeleteProduct = async () => {
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
    }
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
  };

  const handleWishListIcon = async () => {
    if (isProductInWishlist) {
      debugger; // eslint-disable-line no-debugger
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
        console.log(error);
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
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const updateQuntityData = mainState.cartlist;
    for (let i = 0; i < updateQuntityData.length; i += 1) {
      if (updateQuntityData[i].id === product.id) {
        updateQuntityData[i].quantity = quantity;
      }
    }
    setMainState({ ...mainState, cartlist: updateQuntityData });
  }, [quantity]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const updateProductQuantity = async (action) => {
    debugger; // eslint-disable-line no-debugger
    try {
      const response = await axios.post(
        `/api/user/cart/${_id}`,
        {
          action,
        },
        {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },
        }
      );
      debugger; // eslint-disable-line no-debugger
      if (response.status === 200) {
        setMainState({ ...mainState, cartlist: response.data.cart });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        <Stack direction="column" justifyContent="space-between">
          <Box
            sx={{
              width: 100,
              height: 100,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '10%',
            }}
          >
            <StyledProductImg alt={title} src={img} />
          </Box>
        </Stack>
        <Stack width="100%" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <Link color="inherit" underline="hover" href={`singleProduct/${_id}`}>
              <Typography variant="subtitle2" style={{ cursor: 'pointer' }} noWrap>
                {title}
              </Typography>
            </Link>

            <Box flexGrow={1} />
            <Stack direction={'row'} alignItems="center">
              <Button variant="outlined" color="error" onClick={() => handleWishListIcon()}>
                {isProductInWishlist ? (
                  <FavoriteIcon style={{ cursor: 'pointer', color: '#ed3939' }} />
                ) : (
                  <FavoriteBorderIcon style={{ cursor: 'pointer' }} />
                )}
              </Button>
              <Button variant="outlined" color="error" onClick={handleIconClick}>
                <DeleteForeverIcon style={{ cursor: 'pointer', color: '#ed3939' }} />
              </Button>
            </Stack>
          </Stack>

          <Typography variant="subtitle1">{fCurrency(price)}</Typography>
          <Stack direction="row" alignItems="center">
            <FormControlLabel
              key={rating}
              value={rating}
              control={
                <Radio
                  disableRipple
                  color="default"
                  icon={<Rating name="half-rating" precision={0.5} readOnly value={rating} />}
                  checkedIcon={<Rating name="half-rating" precision={0.5} readOnly value={rating} />}
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
            <Box flexGrow={1} />
            <Stack direction="row" alignItems="center">
              <Button onClick={() => updateProductQuantity('decrement')} variant="outlined">
                -
              </Button>
              <Button variant="outlined" disabled>
                {qty}
              </Button>
              <Button variant="outlined" onClick={() => updateProductQuantity('increment')}>
                +
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {showAlert && (
        <Alert severity="warning" sx={{ m: 2 }}>
          Are you sure you want to delete this product from the cart?
          <Button variant="outlined" onClick={handleDeleteProduct} sx={{ mx: 2 }}>
            Delete
          </Button>
          <Button variant="outlined" onClick={handleCancelDelete}>
            Cancel
          </Button>
        </Alert>
      )}
    </Card>
  );
}
