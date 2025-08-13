FROM node:20-alpine

WORKDIR /app

# For native deps (e.g., sharp) on Alpine
RUN apk add --no-cache libc6-compat

ENV NODE_ENV=development
ENV CI=true

EXPOSE 3000

# Always ensure dependencies are installed before starting dev server
CMD ["sh", "-c", "if [ -f package-lock.json ]; then npm ci; else npm install; fi && npm run dev -- -H 0.0.0.0 -p 3000"]


