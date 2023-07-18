import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import SimpleImageSlider from 'react-simple-image-slider';
import { Grid, Container, Typography, Paper, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import StoreIcon from '@mui/icons-material/Store';
import { MainContext } from '../context/MainContext';
import { AppWidgetSummary } from '../sections/@dashboard/app';
import './CSS/dashboard.css';

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
  const [imageNum, setImageNum] = useState(1);
  const sliderImages = [
    {
      url: '/assets/images/1.png',
    },
    {
      url: '/assets/images/bg-2.jpg',
    },
    {
      url: '/assets/images/bg-7.jpg',
    },
  ];

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

      <Box>
        <Grid container>
          <Grid item>
            {' '}
            <SimpleImageSlider
              width="82%"
              height="80%"
              images={sliderImages}
              showBullets
              showNavs
              autoPlay
              onStartSlide={(index, length) => {
                setImageNum(index);
              }}
              autoPlayDelay={3}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
