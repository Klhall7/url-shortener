import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import Home from "./routes/Home";
import DisplayLinks, { loader as urlListLoader } from "./routes/DisplayLinks";
import UrlForm, { action as urlAddRequest } from "./routes/UrlForm";
import Register, { action as registerUserRequest } from "./routes/Register";
import Login, { action as loginRequest } from "./routes/Login";

import DisplayUsers, { loader as userListLoader } from "./routes/DisplayUsers";
{/* Display for testing purposes only */}

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
        path:"/url",
        element: (
          <>
            <UrlForm /> 
            <DisplayLinks /> 
          </> ),
        action: urlAddRequest,
        loader: urlListLoader,
      },
      {
        path:"/register",
        element: (
          <>
          <Register/>
          <DisplayUsers/> {/* for testing purposes only */}
          </>
        ),
        loader: userListLoader,
        action: registerUserRequest,
      },
      {
        path:"/login",
        element: (
          <>
          <Login/>
          <DisplayUsers/> {/* for testing purposes only */}
          </>
        ),
        loader: userListLoader,
        action: loginRequest,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
