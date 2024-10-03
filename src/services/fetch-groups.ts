import { Group } from "@/@types/Group";
import { api } from "@/lib/api";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";

export interface FetchGroupsResponse {
  groups: Group[];
}

export async function fetchGroups(): Promise<FetchGroupsResponse> {
  "use server";
  const session = await getServerSession(options);

  const response = await api("/groups", {
    next: {
      revalidate: 60 * 60, // 1 hour
      tags: ["fetch-groups", session!.user.id],
    },
  });
  const groups = await response.json();

  return groups;
}
