FROM node:10-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ .
RUN npm run build

FROM node:10-alpine as production-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY --from=build-stage /app ./
COPY server.js ./
CMD ["npm", "run", "start"]
