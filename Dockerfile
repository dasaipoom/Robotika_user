
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

EXPOSE 8001

ENV NEXT_HOST=0.0.0.0
ENV NEXT_PORT=3003

CMD [ "npm", "start" ]