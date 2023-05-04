import { useQuery } from "@tanstack/react-query";
import { postEndpoint } from "./endpoints";
import { request } from "./request";

export const useSearchPosts = (keyword: string, tagIds: number[]) => {
  return useQuery(
    ['posts'],
    async () => {
      return request({ url: `${postEndpoint}/search`, params: { keyword, tagIds } }).then((response) => {
        return response.data;
      });
    },
    {
      enabled: tagIds.length > 0
    }
  );
};