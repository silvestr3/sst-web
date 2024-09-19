import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (parsedEnv.success === false) {
  throw new Error(
    `Error validating environment variables:  ${
      parsedEnv.error.flatten().fieldErrors
    }`
  );
}

export const env = parsedEnv.data;
