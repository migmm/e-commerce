import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Juguetería cósmica API", version: "1.0.0" }
    },
    apis: [
        "router/auth.js",
        "router/products.js"
    ]
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/api/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(`API Documentation available at /api/docs`);
};

export default swaggerSpec;
