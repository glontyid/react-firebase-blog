import {LOGIN_ROUTE, POSTS_ROUTE} from "./utils/consts";
import Login from "./components/Login/Login";
import Posts from "./components/Posts/Posts";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Posts
  }
];

export const privateRoutes = [
  {
    path: POSTS_ROUTE,
    Component: Posts
  }
];