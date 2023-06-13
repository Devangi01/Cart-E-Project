import React, { createContext, useState } from 'react';
import { v4 as uuid } from "uuid";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [mainState, setMainState] = useState({
    filterState: {
      category: [],
      price: '',
      rating: '',
    },
    productData: [],
    storeOriginalProductData: [],
    wishlist: [],
    cartlist: [],
    isLoggedIn: false,
    alertBox: {
      text: "",
      type: ""
    },
    loginFalg: true,
    address: {
      id: '',
      firstName: '',
      lastName: '',
      addDetails: ''
    },
    saveAddressData: []

  });



  return <MainContext.Provider value={{ mainState, setMainState }}>{children}</MainContext.Provider>;
};
