"use server";
import { ErrorResponse } from "@/@types/ErrorResponse";
import { Group } from "@/@types/Group";
import { api } from "@/lib/api";
import { revalidateTag } from "next/cache";

export interface EditGroupParams {
  groupId: string;
  name?: string;
  description?: string;
  isActive?: boolean;
}

export type EditGroupReturn = ErrorResponse;

export async function editGroup({
  groupId,
  name,
  description,
  isActive,
}: EditGroupParams): Promise<EditGroupReturn> {
  const response = await api(`/groups/${groupId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      isActive,
    }),
  });

  if (response.status === 204) {
    revalidateTag("fetch-groups");
    return {};
  }

  const data = await response.json();

  return data as EditGroupReturn;
}
