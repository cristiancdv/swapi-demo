import { z } from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_API_URL : z.string().url(),
});

export const getPublicEnv = () => {
    return envSchema.parse({
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    });
  };