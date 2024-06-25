# Stage1: Build Stage

FROM node:18-slim as build
WORKDIR /frontend
COPY . .
RUN npm install

# Stage2: Production Stage

FROM node:18-alpine
WORKDIR /frontend
COPY --from=build /frontend .
EXPOSE 3000
CMD [ "npm", "start" ]

# # Stage1: Build Stage
# FROM node:18-alpine as build
# WORKDIR /frontend
# COPY . .
# RUN npm ci
# RUN npm run build

# # Stage 2: Production Stage
# FROM node:18-alpine
# WORKDIR /frontend
# COPY --from=build /frontend/build .
# RUN npm install -g serve
# EXPOSE 3000
# CMD ["serve", "-s", "build"]