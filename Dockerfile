FROM node:18.16.1-slim as builder
WORKDIR /app
COPY  /package.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:1.25.3-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf