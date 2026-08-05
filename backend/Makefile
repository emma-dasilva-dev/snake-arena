CC = gcc
CFLAGS = -std=c11 -Wall -Wextra -Werror -pedantic -Iinclude
TARGET = snake-server

all: $(TARGET)
$(TARGET): src/main.c src/server.c src/snake.c
	$(CC) $(CFLAGS) $^ -o $@
test: tests/test_snake
	./tests/test_snake
tests/test_snake: tests/test_snake.c src/snake.c include/snake.h
	$(CC) $(CFLAGS) tests/test_snake.c src/snake.c -o $@
clean:
	rm -f $(TARGET) tests/test_snake
.PHONY: all test clean
