import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router={router}/>)
