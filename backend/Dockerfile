# Stage 1: Build Stage
FROM python:3.9.19-alpine3.20 as build
WORKDIR /backend
COPY . .
ARG MONGO_URI
ARG TMDB_API_KEY
ARG REDIS_HOST
ARG REDIS_PORT
ENV MONGO_URI=${MONGO_URI}
ENV TMDB_API_KEY=${TMDB_API_KEY}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PORT=${REDIS_PORT}
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"
RUN pip install -r requirements.txt


# Stage 2: Production Stage
FROM python:3.9.19-alpine3.20
WORKDIR /backend
COPY --from=build /backend /backend
COPY --from=build /venv /venv
ENV PATH="/venv/bin:$PATH"
EXPOSE 5000
CMD ["sh", "-c", "python fetch_and_store.py && python app.py"]