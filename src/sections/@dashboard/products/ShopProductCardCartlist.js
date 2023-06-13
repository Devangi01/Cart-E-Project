// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import { useContext, useEffect, useState } from 'react';
// import { Box, Card, Link, Typography, Stack, Radio, FormControlLabel, Rating, IconButton, Alert } from '@mui/material';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { styled } from '@mui/material/styles';
// import { fCurrency } from '../../../utils/formatNumber';
// import { MainContext } from '../../../context/MainContext';
// import Label from '../../../components/label';
// import { ColorPreview } from '../../../components/color-utils';



// const StyledProductImg = styled('img')({
//   top: 0,
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   position: 'absolute',
// });

// ShopProductCardCartlist.propTypes = {
//   product: PropTypes.object,
// };

// export default function ShopProductCardCartlist({ product }) {
//   const { title, price, category, img, rating, _id } = product;
//   const { mainState, setMainState } = useContext(MainContext);
//   const [quantity, setQuantity] = useState(1);
//   const [showAlert, setShowAlert] = useState(false);


//   const handleIconClick = () => {
//     const updatedCartlist = mainState.cartlist.filter((data) => data.id !== product.id);
//     setMainState({ ...mainState, cartlist: updatedCartlist });
//     setShowAlert(true);
//     console.log("dddddd", updatedCartlist)
//   };

//   useEffect(() => {
//     const updateQuntityData = mainState.cartlist;
//     for (let i = 0; i < updateQuntityData.length; i += 1) {
//       if (updateQuntityData[i].id === product.id) {
//         updateQuntityData[i].quantity = quantity;
//       }
//     }
//     setMainState({ ...mainState, cartlist: updateQuntityData })
//     console.log(mainState.cartlist);
//   }, [quantity])

//   const handleIncrement = () => {
//     setQuantity(quantity + 1);
//   };

//   const handleDecrement = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };
//   return (
//     <Card>
//       <Stack direction="row" spacing={2} sx={{ p: 2 }}>

//         <Stack direction="column" justifyContent="space-between">
//           <Box
//             sx={{
//               width: 100,
//               height: 100,
//               position: 'relative',
//               overflow: 'hidden',
//               borderRadius: '10%'

//             }}> <StyledProductImg alt={title} src={img} /></Box>
//         </Stack>
//         <Stack width="100%" justifyContent="space-between">
//           <Stack direction="row" alignItems="center">

//             <Link color="inherit" underline="hover" href={`singleProduct/${_id}`}>
//               <Typography variant="subtitle2" style={{ cursor: 'pointer' }} noWrap>
//                 {title}
//               </Typography>
//             </Link>
//             <Box flexGrow={1} />
//             <Button variant="outlined" color="error" onClick={() => handleIconClick()} > <DeleteForeverIcon style={{ cursor: 'pointer', color: '#ed3939' }} /></Button>
//           </Stack>
//           <Typography variant="subtitle1">{fCurrency(price)}</Typography>


//           <Stack direction="row" alignItems="center">

//             <FormControlLabel
//               key={rating}
//               value={rating}
//               control={
//                 <Radio
//                   disableRipple
//                   color="default"
//                   icon={<Rating name="half-rating" precision={0.5} readOnly value={rating} />}
//                   checkedIcon={<Rating name="half-rating" precision={0.5} readOnly value={rating} />}
//                   sx={{
//                     '&:hover': { bgcolor: 'transparent' },
//                   }}
//                 />
//               }
//               sx={{
//                 my: 0.5,
//                 borderRadius: 1,
//                 '&:hover': { opacity: 0.48 },
//               }}
//             />
//             <Box flexGrow={1} />
//             <Stack direction="row" alignItems="center">
//               <Button onClick={handleDecrement} variant="outlined">-</Button>
//               <Button variant="outlined" disabled >{quantity}</Button>
//               <Button variant="outlined" onClick={handleIncrement}>+</Button>
//             </Stack>
//           </Stack>
//         </Stack>

//       </Stack>
//     </Card>
//     //   <Card>
//     //   <Box sx={{ pt: '100%', position: 'relative' }}>
//     //   {category && (
//     //     <Label
//     //       variant="filled"
//     //       color={(category === 'shoes' && 'error') || 'info'}
//     //       sx={{
//     //         zIndex: 9,
//     //         top: 16,
//     //         right: 16,
//     //         position: 'absolute',
//     //         textTransform: 'uppercase',
//     //       }}
//     //     >
//     //       {category}
//     //     </Label>
//     //   )}
//     //   <StyledProductImg alt={title} src={img} />
//     // </Box>

//     // <Stack direction="row" spacing={2} sx={{ p: 3 }}>
//     //   <Link color="inherit" underline="hover" href={`singleProduct/${_id}`}>
//     //     <Typography variant="subtitle2" style={{ cursor: 'pointer' }} noWrap>
//     //       {title}
//     //     </Typography>
//     //   </Link>

//     //   <Stack direction="row" alignItems="center" justifyContent="space-between">
//     //     <Typography variant="subtitle1">{fCurrency(price)}</Typography>

//     //     <Typography>
//     //       <Stack direction="row" spacing={2}>
//     //         <DeleteForeverIcon onClick={handleIconClick} style={{ cursor: 'pointer', color: '#ed3939' }} />
//     //       </Stack>
//     //     </Typography>
//     //   </Stack>
//     //   <Stack>
//     //     <FormControlLabel
//     //       key={rating}
//     //       value={rating}
//     //       control={
//     //         <Radio
//     //           disableRipple
//     //           color="default"
//     //           icon={<Rating name="half-rating" precision={0.5} readOnly value={rating} />}
//     //           checkedIcon={<Rating name="half-rating" precision={0.5} readOnly value={rating} />}
//     //           sx={{
//     //             '&:hover': { bgcolor: 'transparent' },
//     //           }}
//     //         />
//     //       }
//     //       sx={{
//     //         my: 0.5,
//     //         borderRadius: 1,
//     //         '&:hover': { opacity: 0.48 },
//     //       }}
//     //     />
//     //   </Stack>
//     // </Stack> 

//     //   </Card>
//   );
// }
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
  const { title, price, category, img, rating, _id } = product;
  const { mainState, setMainState } = useContext(MainContext);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);


  const wishlist = mainState.wishlist;
  const isProductInWishlist = wishlist.some((productWishlist) => productWishlist.id === product.id);

  const handleIconClick = () => {
    setShowAlert(true);
  };

  const handleDeleteProduct = () => {
    const updatedCartlist = mainState.cartlist.filter((data) => data.id !== product.id);
    setMainState({ ...mainState, cartlist: updatedCartlist });
    setShowAlert(false);
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
  };

  const handleWishListIcon = () => {
    if (isProductInWishlist) {
      const updatedWishlist = wishlist.filter((productWishlist) => productWishlist.id !== product.id);
      const alertObject = mainState.alertBox;
      alertObject.text = title.concat(" removed from the wish list");
      alertObject.type = "error";
      setMainState({ ...mainState, wishlist: updatedWishlist, alertBox: alertObject });
    } else {
      const alertObject = mainState.alertBox;
      alertObject.text = title.concat(" added to the wish list");
      alertObject.type = "success";
      const updatedWishlist = [...wishlist, { id: product.id, title, price, category, img, rating }];
      setMainState({ ...mainState, wishlist: updatedWishlist, alertBox: alertObject });
    }
  }
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
            <Stack direction={"row"} alignItems="center" >

              <Button variant="outlined" color="error" onClick={() => handleWishListIcon()}>
                {
                  isProductInWishlist ? (<FavoriteIcon style={{ cursor: 'pointer', color: '#ed3939' }} />) : (
                    <FavoriteBorderIcon style={{ cursor: 'pointer' }} />
                  )
                }


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
              <Button onClick={handleDecrement} variant="outlined">
                -
              </Button>
              <Button variant="outlined" disabled>
                {quantity}
              </Button>
              <Button variant="outlined" onClick={handleIncrement}>
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

