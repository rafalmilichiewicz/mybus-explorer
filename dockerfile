FROM denoland/deno:alpine

# Create app directory
WORKDIR /app

# Copy deno configuration files
COPY deno.json .
COPY deno.lock .

# Copy source files
COPY src/ ./src/

# Expose port
EXPOSE 8069

# Create resources directory
RUN mkdir -p /app/resources

# Set entrypoint to run the server task
ENTRYPOINT ["deno", "run", "--watch", "-P", "./src/server/server.ts"]