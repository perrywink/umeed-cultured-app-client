import { Media, Post, PostStatus, PostTags, PostType } from "../types/Post";
import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { postEndpoint } from "./endpoints";
import { request } from "./request";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";

export const useSearchPosts = (keyword: string, tagIds: number[]) => {
  return useInfiniteQuery(
    ['posts', keyword],
    async ({ pageParam = 0 }) => {
      return request({ url: `${postEndpoint}/search`, params: { keyword, tagIds, cursor: pageParam } }).then((response) => {
        return response.data;
      });
    },
    {
      getNextPageParam: lastPage => lastPage.pageBookmark ?? undefined,
      enabled: !!tagIds && tagIds.length > 0
    }
  );
};

export const useSearchUserPosts = (keyword: string) => {
  return useInfiniteQuery(
    ['user-posts', keyword],
    async ({pageParam = 0}) => {
      return request({ url: `${postEndpoint}/user-search`, params: { keyword, cursor: pageParam }}).then((response) => {
        return response.data;
      });
    },
    {
      getNextPageParam: lastPage => lastPage.pageBookmark ?? undefined,
    }
  );
};


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
    onSuccess: () => {
      queryClient.invalidateQueries(["media"]);

    },
    onError: (e: any) => {
      console.error(e)
      toast.error(e.data)
    }
  });
};

export const assignPostTags = async (data: PostTags) => {
  const r = {
    url: postEndpoint + '/assign-tags',
    method: "POST",
    data: data,
    headers: { "Content-Type": "application/json" },
  };
  const response = await request(r);
  return response;
};

export const useAssignPostTags = () => {
  const queryClient = useQueryClient();

  return useMutation(assignPostTags, {
    onSuccess: () => {
      queryClient.invalidateQueries(["postTags"]);
    },
    onError: (e: any) => {
      console.error(e)
      toast.error(e.data)
    }
  });
};

export const useGetPostsByStatus = (status: PostStatus) => {

    return useQuery(
    ['post-status', status],
    async () => {
      return request({ url: `${postEndpoint}/get-by-status`, params: {status} }).then((response) => {
        return response.data;
      });
    }, {
      enabled: !!status,
    }
  );
}

const updatePostStatus = async (status: PostStatus) => {
  const r = {
    url: postEndpoint + '/update-post-status',
    method: "PUT",
    data: status,
    headers: { "Content-Type": "application/json" },
  };
  const response = await request(r);
  return response;
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation(updatePostStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post-status']);
    },
    onError: (e: any) => {
      console.error(e)
      toast.error(e.data)
    },
  })
}

export const useGetRelevantPosts = (postType: PostType, keyword: string, status: PostStatus) => {
  const firebaseUid = auth.currentUser?.uid

  if (postType == 'USER_POST') {
      return useQuery(
      ['post'],
      async () => {
        return request({ url: `${postEndpoint}/get-user-posts`, params: {keyword, status} }).then((response) => {
          return response.data;
        });
      }
    );
  }
  else {
      return useQuery(
      ['post', firebaseUid],
      async () => {
        return request({ url: `${postEndpoint}/get-by-uid` , params: {keyword} }).then((response) => {
          return response.data;
        });
      }, {
      enabled: typeof firebaseUid !== 'undefined',
    }
    );
  }
};

