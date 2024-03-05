import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import Links, { loader as urlListLoader } from "./routes/Links";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/url',
        element: <Links/>,
        loader: urlListLoader,
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
