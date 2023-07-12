import axios from 'axios';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Box, Card, Link, Typography, Stack, Radio, FormControlLabel, Rating } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
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

ShopProductCardWishlist.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCardWishlist({ product }) {
  const { title, price, category, img, rating, _id } = product;
  const { mainState, setMainState } = useContext(MainContext);
  const cartlist = mainState.cartlist;
  const isProductCartlist = cartlist.some((cartProduct) => cartProduct._id === _id);
  const encodedToken = localStorage.getItem('token');

  const handleIconClick = async () => {
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
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {category && (
          <Label
            variant="filled"
            color={(category === 'shoes' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {category}
          </Label>
        )}
        <StyledProductImg alt={title} src={img} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" href={`singleProduct/${_id}`}>
          <Typography variant="subtitle2" style={{ cursor: 'pointer' }} noWrap>
            {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">{fCurrency(price)}</Typography>

          <Typography>
            <Stack direction="row" spacing={2}>
              <DeleteForeverIcon onClick={handleIconClick} style={{ cursor: 'pointer', color: '#ed3939' }} />
              {isProductCartlist ? (
                <ShoppingCartCheckoutIcon
                  onClick={() => handleCartClick()}
                  style={{ cursor: 'pointer', color: 'darkblue' }}
                />
              ) : (
                <AddShoppingCartOutlinedIcon onClick={() => handleCartClick()} style={{ cursor: 'pointer' }} />
              )}
            </Stack>
          </Typography>
        </Stack>
        <Stack>
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
        </Stack>
      </Stack>
    </Card>
  );
}
