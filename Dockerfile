
# Dockerfile
FROM node:16-alpine

# create destination directory
RUN mkdir -p /usr/src/robotika-face-page
WORKDIR /usr/src/robotika-face-page

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/robotika-face-page/
RUN npm install
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]