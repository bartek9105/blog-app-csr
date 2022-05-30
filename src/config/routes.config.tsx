import CategoryPage from "../pages/Category";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import PostDetailsPage from "../pages/PostDetails";
import PostNew from "../pages/PostNew";
import SavedPage from "../pages/Saved";
import Search from "../pages/Search";
import SignUpPage from "../pages/Signup";
import { routesPaths } from "./routesPaths.config";

export const routes = [
  {
    path: routesPaths.root(),
    element: <Home />,
  },
  {
    path: "/category/:id",
    element: <CategoryPage />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/post/:id",
    element: <PostDetailsPage />,
  },
  {
    path: "/post/new",
    element: <PostNew />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/saved",
    element: <SavedPage />,
  },
];
