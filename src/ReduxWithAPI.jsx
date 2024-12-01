
import { createStore } from 'redux';
import { productsList } from './productAPI'

const ReduxWithAPI = () => {
  const initialState = {
    products: productsList,
    cartItems: [],
    wishList: []
  };

  console.log(initialState.cartItems, ' CART ITEMS');
  const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  function reducer(state = initialState, action) {
    console.log(action, 'action');
    switch (action.type) {
      case 'CART_ADD_ITEM': return {
        ...state, cartItems: [...state.cartItems, action.payload]
      }
      case 'CART_REMOVE_ITEM': return {
        ...state, cartItems: state.cartItems.filter((cartItem) => {
          return cartItem.productId !== action.payload.productId;
        })
      }
      case 'CART_INCERESE_QTY':
        return {
          ...state, cartItems: state.cartItems.map((incEle) => {
            if (incEle.productId === action.payload.productId) {
              return { ...incEle, quantity: incEle.quantity + 1 }
            }
            return incEle;
          })
        }
      case 'CART_DECREASE_QTY':
        return {
          ...state, cartItems: state.cartItems.map((cartEle) => {
            if (cartEle.productId === action.payload.productId) {
              return { ...cartEle, quantity: cartEle.quantity - 1 }
            }
           
            return cartEle;
          }).filter((cartEle)=> cartEle.quantity>0)
        
        }

      case 'WISHLIST_ADD_ITEM': return { ...state, wishList: [...state.wishList, action.payload] }

      case 'WISHLIST_REMOVE_ITEM':
        return {
          ...state, wishList: state.wishList.filter((removeEle) => {
            return removeEle.productId !== action.payload.productId;
          })
        }
      default: return state;
    }
  }

  store.dispatch({ type: 'CART_ADD_ITEM', payload: { productId: 1, quantity: 1 } });
  store.dispatch({ type: 'CART_ADD_ITEM', payload: { productId: 2, quantity: 1 } });
 
  store.dispatch({ type: 'CART_INCERESE_QTY', payload: { productId: 2 } });
  store.dispatch({ type: 'CART_DECREASE_QTY', payload: { productId: 2 } });
  store.dispatch({ type: 'CART_DECREASE_QTY', payload: { productId: 2 } });
  store.dispatch({ type: 'CART_REMOVE_ITEM', payload: { productId: 1 } });
  store.dispatch({ type: 'WISHLIST_ADD_ITEM', payload: { productId: 2 } });
  store.dispatch({ type: 'WISHLIST_REMOVE_ITEM', payload: { productId: 2 } });



  // store.getState()
  console.dir(store, 'MY-APP-STORE')
}
export default ReduxWithAPI
