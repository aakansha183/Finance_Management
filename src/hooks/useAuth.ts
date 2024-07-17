import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setUser } from "../redux/slice/userslice";
import { User } from "../utils/interface/types";
import localforage from "localforage";
import { loginSchema } from "../utils/validationSchema/validationSchema";

interface AuthState {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (newUser: User) => Promise<void>;
}

const useAuth = (): AuthState => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      await loginSchema.validate({ username, password }, { abortEarly: false });

      const storedUsers = await localforage.getItem<User[]>("users");
      const parsedUsers: User[] = storedUsers || [];

      const user = parsedUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        await localforage.setItem("currentUser", user);
        dispatch(setUser(user));
        return true;
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error: any) {
      console.error("Login error:", error.message || error);
      throw error;
    }
  };

  const logout = async () => {
    await localforage.removeItem("currentUser");
    dispatch(setUser(null));
  };

  const register = async (newUser: User) => {
    const storedUsers = await localforage.getItem<User[]>("users");
    const parsedUsers: User[] = storedUsers || [];

    const usernameExists = parsedUsers.some(
      (user) => user.username === newUser.username
    );
    const emailExists = parsedUsers.some(
      (user) => user.email === newUser.email
    );

    if (usernameExists || emailExists) {
      throw new Error("Username or email already exists");
    }

    parsedUsers.push(newUser);
    await localforage.setItem("users", parsedUsers);

    console.log("Registered new user:", newUser);

    dispatch({ type: "ADD_USER", payload: newUser });
  };

  return { currentUser, login, logout, register };
};

export default useAuth;
