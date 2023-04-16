import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RegUser } from "../types/User";
import { userEndpoint } from "./endpoints";
import { request } from "./request";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import { EContact } from "../types/EContact";

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
  const navigate = useNavigate();

  return useMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      navigate("/");
      toast.success("You're logged in!");
    },
    onError: (e: any) => {
      console.error("Error creating user, deleting record from firebase.")
      const errorData: string = e?.data
      if (errorData && errorData.includes("Unique constraint failed on the fields: (`username`)")){
        toast.error("Username already taken")
      } else {
        toast.error(errorData)
      }
      auth.currentUser?.delete()
        .then(() => console.log("Firebase record deleted"))
        .catch(() => console.error("Firebase record could not be deleted."))
    }
  });
};

const registerEContact = async (data: EContact) => {
  const r = {
    url: userEndpoint + '/register-contact',
    method: "POST",
    data: data,
    headers: { "Content-Type": "application/json" },
  };
  const response = await request(r);
  return response;
};

export const useCreateEContact = () => {
  const queryClient = useQueryClient();

  return useMutation(registerEContact, {
    onSuccess: () => {
      queryClient.invalidateQueries(["econtact"]);
    }
  })
}