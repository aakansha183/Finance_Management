import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../utils/interface/types";

export const getUserFromSessionStorage = (): User | null => {
  const storedUser = sessionStorage.getItem("currentUser");
  console.log("=>", storedUser);
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState: UserState = {
  users: [],
  currentUser: getUserFromSessionStorage(),
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
      if (action.payload) {
        sessionStorage.setItem("currentUser", JSON.stringify(action.payload));
      } else {
        sessionStorage.removeItem("currentUser");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("password");
      }
    },
    logout(state) {
      state.currentUser = null;
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("password");
    },
    updateUser(state, action: PayloadAction<User>) {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        state.users[userIndex] = action.payload;
        if (state.currentUser && state.currentUser.id === action.payload.id) {
          state.currentUser = action.payload;
          sessionStorage.setItem("currentUser", JSON.stringify(action.payload));
        }
      }
    },
  },
});

export const { registerUser, setUser, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
