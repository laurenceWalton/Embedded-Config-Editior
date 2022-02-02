# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY node_modules node_modules
RUN npm i
COPY *.js ./
COPY public public
COPY src src
RUN npm run build

# production stage
FROM nginxinc/nginx-unprivileged as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]