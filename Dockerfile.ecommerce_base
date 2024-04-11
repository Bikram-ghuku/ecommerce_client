FROM node:18.16.1-slim
WORKDIR /app
COPY  /package.json /app
RUN npm install
COPY . /app
CMD ["npm", "start"]