import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

export class SwaggerConfig {
  private swaggerSpec;

  constructor() {
    this.swaggerSpec = swaggerJSDoc({
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Charging stations API",
          version: "1.0.0",
          description: "API documentation for charging stations API project",
        },
      },
      apis: ["./src/controllers/*.ts", "./src/entities/*.ts"], 
    });
  }

  public setupSwagger(app: Application): void {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(this.swaggerSpec));
  }
}
