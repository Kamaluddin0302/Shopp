import * as Types from "../types";

const productLoader = () => {
  return {
    type: Types.PRODUCT_LOADER,
  };
};
const changeLangauge = (payload) => {
  return {
    type: Types.CHANGE_LANGUAGE,
    payload,
  };
};

const loginAction = (payload) => {
  return {
    type: Types.LOGIN_SUCCESS,
    payload,
  };
};

const addItemCart = (payload) => {
  return {
    type: Types.SET_ITEM_CART,
    payload,
  };
};

const removeItem = (payload) => {
  return {
    type: Types.REMOVE_ITEM_CART,
    payload,
  };
};

const increaseQty = (payload) => {
  return {
    type: Types.INCREASE_QUANTITY,
    payload,
  };
};

const decreaseQty = (payload) => {
  return {
    type: Types.DECREASE_QUANTITY,
    payload,
  };
};

export {
  loginAction,
  removeItem,
  addItemCart,
  changeLangauge,
  decreaseQty,
  increaseQty,
};
