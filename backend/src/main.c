#include "server.h"
#include <stdio.h>
#include <stdlib.h>
int main(void){const char *raw=getenv("PORT");int port=raw?atoi(raw):8080;if(port<1||port>65535){fprintf(stderr,"Invalid PORT\n");return 1;}return server_run(port);}
