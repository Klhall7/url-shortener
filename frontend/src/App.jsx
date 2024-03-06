import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import Home from "./routes/Home";
import Links, { loader as urlListLoader } from "./routes/Links";
import UrlForm, { action as urlAddRequest } from "./routes/UrlForm";
import DisplayUsers, { loader as userListLoader } from "./routes/DisplayUsers";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"/urls",
        element: (
          <>
            <UrlForm /> 
            <Links /> 
          </> ),
        action: urlAddRequest,
        loader: urlListLoader,
      },
      {
        path:"/display_users",
        element: <DisplayUsers/>,
        loader: userListLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
