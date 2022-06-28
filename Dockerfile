# Dockerfile for Express Server

# Build Node Server
FROM node:alpine

# Working directory be app
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

# copy local files to app folder
COPY ./ ./

###  Installing dependencies

RUN npm install 


EXPOSE 5000

CMD ["npm","run","start"]