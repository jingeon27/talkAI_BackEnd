# STEP 1
FROM node:16 AS builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

# STEP 2
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["yarn", "start:prod"]