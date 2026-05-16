# Multi-stage build for Epic Tech AI Agent
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
COPY apps/web ./apps/web
COPY packages ./packages
RUN npm ci
RUN npm run build --filter=web

FROM python:3.12-slim AS backend
WORKDIR /app
COPY apps/api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY apps/api/ .

FROM node:20-alpine AS production
WORKDIR /app

# Copy frontend build
COPY --from=frontend-builder /app/apps/web/.next ./.next
COPY --from=frontend-builder /app/apps/web/public ./public
COPY --from=frontend-builder /app/apps/web/package.json ./package.json

# Copy backend
COPY --from=backend /app ./apps/api

# Install production dependencies
COPY package*.json ./
RUN npm ci --production

# Start both services (simple concurrent runner)
CMD ["sh", "-c", "npm run start & cd apps/api && python main.py"]
