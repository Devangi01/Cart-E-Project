import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles

import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------
const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
    transition: 'transform 0.2s', // Adding a smooth transition effect for a better user experience
    '&:hover': {
      transform: 'scale(1.05)',
      cursor: 'ponter',
      // Increase the scale when the card is hovered
    },
  },
  // cardContent: {
  //   padding: 16,
  //   borderRadius: 8,
  //   color: '#FFF',
  //   textAlign: 'center',
  //   fontFamily: 'Arial, sans-serif',
  //   fontWeight: 500,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: '100%',
  //   backgroundImage: 'linear-gradient(to right, #FF5733, #FFC300, #36D1DC)',
  //   backgroundSize: '200% 100%',
  //   transition: 'background-position 0.5s',
  //   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  //   '&:hover': {
  //     backgroundPosition: 'right center',
  //     cursor: 'pointer',
  //   },
  // },
  // heading: {
  //   fontSize: 24,
  //   marginBottom: 8,
  //   textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  // },

  // quote: {
  //   fontSize: 20,
  //   marginBottom: 16,
  //   fontStyle: 'italic',
  //   textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  // },

  // productName: {
  //   fontSize: 24,
  //   marginBottom: 8,
  //   color: '#FFF',
  //   textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  // },
  // emoji: {
  //   fontSize: 50,
  //   marginBottom: 16,
  // },
  // description: {
  //   fontSize: 16,
  //   color: '#FFF',
  //   textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  // },
  // overlay: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   background: 'rgba(0, 0, 0, 0.5)',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   opacity: 0,
  //   transition: 'opacity 0.3s',
  //   '&:hover': {
  //     opacity: 1,
  //   },
  // },
  // offerText: {
  //   fontSize: 18,
  //   color: '#FFF',
  //   fontWeight: 500,
  // },

  cardContent: {
    padding: 24,
    borderRadius: 8,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    // backgroundImage: 'linear-gradient(to right, #FF5733, #FFC300, #36D1DC)',
    backgroundImage: 'linear-gradient(to right, #607D8B, #FF8A65, #9575CD)',
    //  backgroundImage: 'linear-gradient(to right, #F44336, #FFEB3B, #2196F3)',
    // backgroundImage: 'linear-gradient(to right, #AED581, #81D4FA, #E1BEE7)',
    backgroundSize: '200% 100%',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    '&:hover': {
      backgroundPosition: 'right center',
      cursor: 'pointer',
      transform: 'scale(1.05)',
      transition: 'background-position 0.5s, transform 0.5s',
    },
  },
  heading: {
    fontSize: 48,
    marginBottom: 16,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    lineHeight: 1.2,
  },
  quote: {
    fontSize: 32,
    marginBottom: 16,
    fontStyle: 'italic',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  },
  description: {
    fontSize: 24,
    color: '#FFF',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    marginBottom: 32,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s',
    '&:hover': {
      opacity: 1,
    },
  },
  offerText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    opacity: 0,
    transition: 'opacity 0.2s',
    '&:hover': {
      opacity: 0.9,
    },
    '& h6': {
      fontSize: '1.5rem',
      fontWeight: 'lighter',
      padding: '8px 16px',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      animation: '$fadeIn 0.3s ease-in-out',
      background: 'linear-gradient(to right, #bdc3c7, #2c3e50)', // Light gray background gradient
      // backgroundImage: 'url("/path/to/your-image.jpg")', // Replace with the path to your background image
      backgroundSize: 'cover', // Adjust the image size to cover the container
      backgroundPosition: 'center', // Center the background image
      color: '#000', // Change the text color to black to contrast with the light gray background
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)', // Add a subtle text shadow for better visibility
      transition: 'background 0.3s ease-in-out', // Add transition for smoother background change
    },
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(10px)', // Move the text slightly down when starting the animation
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)', // Move the text back to its original position
    },
  },
});
export default function DashboardAppPage() {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();

  const sliderImages = [
    {
      src: '/assets/images/1.png',
      alt: 'Image 1',
    },
    {
      src: '/assets/images/bg-2.jpg',
      alt: 'Image 2',
    },
    {
      src: '/assets/images/bg-7.jpg',
      alt: 'Image 3',
    },
  ];

  const sliderQuote = [
    {
      description:
        'Step into sophistication and comfort with our premium shoe collection. Elevate your style game and conquer your day with confidence. Find the perfect fit for your unique journey. Shop now and put your best foot forward.',
      offerText: 'Special Offer On Shooes',
      percentageOffer: 'Up to 60% Off!',
    },
    {
      description:
        'Elevate your style with our exquisite clothing collection. Discover fashion that speaks to your unique taste and enhances your confidence. Unleash the trendsetter within and make a statement wherever you go. Shop now and step into a world of endless possibilities.',
      offerText: 'Special Offer On Cloath',
      percentageOffer: 'Up to 80% Off!',
    },
    {
      description:
        'Adorn yourself with elegance and timeless beauty. Our exquisite jewelry collection complements your every look, from casual to glamorous. Embrace the essence of luxury and create cherished memories. Discover your statement piece and shine bright.',
      offerText: 'Special Offer On Jewellery',
      percentageOffer: 'Up to 90% Off!',
    },
  ];
  const [isHovered, setIsHovered] = useState({
    shooes: false,
    cloth: false,
    jewellery: false,
  });

  const handleMouseEnter = (item) => {
    setIsHovered({
      ...isHovered,
      [item]: true,
    });
  };

  const handleMouseLeave = (item) => {
    setIsHovered({
      ...isHovered,
      [item]: false,
    });
  };
  const handleCardClick = (clickItem) => {
    navigate(`/dashboard/products/`);
  };
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Box
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Grid container spacing={2}>
          <Grid item sx={12} style={{ width: '100%', height: '100%' }}>
            <Carousel showThumbs={false} autoPlay infiniteLoop showArrows showStatus={false}>
              {sliderQuote.map((data, index) => (
                <div key={index}>
                  {/* Custom Card Component */}
                  <Card
                    sx={{ maxWidth: '100%' }}
                    className={classes.card}
                    onMouseEnter={() => handleMouseEnter('shooes')}
                    onMouseLeave={() => handleMouseLeave('shooes')}
                    style={{ cursor: 'pointer' }}
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography className={classes.heading}>Limited Time Offer</Typography>
                      <Typography className={classes.quote}>Unlock Your Style</Typography>
                      <Typography className={classes.description} color="textSecondary">
                        {data.description}
                      </Typography>
                      <Box className={classes.overlay}>
                        <Grid container direction="column" alignItems="center" spacing={1}>
                          <Grid item>
                            <Typography className={classes.offerText}>{data.offerText}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.offerText}>{data.percentageOffer}</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                  {/* End of Custom Card Component */}
                </div>
              ))}
            </Carousel>
          </Grid>
          <Grid item sx={12} md={6} lg={4} style={{ width: '100%' }}>
            <Card
              sx={{ maxWidth: '100%' }}
              className={classes.card}
              onMouseEnter={() => handleMouseEnter('shooes')}
              onMouseLeave={() => handleMouseLeave('shooes')}
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick('shooes')}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height="280"
                image="/assets/images/products/product_1.jpg"
              />
              {isHovered.shooes && (
                <div className={classes.textContainer}>
                  <Typography variant="h6">Explore Shooes Category</Typography>
                </div>
              )}
            </Card>
          </Grid>
          <Grid item sx={12} md={6} lg={4} style={{ width: '100%' }}>
            <Card
              sx={{ maxWidth: '100%' }}
              className={classes.card}
              onMouseEnter={() => handleMouseEnter('cloth')}
              onMouseLeave={() => handleMouseLeave('cloth')}
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick('clothes')}
            >
              <CardMedia component="img" alt="green iguana" height="280" image="/assets/images/products/cloth_1.jpg" />
              {isHovered.cloth && (
                <div className={classes.textContainer}>
                  <Typography variant="h6">Explore Cloth Category</Typography>
                </div>
              )}
            </Card>
          </Grid>
          <Grid item sx={12} md={6} lg={4} style={{ width: '100%' }}>
            <Card
              sx={{ maxWidth: '100%' }}
              className={classes.card}
              onMouseEnter={() => handleMouseEnter('jewellery')}
              onMouseLeave={() => handleMouseLeave('jewellery')}
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick('jewellery')}
            >
              <CardMedia component="img" alt="green iguana" height="280" image="/assets/images/products/jw_5.jpg" />
              {isHovered.jewellery && (
                <div className={classes.textContainer}>
                  <Typography variant="h6">Explore Jewellery Category</Typography>
                </div>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
