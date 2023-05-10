import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { postEndpoint } from "./endpoints";
import { request } from "./request";

export const useSearchPosts = (keyword: string, tagIds: number[]) => {
  return useInfiniteQuery(
    ['posts', keyword],
    async ({pageParam = 0}) => {
      return request({ url: `${postEndpoint}/search`, params: { keyword, tagIds, cursor: pageParam }}).then((response) => {
        return response.data;
      });
    },
    {
      getNextPageParam: lastPage => lastPage.pageBookmark ?? undefined,
      enabled: !!tagIds && tagIds.length > 0
    }
  );
};