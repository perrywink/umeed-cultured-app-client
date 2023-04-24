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