# Stage1: Build Stage

FROM node:18-slim as build
WORKDIR /frontend
COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN npm install

# Stage2: Production Stage

FROM node:18-alpine
WORKDIR /frontend
COPY --from=build /frontend .
EXPOSE 3000
CMD [ "npm", "start" ]


# # Stage 1: Build Stage
# FROM node:18-alpine as build
# WORKDIR /frontend
# ARG REACT_APP_API_URL
# ENV REACT_APP_API_URL=$REACT_APP_API_URL
# COPY . .
# RUN npm ci
# RUN npm run build

# # Stage 2: Production Stage
# FROM node:18-alpine
# WORKDIR /frontend
# COPY --from=build /frontend/build .
# ENV REACT_APP_API_URL=$REACT_APP_API_URL
# RUN npm install -g serve
# EXPOSE 3000
# CMD ["serve", "-s", "build"]