#include "snake.h"
static bool opposite(Direction a, Direction b){return (a==DIR_UP&&b==DIR_DOWN)||(a==DIR_DOWN&&b==DIR_UP)||(a==DIR_LEFT&&b==DIR_RIGHT)||(a==DIR_RIGHT&&b==DIR_LEFT);}
void snake_init(Snake *s,int x,int y){s->length=3;s->direction=DIR_RIGHT;s->alive=true;s->body[0]=(Point){x,y};s->body[1]=(Point){x-1,y};s->body[2]=(Point){x-2,y};}
bool snake_set_direction(Snake *s,Direction next){if(opposite(s->direction,next))return false;s->direction=next;return true;}
void snake_move(Snake *s,bool grow){if(grow&&s->length<SNAKE_MAX_LENGTH)s->length++;for(int i=s->length-1;i>0;i--)s->body[i]=s->body[i-1];switch(s->direction){case DIR_UP:s->body[0].y--;break;case DIR_DOWN:s->body[0].y++;break;case DIR_LEFT:s->body[0].x--;break;case DIR_RIGHT:s->body[0].x++;break;}}
bool snake_hits_wall(const Snake *s,int w,int h){Point p=s->body[0];return p.x<0||p.x>=w||p.y<0||p.y>=h;}
bool snake_hits_self(const Snake *s){for(int i=1;i<s->length;i++)if(s->body[0].x==s->body[i].x&&s->body[0].y==s->body[i].y)return true;return false;}
