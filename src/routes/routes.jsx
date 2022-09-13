import React from "react";
import { AuthLayout, Login } from "../pages/Auth";
import CustomerCare from "../pages/CustomerCare";
import RootPrivatePage from "./RootPrivatePage";
import GuestRoute from "./GuestRoute";
import { Navigate } from "react-router-dom";

export const routes = () => [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "/auth", element: <Navigate to="login" /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/",
    element: <RootPrivatePage />,
    children: [
      { path: "/", element: <Navigate to="dashboard" /> },
      {
        path: "dashboard",
        element: <GuestRoute element={<CustomerCare />} />,
      },
      {
        path: "potential-customers",
        element: <GuestRoute element={<CustomerCare />} />,
      },
      {
        path: "appointment-management",
        element: <GuestRoute element={<CustomerCare />} />,
      },
      {
        path: "/advise",
        children: [
          {
            path: "survey",
            element: <GuestRoute element={<CustomerCare />} />,
          },
          {
            path: "finance-support",
            element: <GuestRoute element={<CustomerCare />} />,
          },
          {
            path: "financial-solutions",
            element: <GuestRoute element={<CustomerCare />} />,
          },
          {
            path: "contract-management",
            element: <GuestRoute element={<CustomerCare />} />,
          },
        ],
      },
      {
        path: "customer-care",
        element: <GuestRoute element={<CustomerCare />} />,
      },
      { path: "q&a", element: <GuestRoute element={<CustomerCare />} /> },
      {
        path: "finance-support",
        element: <GuestRoute element={<CustomerCare />} />,
      },
    ],
  },
];
