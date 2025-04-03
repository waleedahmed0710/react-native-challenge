import { z } from "zod";

export const localUserSchema = z.object({
  display_name: z.string().min(2, "Name is too short"),
  reputation: z.coerce.number().min(0, "Reputation must be positive"),
  location: z.string().optional(),
});

export type LocalUserForm = z.infer<typeof localUserSchema>;
