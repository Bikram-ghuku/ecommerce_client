FROM node:18.16.1-slim as builder
WORKDIR /app
COPY  /package.json /app
RUN npm install
ARG REACT_APP_SERVER_ADD
ENV REACT_APP_SERVER_ADD $REACT_APP_SERVER_ADD
COPY . /app
RUN npm run build

FROM nginx:1.25.3-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf