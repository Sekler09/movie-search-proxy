import express from 'express';
import 'dotenv/config'
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: process.env.API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/api`]: '',
    },
    on: {
      proxyReq: (proxyReq) => {
        proxyReq.setHeader(
          'Authorization',
          `Bearer ${process.env.API_KEY}`,
        );
      },
    },
  }),
);
app.use(
  '/images',
  createProxyMiddleware({
    target: process.env.API_IMAGES_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/images`]: '',
    },
  }),
);

app.listen(3000);