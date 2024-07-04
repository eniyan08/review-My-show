const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.REACT_APP_API_URL, // Use the Docker service name
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // remove /api prefix when forwarding to backend
            },
        })
    );
};

// When accessing the frontend through http://localhost:3000, the browser uses the host's (your machine's) network context.
// However, backend:5000 is not resolvable in your host's DNS context, as it's a service name within Docker's internal network.

// Since backend:5000 is reachable only within the Docker network, not from the host or browser running outside Docker, we need to proxy requests through the frontend to reach the backend.
// This can be achieved by configuring a proxy in the React development server.