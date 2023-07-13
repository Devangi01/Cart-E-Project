import PropTypes from 'prop-types';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Link, Typography, Stack, Radio, FormControlLabel, Rating } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
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

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
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

  const handleLink = () => {
    navigate(`/dashboard/singleProduct/${_id}`);
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
        <Link color="inherit" underline="hover" onClick={() => handleLink()}>
          <Typography variant="subtitle2" style={{ cursor: 'pointer' }} noWrap>
            {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">{fCurrency(price)}</Typography>

          <Typography>
            <Stack direction="row" spacing={2}>
              {isProductInWishlist ? (
                <FavoriteIcon onClick={handleIconClick} style={{ cursor: 'pointer', color: '#ed3939' }} />
              ) : (
                <FavoriteBorderIcon onClick={handleIconClick} style={{ cursor: 'pointer' }} />
              )}
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
