import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography, Paper, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import StoreIcon from '@mui/icons-material/Store';
import { AppWidgetSummary } from '../sections/@dashboard/app';

const StyledGridItem = styled(Grid)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2),
  '&:hover': {
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.1)',
    cursor: 'pointer',
  },
}));

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const CategorySection = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  overflow: 'hidden',
}));

export default function DashboardAppPage() {
  return (
    <>
      <Helmet>
        <title>Cart-E | Dashboard</title>
      </Helmet>

      <Container fixed>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <CategorySection container>
          <Grid item xs={12}  >
            {/* Add your big image here */}
            <img
              src="/assets/images/products/e-commerce.jpg"
              alt=""
              style={{
                maxWidth: '600px',
                maxHeight: '600px', // Adjust the value to your desired height
                // width: 'auto',
                // height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Grid>
        </CategorySection>

        <Grid container spacing={3}>
          <StyledGridItem item xs={12} sm={6} md={3} component={Paper}>
            <StyledProductImg alt="clothes" src="/assets/images/products/product_17.jpg" />
            {/* <AppWidgetSummary title="Clothes" total={714000} /> */}
          </StyledGridItem>

          <StyledGridItem item xs={12} sm={6} md={3} component={Paper}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <ShoppingCartIcon sx={{ fontSize: 60, color: '#F67088' }} />
            </Box>
            {/* <AppWidgetSummary title="Orders" total={1352831} color="info" /> */}
          </StyledGridItem>

          <StyledGridItem item xs={12} sm={6} md={3} component={Paper}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <StoreIcon sx={{ fontSize: 60, color: '#F8B64C' }} />
            </Box>
            <AppWidgetSummary title="Stores" total={1723315} color="warning" />
          </StyledGridItem>

          <StyledGridItem item xs={12} sm={6} md={3} component={Paper}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <LocalMallIcon sx={{ fontSize: 60, color: '#32AB64' }} />
            </Box>
            <AppWidgetSummary title="Revenue" total={2539123} color="success" />
          </StyledGridItem>
        </Grid>
      </Container>
    </>
  );
}
