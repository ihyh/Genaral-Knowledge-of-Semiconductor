# 自带静态服务（Windows/本机使用同一份 server.mjs）
FROM node:22-alpine
WORKDIR /app
COPY server.mjs ./
COPY public ./public
ENV HOST=0.0.0.0
ENV PORT=8787
EXPOSE 8787
CMD ["node", "server.mjs"]
