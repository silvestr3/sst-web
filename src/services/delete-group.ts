"use server";
import { ErrorResponse } from "@/@types/ErrorResponse";
import { api } from "@/lib/api";
import { revalidateTag } from "next/cache";

export interface DeleteGroupParams {
  groupId: string;
}

export type DeleteGroupReturn = ErrorResponse;

export async function deleteGroup({
  groupId,
}: DeleteGroupParams): Promise<DeleteGroupReturn> {
  const response = await api(`/groups/${groupId}`, {
    method: "DELETE",
  });

  if (response.status === 204) {
    revalidateTag("fetch-groups");
    return {};
  }

  const data = await response.json();

  return data as DeleteGroupReturn;
}
