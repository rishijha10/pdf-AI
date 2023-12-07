import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LayoutComponent from "./LayoutComponent";
import Trial from "./components/document-ai-components/DocumentAiComponent";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import DashboardPage from "./pages/DashboardPage";
import PdfComponent from "./components/dashboard-components/pdf-component/PdfComponent";
import DocumentAi from "./pages/DocumentAi";
import { useContext } from "react";
import { MainContext } from "./store/MainContext";

function App() {
  // const arr = [
  //   { question: "who are you", answer: "i am palm" },
  //   { question: "i am who", answer: "you are muzammil" },
  //   { question: "who are you", answer: "i am palm" },
  //   { question: "incomplete" },
  // ];
  // arr[arr.length - 1].answer = "complete";
  // console.log(arr);

  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutComponent />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/auth", element: <RegisterPage /> },
        {
          path: "/pdf-ai-gen1",
          element: <DocumentAi />,
          // children: [{ path: ":pdfUrl", element: <Trial /> }],
        },
        { path: "/pdf-ai-gen1/:pdfUrl", element: <DocumentAi /> },
        {
          // path: "/:uid/dashboard",
          path: "/dashboard/:uid",
          element: <DashboardPage />,
          // children: [{ path: "folder", element: <PdfComponent /> }],
        },
        { path: "folder/:folderId", element: <PdfComponent /> },
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
