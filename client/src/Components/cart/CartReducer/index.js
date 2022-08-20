import { combineReducers } from "redux";
import { productReducer } from "./cartReducer";

const reducers = combineReducers({
  allProducts: productReducer,
});

export default reducers;