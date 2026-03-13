const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Документация',
            version: '1.0.0',
            description: 'Документация для Express API приложения',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
                description: 'Локальный сервер',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    // Укажи пути к файлам, где ты будешь писать JSDoc комментарии
    apis: ['./router/*.js'],
};

export default swaggerOptions;