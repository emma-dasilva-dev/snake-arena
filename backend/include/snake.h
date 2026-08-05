#ifndef SNAKE_H
#define SNAKE_H
#include <stdbool.h>
#define SNAKE_MAX_LENGTH 576
typedef struct { int x; int y; } Point;
typedef enum { DIR_UP, DIR_DOWN, DIR_LEFT, DIR_RIGHT } Direction;
typedef struct { Point body[SNAKE_MAX_LENGTH]; int length; Direction direction; bool alive; } Snake;
void snake_init(Snake *snake, int x, int y);
bool snake_set_direction(Snake *snake, Direction next);
void snake_move(Snake *snake, bool grow);
bool snake_hits_wall(const Snake *snake, int width, int height);
bool snake_hits_self(const Snake *snake);
#endif
