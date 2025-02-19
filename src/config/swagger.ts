import swaggerJSDoc from 'swagger-jsdoc';


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal API",
      version: "1.0.0",
      description: "API documentation for Job Portal",
    },
    servers: [
      {
        url: "https://behhobhg56.execute-api.ap-south-1.amazonaws.com/dev",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // JSON Web Token
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts","./src/models/*.ts"],
};
export default swaggerJSDoc(options);
