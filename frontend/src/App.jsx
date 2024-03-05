import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import Home from "./routes/Home";
import Links, { loader as urlListLoader } from "./routes/Links";
import UrlForm, { action as urlAddRequest } from "./routes/UrlForm";

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
        path: "/urls",
        element: <Links />,
        loader: urlListLoader,
      },
      {
        path:"/add_url",
        element: <UrlForm />,
        action: urlAddRequest,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
