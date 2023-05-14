import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tagEndpoint } from "./endpoints";
import { request } from "./request";

export const useSearchTags = (keyword: string) => {
  return useQuery(
    ['tags'],
    async () => {
      return request({ url: `${tagEndpoint}/search`, params: { keyword } }).then((response) => {
        return response.data;
      });
    }
  );
};

export const useGetTagWithId = (tagIds: number[]) => {
  return useQuery(
    ['tags', tagIds],
    async () => {
      return request({ url: `${tagEndpoint}/id-get`, params: { tagIds } }).then((response) => {
        return response.data;
      });
    },
    {
      enabled: !!tagIds && tagIds.length > 0
    }
  )
}

export const useGetTagByPost = (postId: string | undefined) => {
  return useQuery(
    ['post-tags', postId],
    async () => {
      return request({ url: `${tagEndpoint}/get-by-post`, params: {postId} }).then((response) => {
        return response.data
      })
    }, {
      enabled: !!postId,
    }
  )
}