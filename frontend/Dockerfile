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

