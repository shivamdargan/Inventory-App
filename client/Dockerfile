# Dockerfile for React client

# Build react client
FROM node:alpine

# Working directory be app
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

###  Installing dependencies

RUN npm install 

# copy local files to app folder
COPY ./ ./

EXPOSE 3000

CMD ["npm","start"]