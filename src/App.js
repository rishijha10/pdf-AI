import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LayoutComponent from "./LayoutComponent";
import Trial from "./components/general-components/Trial";
import { useEffect } from "react";
import { chatService } from "./store/VideoAnalyzer";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutComponent />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/auth", element: <RegisterPage /> },
        { path: "/pdf-ai-gen1", element: <Trial /> },
      ],
    },
  ]);
  // const a = {
  //   prompt: {
  //     text: "Write a story about a magic backpack.",
  //   },
  //   temperature: 1.0,
  //   candidateCount: 2,
  // };
  return (
    // <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    // </QueryClientProvider>
  );
}

export default App;
