import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LayoutComponent from "./LayoutComponent";
import Trial from "./components/general-components/Trial";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutComponent />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/auth", element: <RegisterPage /> },
        { path: "/trial", element: <Trial /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
