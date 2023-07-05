
#javascript #nextjs #css #tutorial
FROM node:16-alpine

WORKDIR /frontend

COPY package*.json ./



COPY . .
RUN npm install
RUN npm run build
EXPOSE 85:3000


CMD ["npm", "start"]
