FROM denoland/deno:alpine

WORKDIR /app

COPY deno.json .
COPY deno.lock .

COPY src/ ./src/

EXPOSE 8069

RUN mkdir -p /app/resources

ENTRYPOINT ["deno", "task", "server"]