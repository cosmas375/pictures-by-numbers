FROM node:10-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ .
RUN npm run build-ssr

FROM node:10-alpine as production-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY --from=build-stage /app/dist ./dist
COPY server.js ./
COPY robots.txt ./
CMD ["npm", "run", "start"]
