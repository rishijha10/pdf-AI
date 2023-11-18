// import axiosInstance from "../axiosInterceptor";

import axiosInstance from "./axiosInterceptor";

export const postUrl = async (url) => {
  console.log(url, "from services page");
  const body = { url: url };
  const response = await axiosInstance.post("api/videoSummarization", body);
  return response;
};

//getting all videos summary
export const getVideoSummary = async (url) => {
  console.log(url, "from services page");
  const body = { Urls: url };
  const response = await axiosInstance.post("api/summarize_all_videos", body);
  return response;
};

export const chatService = async (body) => {
  const response = await axiosInstance.post("api/chat", body);
  return response;
};

//train api

export const trainService = async (url) => {
  const body = { Urls: url };
  const response = await axiosInstance.post("/api/training", body);
  return response;
};
