"use server";
import { Employer } from "@/@types/Employer";
import { api } from "@/lib/api";

export interface SearchEmployersParams {
  groupId: string;
  q: string;
}

export interface SearchEmployersResponse {
  employers: Employer[];
}

export async function searchEmployers({
  q,
  groupId,
}: SearchEmployersParams): Promise<SearchEmployersResponse> {
  const response = await api(`/employers/search?q=${q}&groupId=${groupId}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
      tags: ["search-employers", q, groupId],
    },
  });
  const employers = await response.json();

  return employers;
}
