import React, { createContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

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
      text: '',
      type: '',
    },
    loginFalg: true,
    address: {
      id: '',
      firstName: '',
      lastName: '',
      addDetails: '',
    },
    saveAddressData: [],
    loggedUserInfo: {},
    showOneProduct: {
      display: false,
      category: '',
    },
  });

  const handleLogout = () => {
    setMainState((prevState) => ({ ...prevState, isLoggedIn: false }));
  };

  return <MainContext.Provider value={{ mainState, setMainState, handleLogout }}>{children}</MainContext.Provider>;
};
