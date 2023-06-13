import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCardWishlist from './ShopProductCardWishlist';


// ----------------------------------------------------------------------

ProductWishlist.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductWishlist({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCardWishlist product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

