import { ActionTypes } from "../contants/action-types";
const url = "http://localhost:3002/api/cart"
export const fetchProducts = () => async (dispatch) => {
  const response = await axios.get("/products");
  dispatch({ type: ActionTypes.FETCH_PRODUCTS, payload: response.data });
};

export const updateProducts = (id) => async (dispatch) => {
    const response = await axios.patch(`${url}/products${id}`);
    dispatch({ type: ActionTypes.UPDATE_PRODUCTS, payload: response})
}
