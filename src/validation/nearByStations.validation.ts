import { injectable } from "tsyringe";
import { z, ZodError } from "zod";
import { BadRequestError } from "../errors/badRequest.error";

export const nearbyStationsQuerySchema = z.object({
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
  lng: z
    .string()
    .nonempty({ message: "Longitude (lng) is required" })
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= -180 && parseFloat(val) <= 180, {
      message: "Longitude must be a number between -180 and 180",
    })
    .transform((val) => parseFloat(val)),
  lat: z
    .string()
    .nonempty({ message: "Latitude (lat) is required" })
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= -90 && parseFloat(val) <= 90, {
      message: "Latitude must be a number between -90 and 90",
    })
    .transform((val) => parseFloat(val)),
  radius: z
    .string()
    .nonempty({ message: "Radius is required" })
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Radius must be a positive number",
    })
    .transform((val) => parseFloat(val)),
});

export type NearbyStationsQueryParams = z.infer<typeof nearbyStationsQuerySchema>;

@injectable()
export class NearbyStationsQueryValidator {
  public validate(query: unknown): NearbyStationsQueryParams {
    try {
      return nearbyStationsQuerySchema.parse(query);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestError(error.errors.map((e) => e.message).join(", "));
      }
      throw error;
    }
  }
}
