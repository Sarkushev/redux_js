import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [
      { id: 1, brand: 'Toyota', model: 'Camry', year: 2023, engine: '2.5L', price: '$32,000' },
      { id: 2, brand: 'Honda', model: 'Accord', year: 2022, engine: '1.5L Turbo', price: '$37,000' },
      { id: 3, brand: 'Nissan', model: 'Altima', year: 2023, engine: '2.0L', price: '$28,000' },
      { id: 4, brand: 'Mazda', model: 'CX-5', year: 2023, engine: '2.5L', price: '$30,000' },
      { id: 5, brand: 'Subaru', model: 'Outback', year: 2022, engine: '2.5L', price: '$29,500' },
    ],
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { setCurrentUser, addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
