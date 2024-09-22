import { Group } from "@/@types/Group";
import { api } from "@/lib/api";

export interface FetchGroupsResponse {
  groups: Group[];
}

export async function fetchGroups(): Promise<FetchGroupsResponse> {
  const response = await api("/groups");
  const groups = await response.json();

  return groups;
}
