import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './pages/Home';
import CardComponent from './components/Card-Home/CardComponent';
import CardDetail from './components/CardDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/card/:id",
    element: <CardDetail />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </StrictMode>,
)
