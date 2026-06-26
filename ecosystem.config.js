module.exports = {
    apps: [
        {
            name: "mock-app",
            script: "src/index.js",
            env: {
                NODE_ENV: "production",
                PORT: 4000,
                ERROR_LOG_PATH: "/var/log/mock-app-error.log",
            },
            error_file: "/var/log/pm2/mock-app-err.log",
            out_file: "/var/log/pm2/mock-app-out.log",
        },
    ],
};
