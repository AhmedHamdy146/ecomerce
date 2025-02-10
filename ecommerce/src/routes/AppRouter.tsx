import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PageSuspenseFallBack } from "@components/feedback";
import ProtectedRoute from "@components/Auth/ProtectedRoute";

import { MainLayout, ProfileLayout } from "@layouts/index";
const Home = lazy(() => import("@pages/Home"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Products = lazy(() => import("@pages/Products"));
const Categories = lazy(() => import("@pages/Categories"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Account = lazy(() => import("@pages/Account"));
const Orders = lazy(() => import("@pages/Orders"));

import Error from "@pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageSuspenseFallBack>
        <MainLayout />
      </PageSuspenseFallBack>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PageSuspenseFallBack>
            <Home />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "cart",
        element: (
          <PageSuspenseFallBack>
            <Cart />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <PageSuspenseFallBack>
              <Wishlist />
            </PageSuspenseFallBack>
          </ProtectedRoute>
        ),
      },
      {
        path: "about-us",
        element: (
          <PageSuspenseFallBack>
            <AboutUs />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "categories",
        element: (
          <PageSuspenseFallBack>
            <Categories />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "categories/products/:prefix",
        element: (
          <PageSuspenseFallBack>
            <Products />
          </PageSuspenseFallBack>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad REquest", {
              status: 400,
              statusText: "Category Not Found",
            });
          }
          return true;
        },
      },
      {
        path: "login",
        element: (
          <PageSuspenseFallBack>
            <Login />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "register",
        element: (
          <PageSuspenseFallBack>
            <Register />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <PageSuspenseFallBack>
              <ProfileLayout />
            </PageSuspenseFallBack>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PageSuspenseFallBack>
                <Account />
              </PageSuspenseFallBack>
            ),
          },
          {
            path: "orders",
            element: (
              <PageSuspenseFallBack>
                <Orders />
              </PageSuspenseFallBack>
            ),
          },
        ],
      },
    ],
  },
]);
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
