#include "server.h"
#include <arpa/inet.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>
int server_run(int port){int fd=socket(AF_INET,SOCK_STREAM,0),yes=1;if(fd<0)return 1;setsockopt(fd,SOL_SOCKET,SO_REUSEADDR,&yes,sizeof(yes));struct sockaddr_in addr={0};addr.sin_family=AF_INET;addr.sin_addr.s_addr=htonl(INADDR_ANY);addr.sin_port=htons((unsigned short)port);if(bind(fd,(struct sockaddr*)&addr,sizeof(addr))<0||listen(fd,16)<0){close(fd);return 1;}printf("Snake Arena server listening on %d\n",port);fflush(stdout);for(;;){int client=accept(fd,NULL,NULL);if(client<0)continue;char req[1024]={0};read(client,req,sizeof(req)-1);const char *ok="HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nConnection: close\r\nContent-Length: 31\r\n\r\n{\"status\":\"ok\",\"service\":\"c\"}";const char *no="HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\nConnection: close\r\n\r\n";const char *res=strncmp(req,"GET /health ",12)==0?ok:no;write(client,res,strlen(res));close(client);}return 0;}
