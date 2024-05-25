import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required ').max(65535),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255).optional(),
  description: z
    .string()
    .min(1, 'Description is required ')
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, 'assignedToUserId is required')
    .max(255)
    .optional()
    .nullable(),
});
