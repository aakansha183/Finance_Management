import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppRoutes from "./Routes/AppRoutes";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
};

export default App;
