import { z } from "zod";

export const projectSchema = z.object({
  repoUrl: z.string().min(1, "Repo URL is required").max(100000),
  projectName: z.string().min(1, "Project name is required").max(1000),
  githubToken: z
    .string()
    .max(10000, "GitHub token is too long")
    .optional()
    .or(z.literal("")),
});

export type AddProjectType = z.infer<typeof projectSchema>;
