# Stage 1: Build Stage
FROM python:3.9.19-alpine3.20 as build
WORKDIR /backend
COPY ./requirements.txt /backend/requirements.txt
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"
RUN pip install -r requirements.txt

COPY . .

# Stage 2: Production Stage
FROM python:3.9.19-alpine3.20
WORKDIR /backend
COPY --from=build /backend /backend
COPY --from=build /venv /venv
ENV PATH="/venv/bin:$PATH"
EXPOSE 5000
CMD ["sh", "-c", "python fetch_and_store.py && python app.py"]