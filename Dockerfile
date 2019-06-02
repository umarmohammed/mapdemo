### build
FROM node:10.14.2 as build
LABEL author="Umar Mohammed"
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build -- --prod

### runtime
FROM nginx:alpine
COPY --from=build /app/dist/mapdemo /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf