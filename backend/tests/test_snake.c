#include "snake.h"
#include <assert.h>
#include <stdio.h>
int main(void){Snake s;snake_init(&s,5,5);assert(s.length==3);assert(!snake_set_direction(&s,DIR_LEFT));assert(snake_set_direction(&s,DIR_DOWN));snake_move(&s,false);assert(s.body[0].x==5&&s.body[0].y==6);int old=s.length;snake_move(&s,true);assert(s.length==old+1);puts("snake tests passed");return 0;}
