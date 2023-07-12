import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography, Paper, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import StoreIcon from '@mui/icons-material/Store';
import { MainContext } from '../context/MainContext';
import { AppWidgetSummary } from '../sections/@dashboard/app';

const StyledGridItem = styled(Grid)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2),
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.1)',
    transform: 'scale(1.02)',
    cursor: 'pointer',
  },
}));

const StyledProductImg = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  transition: 'opacity 0.3s ease-in-out',
  opacity: 1,
  borderRadius: theme.spacing(1),
  boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.1)',
}));

const CategorySection = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  overflow: 'hidden',
  height: '350px', // Set a specific height for the container
  position: 'relative',
  borderRadius: theme.spacing(1),
  boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StyledContainer = styled(Container)({
  paddingTop: '2rem',
});

export default function DashboardAppPage() {
  const { mainState, setMainState } = useContext(MainContext);
  const [imageHovered, setImageHovered] = useState(false);

  const handleImageMouseEnter = () => {
    setImageHovered(true);
  };

  const handleImageMouseLeave = () => {
    setImageHovered(false);
  };

  return (
    <>
      <Helmet>
        <title>Cart-E | Dashboard</title>
      </Helmet>

      <StyledContainer fixed>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {mainState.isLoggedIn
            ? `Hi, Welcome ${mainState.loggedUserInfo.firstname}`
            : 'Hi, Welcome back'}
        </Typography>

        <CategorySection
          container
          onMouseEnter={handleImageMouseEnter}
          onMouseLeave={handleImageMouseLeave}
        >
          <Grid item xs={12}>
            <StyledProductImg
              alt=""
              src="/assets/images/products/e-commerce.jpg"
              style={{
                filter: imageHovered ? 'brightness(70%)' : 'none',
              }}
            />
          </Grid>
        </CategorySection>

        <Grid container spacing={3}>
          <StyledGridItem
            item
            xs={12}
            sm={6}
            md={3}
            component={Paper}
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
          >
            <StyledProductImg
              alt="clothes"
              src="/assets/images/products/product_17.jpg"
            />
            {/* <AppWidgetSummary title="Clothes" total={714000} /> */}
          </StyledGridItem>

          <StyledGridItem
            item
            xs={12}
            sm={6}
            md={3}
            component={Paper}
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <ShoppingCartIcon sx={{ fontSize: 60, color: '#F67088' }} />
            </Box>
            {/* <AppWidgetSummary title="Orders" total={1352831} color="info" /> */}
          </StyledGridItem>

          <StyledGridItem
            item
            xs={12}
            sm={6}
            md={3}
            component={Paper}
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <StoreIcon sx={{ fontSize: 60, color: '#F8B64C' }} />
            </Box>
            <AppWidgetSummary title="Stores" total={1723315} color="warning" />
          </StyledGridItem>

          <StyledGridItem
            item
            xs={12}
            sm={6}
            md={3}
            component={Paper}
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <LocalMallIcon sx={{ fontSize: 60, color: '#32AB64' }} />
            </Box>
            <AppWidgetSummary title="Revenue" total={2539123} color="success" />
          </StyledGridItem>
        </Grid>
      </StyledContainer>
    </>
  );
}
