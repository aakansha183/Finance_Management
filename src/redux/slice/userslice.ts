import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/interface/types";

interface UserState {
  users: User[];
  currentUser: User | null;
}

export const getUserFromLocalStorage = (): User | null => {
  const storedUser = localStorage.getItem("currentUser");
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState: UserState = {
  users: [],
  currentUser: getUserFromLocalStorage(),
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
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    },
    logout(state) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    },
    updateUser(state, action: PayloadAction<User>) {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        state.users[userIndex] = action.payload;
        if (state.currentUser && state.currentUser.id === action.payload.id) {
          state.currentUser = action.payload;
          localStorage.setItem("currentUser", JSON.stringify(action.payload));
        }
      }
    },
  },
});

export const { registerUser, setUser, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
