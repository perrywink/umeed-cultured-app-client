import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {Media, Post } from "../types/Post";
import { postEndpoint } from "./endpoints";
import { request } from "./request";
import { toast } from "react-toastify";


const createPost = async (data: Post) => {
  const r = {
    url: postEndpoint + '/create',
    method: "POST",
    data: data,
    headers: { "Content-Type": "application/json" },
  };
  const response = await request(r);
  return response;
};


export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
      toast.success("Post published");
    },
    onError: (e: any) => {
      console.error(e)
      toast.error(e.data)
    }
  });
};

export const createMedia = async (data: Media) => {
    const r = {
      url: postEndpoint + '/create-media',
      method: "POST",
      data: data,
      headers: { "Content-Type": "application/json" },
    };
    const response = await request(r);
    return response;
};

export const useCreateMedia = () => {
    const queryClient = useQueryClient();
  
    return useMutation(createMedia, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["media"]);
        console.log(data);
      },
      onError: (e: any) => {
        console.error(e)
        toast.error(e.data)
      }
    });
};