# Multi-stage Dockerfile for Ordo
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production
EXPOSE 5000 3000

CMD ["npm", "run", "dev"]
