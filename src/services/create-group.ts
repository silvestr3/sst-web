"use server";
import { ErrorResponse } from "@/@types/ErrorResponse";
import { Group } from "@/@types/Group";
import { api } from "@/lib/api";
import { revalidateTag } from "next/cache";

export interface CreateGroupParams {
  name: string;
  description: string;
  isActive: boolean;
}

export interface CreateGroupSuccessResponse {
  group: Group;
}

export type CreateGroupReturn = CreateGroupSuccessResponse & ErrorResponse;

export async function createGroup({
  name,
  description,
  isActive,
}: CreateGroupParams): Promise<CreateGroupReturn> {
  const response = await api("/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      isActive,
    }),
  });

  if (response.status === 201) revalidateTag("fetch-groups");

  const data = await response.json();

  return data as CreateGroupReturn;
}
