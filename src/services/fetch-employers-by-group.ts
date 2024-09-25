import { Employer } from "@/@types/Employer";
import { Group } from "@/@types/Group";
import { api } from "@/lib/api";

export interface FetchEmployersByGroupResponse {
  group: Group;
  employers: Employer[];
}

export async function fetchEmployersByGroup(
  groupId: string
): Promise<FetchEmployersByGroupResponse> {
  const response = await api(`/groups/${groupId}/employers`, {
    next: {
      revalidate: 60 * 60, // 1 hour
      tags: ["fetch-employers", groupId],
    },
  });
  const { group, employers } = await response.json();

  return { employers, group };
}
