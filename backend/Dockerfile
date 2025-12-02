# syntax=docker/dockerfile:1

FROM node:18-alpine AS deps
WORKDIR /app

# bcrypt necesita toolchain para compilar sus binarios
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci --omit=dev

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src

EXPOSE 3001
CMD ["npm", "start"]
