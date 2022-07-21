import * as Types from "../types";
const initialState = {
  products: [],
  loader: false,
  userInfo: null,
  cart: [],
  language: "en",
};

const CommonReducer = (state = initialState, action) => {
  // console.warn(initialState);
  console.log("------------>", action);
  switch (action.type) {
    case Types.CHANGE_LANGUAGE: {
      // console.warn("action.type=>", action.type);
      // console.warn("action.payload=>", action.payload);
      return {
        ...state,
        language: action.payload,
      };
    }
    case Types.GET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
        loader: false,
      };
    }
    case Types.PRODUCT_LOADER: {
      return {
        ...state,
        loader: true,
      };
    }
    case Types.LOGIN_SUCCESS: {
      return {
        ...state,
        userInfo: action?.payload,
      };
    }
    case Types.SET_ITEM_CART: {
      return {
        ...state,
        cart: [...state.cart, action?.payload],
      };
    }

    case Types.REMOVE_ITEM_CART: {
      state.cart.splice(action.payload, 1);
      return {
        ...state,
        cart: [...state.cart],
      };
    }

    case Types.INCREASE_QUANTITY: {
      state.cart[action.payload].quantity =
        state.cart[action.payload].quantity + 1;
      return {
        ...state,
        cart: [...state.cart],
      };
    }

    case Types.DECREASE_QUANTITY: {
      if (state.cart[action.payload].quantity > 1) {
        state.cart[action.payload].quantity =
          state.cart[action.payload].quantity - 1;
      }
      return {
        ...state,
        cart: [...state.cart],
      };
    }

    // newArray.splice(index, 1);

    default:
      return { ...state };
  }
};

export default CommonReducer;
