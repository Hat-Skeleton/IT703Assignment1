import * as React from "react";

import * as ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { ChakraProvider } from "@chakra-ui/react";
import { Shop } from "./pages/shop/Shop";
import { Orders } from "./pages/orders/Orders";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import { Layout } from "./components/layout/Layout";
import { AuthLoader } from "./components/layout/AuthLoader";
//import { ShopLoader } from "./pages/shop/ShopLoader";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "",
        element: <Outlet />,
        loader: AuthLoader,
        children: [
          {
            path: "shop",
            element: <Shop />,
            //loader: ShopLoader,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
