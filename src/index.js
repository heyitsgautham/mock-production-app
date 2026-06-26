"use strict";

const app = require("./app");
const { logger } = require("./utils/logger");

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
    logger.info(`OrderFlow API listening on port ${PORT}`);
});
