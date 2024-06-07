# Stage1: Build Stage

FROM node:18-slim as build
WORKDIR /frontend
COPY package*.json .
RUN npm install
COPY . .

# Stage2: Production Stage

FROM node:18-alpine
WORKDIR /frontend
COPY --from=build /frontend .
EXPOSE 3000
CMD [ "npm", "start" ]