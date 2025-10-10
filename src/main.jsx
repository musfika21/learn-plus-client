import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './Root/Root';
import AuthProvider from './contexts/AuthProvider';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <Toaster position="top-right" />
    <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>
)
