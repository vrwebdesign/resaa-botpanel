FROM node:11
WORKDIR /app
COPY . .
RUN yarn install
ENV HOST 0.0.0.0
ENV PORT 9000
RUN yarn build
CMD [ "yarn", "start" ]