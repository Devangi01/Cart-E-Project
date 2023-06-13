import PropTypes from 'prop-types';

import { useContext,useEffect,useState } from 'react';
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import Slider from '@mui/material/Slider';

// components
import { MainContext } from '../../../context/MainContext'; // Adjust the file path accordingly

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { ColorMultiPicker } from '../../../components/color-utils';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_PRICE_OPTIONS = ['low to high', 'high to low'];
export const FILTER_CATEGORY_OPTIONS = ['All', 'Shoes', 'Clothes', 'Jewellery'];
export const FILTER_RATING_OPTIONS = ['4', '3', '2', '1'];


// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter }) {
  
  const { mainState, setMainState } = useContext(MainContext);
  
  function jumpToProcessFilterFunction(){
    const finalFilterData =  filterRecord(mainState.storeOriginalProductData,mainState.filterState);
    setMainState({...mainState,productData:finalFilterData})
  }


  function filterRecord(inputArray,filterObject){
   let filterData = [];
   if(filterObject.category.includes("all")){
    filterData =   inputArray.filter((eachObject)=> eachObject.rating >= filterObject.rating);
   }else{
    filterData =   inputArray.filter((eachObject)=> filterObject.category.includes(eachObject.category) && eachObject.rating >= filterObject.rating);

   }
   const sortingData =  filterObject.price === "low to high" ? filterData.sort((a,b)=>a.price - b.price) : filterData.sort((a,b)=>b.price - a.price);
   return sortingData;
  }

  const handleChange = (event, name) => {
  name = name.toLowerCase();
    const getFilterObject = mainState.filterState;
    if(name==="category" && event.target.checked){
      getFilterObject[name]=[...getFilterObject[name],event.target.value.toLowerCase()];
    }else if(name==="category" && event.target.checked === false){
      getFilterObject[name] = getFilterObject[name].filter((data) => data !== event.target.value.toLowerCase());
    } 
    else{
      getFilterObject[name]=event.target.value;
    }
    setMainState({ ...mainState, getFilterObject });
    jumpToProcessFilterFunction();
  };
  
  const handleClearFilter = ()=>{
    setMainState({...mainState, productData:mainState.storeOriginalProductData,filterState:{
      category:[],
        price:"",
        rating:""
    }})
  }

  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
              Category
              </Typography>
              <FormGroup>
                {FILTER_CATEGORY_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={<Checkbox value={item} checked={mainState.filterState.category.includes(item.toLowerCase())} onChange={(event) => handleChange(event, 'Category')} />}
                    label={item}
                  />
                ))}
              </FormGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
              Price
              </Typography>
              <RadioGroup>
                {FILTER_PRICE_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item}
                    value={mainState.filterState.price}  
                    control={<Radio value={item} checked={mainState.filterState.price===item} onChange={(event) => handleChange(event, 'Price')} />}
                    label={item}
                  />
                ))}
              </RadioGroup>
            </div>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Rating
              </Typography>
              <Slider
                aria-label="Temperature"
                defaultValue={0.5}
                valueLabelDisplay="auto"
                step={0.5}
                value={mainState.filterState.rating}
                marks
                min={1}
                max={5}
                onChange={(event) => handleChange(event, 'Rating')}
                />
            </div>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={()=>handleClearFilter()}
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
