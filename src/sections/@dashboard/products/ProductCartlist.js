import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCardCartlist from './ShopProductCardCartlist';


// ----------------------------------------------------------------------

ProductCartlist.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductCartlist({ products, ...other }) {
  return (
    <Grid container spacing={1} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={22} md={12}>
          <ShopProductCardCartlist product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

