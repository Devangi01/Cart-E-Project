import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuid } from "uuid";
// Adjust the file path accordingly

// @mui
import { Container, Stack, Typography, Box, Grid, Table, TextField, Button, Model } from '@mui/material';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';

import Divider from '@mui/material/Divider';


import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------
import { MainContext } from '../context/MainContext';
// components
// import ProductWishlist from 'src/sections/@dashboard/products/ProductWishlist';
import ProductWishlist from '../sections/@dashboard/products/ProductWishlist';
import ProductCartlist from '../sections/@dashboard/products/ProductCartlist';

// ----------------------------------------------------------------------

export default function Cartlist() {
  const { mainState, setMainState } = useContext(MainContext);
  const [totalSum, setTotalSum] = useState({
    subTotal: 0,
    tax: 0,
    total: 0
  });

  const [saveData, setsaveData] = useState([]);
  const [address, setAddress] = useState({
    id: uuid(),
    firstName: '',
    lastName: '',
    addDetails: ''
  })

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRadioButtonClick = (event) => {

  }
  const handlePlaceOrderClick = () => {
    if (mainState.saveAddressData.length > 0) {
      alert("Your order is placed successfull")
      setOpen(false);
    } else {
      alert("Please add the address details");
    }
  }
  useEffect(() => {
    // Calculate total sum

    const sum = mainState.cartlist.reduce(
      (total, row) => total + Number(row.price) * Number(row.quantity),
      0
    );
    const per = (10 / 100) * sum;
    const totalAmount = sum + per;
    setTotalSum({ ...totalSum, subTotal: sum, tax: per, total: totalAmount })
  }, [mainState.cartlist]);

  const handleChange = (event) => {
    const addressObject = mainState.address;

    setMainState({ ...mainState, address: { ...mainState.address, id: uuid(), [event.target.name]: event.target.value } })

  }
  const saveAddress = () => {

    setMainState({ ...mainState, saveAddressData: [...mainState.saveAddressData, mainState.address] })

    //  setMainState({ ...mainState, address: { id: uuid(), firstName: '', lastName: '', addDetails: '' } })

    // setsaveData([...saveData, address]);
    // setAddress({
    //   id: uuid(),
    //   firstName: '',
    //   lastName: '',
    //   addDetails: ''
    // })
  }


  const handleEditDeleteButton = (id, buttonType) => {
    if (buttonType === "Edit") {
      const tempData = mainState.saveAddressData.filter((data) => data.id === id);
      setMainState({ ...mainState, address: { id: tempData[0].id, firstName: tempData[0].firstName, lastName: tempData[0].lastName, addDetails: tempData[0].addDetails } })
    } else {
      const filterData = mainState.saveAddressData.filter((data) => data.id !== id);
      setMainState({ ...mainState, saveAddressData: filterData });
    }
  }
  return (
    <>
      <Helmet>
        <title>  Cart-E | Cart  </title>
      </Helmet>

      <Container>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Typography variant="h4" sx={{ mb: 3 }}>
                Cart Management
              </Typography>
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                height: 400,
                overflow: "hidden",
                overflowY: "auto",
                overflowX: "auto",
              }}>
                <Stack direction="row">
                  {mainState.cartlist.length > 0 ? (
                    <ProductCartlist products={mainState.cartlist} />
                  ) : (
                    <Typography align="center" variant="h6" sx={{ mb: 5 }}>
                      No more item in Cart page
                    </Typography>
                  )}

                </Stack>
              </Box>

            </Grid>
            {
              mainState.cartlist.length > 0 && <Grid item xs={5}>
                <Box sx={{
                  width: 400,
                  height: 400,

                  borderRadius: 4,
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  p: 2,
                }}>
                  <Typography variant="h6" align="center">
                    Price Details
                  </Typography>

                  <Box sx={{
                    width: 370,
                    height: 200,
                    borderRadius: 2,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  }} >
                    <TableContainer style={{ maxHeight: 200, overflowY: "auto" }} component={Paper}>
                      <Table stickyHeader size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Item</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Total</TableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {mainState.cartlist.map((row) => (
                            <TableRow
                              key={row._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.title}
                              </TableCell>
                              <TableCell align="center">{row.price}</TableCell>
                              <TableCell align="center">{row.quantity}</TableCell>
                              <TableCell align="center">{Number(row.price) * Number(row.quantity)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Grid container style={{ padding: "5px" }} spacing={2}>
                    <Grid item xs={5} />
                    <Grid item xs={7} >
                      <Grid container >
                        <Grid item xs={5} >
                          < Typography sx={{ mt: .4, mr: .2 }}>
                            Sub Total
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>

                          <TextField id="outlined-basic" disabled inputProps={{
                            style: {
                              height: "2px",
                              width: "90px",
                              margin: "-3px"
                            },
                          }} value={totalSum.subTotal} />
                        </Grid>
                        <Grid item xs={5}>
                          < Typography sx={{ mt: .4, mr: .2 }}>
                            Tax
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>

                          <TextField id="outlined-basic" disabled inputProps={{
                            style: {
                              height: "2px",
                              width: "90px",
                              margin: "-3px"
                            },
                          }} value={totalSum.tax} />
                        </Grid> <Grid item xs={5}>

                          < Typography sx={{ mt: .4, mr: .2 }}>
                            Total
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>

                          <TextField id="outlined-basic" disabled inputProps={{
                            style: {
                              height: "2px",
                              width: "90px",
                              margin: "-3px"
                            },
                          }} value={totalSum.total} />
                        </Grid>
                      </Grid>

                      <Button sx={{ mt: 2 }} onClick={handleOpen} variant="outlined">Process To Checkout</Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            }
          </Grid>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box  >
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  <Box sx={{
                    width: 500,
                    height: 350,

                    borderRadius: 4,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    p: 2,
                  }}>
                    <Typography variant="h6" align="center">
                      Order Summury
                    </Typography>

                    <Box sx={{
                      width: 470,
                      height: 200,
                      borderRadius: 2,
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    }} >
                      <TableContainer style={{ maxHeight: 200, overflowY: "auto" }} component={Paper}>
                        <Table stickyHeader size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Item</TableCell>
                              <TableCell align="center">Price</TableCell>
                              <TableCell align="center">Quantity</TableCell>
                              <TableCell align="center">Total</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {mainState.cartlist.map((row) => (
                              <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.title}
                                </TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">{Number(row.price) * Number(row.quantity)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                    <Grid container style={{ padding: "5px" }} spacing={2}>
                      <Grid item xs={5} />
                      <Grid item xs={7} >
                        <Grid container >
                          <Grid item xs={5} >

                            < Typography align='right' sx={{ mt: .4, mr: .2 }}>
                              Total
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>

                            <TextField id="outlined-basic" disabled inputProps={{
                              style: {
                                height: "2px",
                                width: "130px",
                                margin: "-3px"
                              },
                            }} value={totalSum.total} />
                          </Grid>
                        </Grid>

                        <Button sx={{ mt: 2 }} onClick={() => handlePlaceOrderClick()} variant="outlined">Place Order</Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <Box
                    style={{
                      padding: "10px",
                      width: 410,
                      height: 330,
                      borderRadius: 2,

                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      overflowY: "auto",
                      overflowX: "auto",
                    }}
                  >
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Select Address</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="add0"
                        name="radio-buttons-group"
                      >
                        {
                          mainState.saveAddressData.map((data, ind) => {
                            return (


                              <FormControlLabel value={"add".concat(ind)} onClick={(event) => handleRadioButtonClick(event)} control={<Radio />} label={<Box
                                sx={{
                                  width: 330,
                                  height: 170,
                                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                  borderRadius: 2,

                                }}
                              >
                                <Stack direction="row">
                                  <Typography style={{ marginTop: "5px", marginLeft: "8px", }}>{data.firstName + data.lastName}</Typography>
                                </Stack>
                                <Box
                                  style={{
                                    marginLeft: "10px",
                                    width: 310,
                                    height: 100,
                                    borderRadius: 2,
                                    backgroundColor: "white",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                    overflow: "hidden",
                                    overflowY: "auto",
                                    overflowX: "auto",
                                  }}
                                >
                                  <Typography>
                                    {data.addDetails}
                                  </Typography>

                                </Box>
                                <Stack direction="row" spacing={1} style={{ marginTop: "5px", marginRight: "12px", flexDirection: "row", justifyContent: "right" }}>
                                  <Stack >
                                    <Button size="small" variant="outlined" onClick={() => handleEditDeleteButton(data.id, "Edit")} color="primary" >
                                      <EditNoteIcon style={{ cursor: 'pointer', color: 'blue' }} />
                                    </Button>
                                  </Stack>
                                  <Stack>
                                    <Button size="small" variant="outlined" onClick={() => handleEditDeleteButton(data.id, "Delete")} color="error" >
                                      <DeleteForeverIcon style={{ cursor: 'pointer', color: '#ed3939' }} />
                                    </Button>
                                  </Stack>

                                </Stack>

                              </Box>} />

                            )
                          })
                        }

                      </RadioGroup>
                    </FormControl>

                  </Box>

                </Grid>
              </Grid>

            </Box>
            <Box style={{ marginTop: "20px" }} >
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Typography variant="h6" align="left">
                    Address Details
                  </Typography>
                  <Stack spacing={2} direction="row">

                    <TextField size="small" name="firstName" value={mainState.address.firstName} onChange={(event) => handleChange(event)} id="outlined-basic" label="First name" variant="outlined" />
                    <TextField id="outlined-basic" value={mainState.address.lastName} name="lastName" size="small" label="Last name" onChange={(event) => handleChange(event)} variant="outlined" />

                  </Stack>
                  <Stack sx={{ mt: 2 }}>
                    <TextField
                      placeholder="Enter The Address Details"
                      multiline
                      rows={2}
                      maxRows={4}
                      name="addDetails"
                      value={mainState.address.addDetails}
                      onChange={(event) => handleChange(event)}
                    />
                  </Stack>
                  <Stack>
                    <Button sx={{ mt: 2 }} onClick={() => saveAddress()} variant="outlined">Save Address</Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>


          </Box>

        </Modal>
      </Container>
    </>
  );
}
