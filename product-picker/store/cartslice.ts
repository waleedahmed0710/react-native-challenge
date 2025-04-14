import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart or update its quantity if already exists
    addToCart(state, action: PayloadAction<CartItem>) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      // Update cart summary
      state.totalQuantity += action.payload.quantity;
      state.totalPrice += action.payload.quantity * action.payload.price;
    },

    // Optional: Remove item from cart
    removeFromCart(state, action: PayloadAction<number>) {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        const removed = state.items.splice(index, 1)[0];
        state.totalQuantity -= removed.quantity;
        state.totalPrice -= removed.quantity * removed.price;
      }
    },

    // Optional: Clear cart
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
