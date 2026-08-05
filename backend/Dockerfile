FROM gcc:14 AS build
WORKDIR /app
COPY . .
RUN make
FROM debian:bookworm-slim
WORKDIR /app
COPY --from=build /app/snake-server .
ENV PORT=8080
EXPOSE 8080
CMD ["./snake-server"]
