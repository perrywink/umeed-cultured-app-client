import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PGUser, RegUser } from "../types/User";
import { userEndpoint } from "./endpoints";
import { request } from "./request";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import { EContact } from "../types/EContact";

const createUser = async (data: RegUser) => {
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

  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      navigate("/");
      toast.success("You're registered! Just a few more steps...");
    },
    onError: (e: any) => {
      console.error("Error creating user, deleting record from firebase.")
      const errorData: string = e?.data
      toast.error(errorData)
      auth.currentUser?.delete()
        .then(() => console.log("Firebase record deleted"))
        .catch(() => console.error("Firebase record could not be deleted."))
      sessionStorage.clear()
    }
  });
};

const createEContact = async (data: EContact) => {
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

  return useMutation(createEContact, {
    onSuccess: () => {
      queryClient.invalidateQueries(["econtact"]);
    },
    onError: (e: any) => {
      console.error(e)
      toast.error(e.data)
    }
  })
}

export const useGetUser = (staleTime = 3000) => {
  const firebaseUid = auth.currentUser?.uid

  return useQuery(
    ['user', firebaseUid],
    async () => {
      return request({ url: `${userEndpoint}/get` }).then((response) => {
        return response.data;
      });
    }, {
      enabled: typeof firebaseUid !== 'undefined',
      staleTime
    }
  );
};

const updateUser = async (data: Partial<PGUser>) => {
  const r = {
    url: userEndpoint + '/update',
    method: "PUT",
    data: data,
    headers: { "Content-Type": "application/json" },
  };
  const response = await request(r);
  return response;
};

export const useUpdateUser = (options?: any) => {
  const queryClient = useQueryClient();
  const firebaseUid = auth.currentUser?.uid

  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user', firebaseUid]);
    },
    onError: (e: any) => {
      console.error(e)
      toast.error(e.data)
    },
    ...options
  })
}

const assignUserTags = async (data: number[]) => {
  const r = {
    url: userEndpoint + '/assign-tags',
    method: "POST",
    data: data,
    headers: { "Content-Type": "application/json" },
  };
  const response = await request(r);
  return response;
};

export const useAssignUserTags = () => {
  const queryClient = useQueryClient();
  const firebaseUid = auth.currentUser?.uid

  return useMutation(assignUserTags, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userTags", firebaseUid]);
    },
    onError: (e: any) => {
      const errorData: string = e?.data
      toast.error(errorData)
    }
  });
};