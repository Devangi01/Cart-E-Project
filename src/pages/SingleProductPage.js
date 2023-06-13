import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Box, Typography, Button,FormControlLabel, Rating,Radio } from "@mui/material";
import { useParams } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <Card sx={{ display: "flex", flexDirection: "row" }}>
      {product && (
        <Box sx={{ flex: 1, padding: 2, borderRadius: "8px" }}>
          <img
            src={product.img}
            alt={product.title}
            style={{
              width: "50%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      )}

      <Box sx={{ flex: 1, padding: 2 }}>
        {product && (
          <>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              {product.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Price: ${product.price}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Category: {product.category}
            </Typography>
            <FormControlLabel
                    key={product.rating}
                    value={product.rating}
                    control={
                      <Radio
                        disableRipple
                        color="default"
                        icon={<Rating name="half-rating" precision={0.5} readOnly value={product.rating} />}
                        checkedIcon={<Rating name="half-rating" precision={0.5} readOnly value={product.rating} />}
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
            
            <Button variant="contained" color="primary" sx={{ mb: 2 }}>
              Add to Cart
            </Button>
          </>
        )}
      </Box>
    </Card>
  );
};

export default SingleProductPage;
