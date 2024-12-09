
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './pages/Home';
import CardDetail from './pages/Card-Detail/CardDetail';
import CheckOut from './pages/CheckOut';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import { CartProvider } from './components/Checkout/CartContext';
import AllGame from "./pages/AllGame"



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/card/:id",
    element: <CardDetail />,
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/allgame",
    element: <AllGame />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </CartProvider>
  </StrictMode>
);
