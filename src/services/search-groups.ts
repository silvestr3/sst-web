"use server";
import { Group } from "@/@types/Group";
import { api } from "@/lib/api";

export interface SearchGroupsParams {
  q: string;
}

export interface SearchGroupsResponse {
  groups: Group[];
}

export async function searchGroups({
  q,
}: SearchGroupsParams): Promise<SearchGroupsResponse> {
  const response = await api(`/groups/search?q=${q}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
      tags: ["search-groups", q],
    },
  });
  const groups = await response.json();

  return groups;
}
