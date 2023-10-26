FROM node:18-alpine
WORKDIR /api
COPY .env index.js package.json package-lock.json
RUN npm install express
RUN npm install mongoose
RUN npm install nodemon
RUN npm install validators
RUN npm install local-storage
RUN npm install dotenv
COPY . /api
CMD ["npm", "start"]
EXPOSE 9008
