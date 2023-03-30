import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RegUser } from "../types/User";
import { userEndpoint } from "./endpoints";
import { request } from "./request";

const registerUser = async (data: RegUser) => {
  const r = {
    url: userEndpoint + '/register',
    method: "POST",
    data: data,
    headers: { "Content-Type": "application/json" },
  };
  const response = await request(r);
  return response;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};
