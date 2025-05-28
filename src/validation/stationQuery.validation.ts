import { injectable } from "tsyringe";
import { z, ZodError } from "zod";
import { BadRequestError } from "../errors/badRequest.error";

export const stationQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, { message: "Page must be greater than 0" }),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => val > 0 && val <= 100, { message: "Limit must be between 1 and 100" }),
  order: z
    .string()
    .optional()
    .transform((val) => (val ? val.toUpperCase() : "ASC"))
    .refine((val) => val === "ASC" || val === "DESC", { message: "Order must be 'ASC' or 'DESC'" }),
});

export type StationQueryParams = z.infer<typeof stationQuerySchema>;

@injectable()
export class StationQueryValidator {
  public validate(query: unknown): StationQueryParams {
    try {
      return stationQuerySchema.parse(query);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestError(error.errors.map((e) => e.message).join(", "));
      }
      throw error;
    }
  }
}
