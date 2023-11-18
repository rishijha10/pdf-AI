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
  const message = "How is the weather today in new york";
  useEffect(() => {
    const messageBody = {
      role: "You",
      message: message,
    };
    chatService(messageBody);
  }, []);
  // const { mutate: getChat, isLoading: chatLoading } = useMutation(chatService, {
  //   onSuccess: (data) => {
  //     console.log(data, "respoooooooo");
  //     const date = new Date();
  //     let time = date.toLocaleTimeString();
  //     const messageBody = {
  //       role: "Bot",
  //       message: data.answer,
  //       time: time,
  //       // startTime : data.start_time,
  //       links: data.links,
  //     };
  //     console.log(messageBody);
  //     // setMessages((prev) => {
  //     //   return [...prev, messageBody];
  //     // });
  //   },
  //   onError: (error) => {
  //     console.log(error, "error");
  //     // errorChatNotification();
  //   },
  // });
  useEffect(() => {
    // getChat(message);
    // console.log(chatService(message));
  }, []);
  // useEffect(() => {
  //   async function apiCall() {
  //     const req = await fetch(
  //       "https://genai-video-analyzer-rrcr7xvxjq-uc.a.run.app",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify(message),
  //       }
  //     );
  //     return req;
  //   }
  //   apiCall();
  // }, []);
  // useEffect(() => {
  //   chatService(message);
  // }, []);
  const queryClient = new QueryClient();
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
  return (
    // <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    // </QueryClientProvider>
  );
}

export default App;
