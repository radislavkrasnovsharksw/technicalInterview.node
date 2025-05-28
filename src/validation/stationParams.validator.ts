import { injectable } from "tsyringe";
import { z, ZodError } from "zod";
import { BadRequestError } from "../errors/badRequest.error";

export const stationParamsSchema = z.object({
  id: z.string()
    .refine((val) => /^\d+$/.test(val), { message: "ID must be a positive integer string" })
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, { message: "ID must be greater than zero" }),
});

export type StationParams = z.infer<typeof stationParamsSchema>;

@injectable()
export class StationParamsValidator {
  public validate(params: unknown): StationParams {
    try {
      return stationParamsSchema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestError(error.errors.map(e => e.message).join(", "));
      }
      throw error;
    }
  }
}
