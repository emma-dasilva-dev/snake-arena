# Network Protocol (planned)

Messages will be UTF-8 JSON over WebSockets. Every message contains a `type`.

Client examples:

```json
{"type":"create_room","playerName":"Emma"}
{"type":"join_room","roomCode":"AB12CD","playerName":"Ada"}
{"type":"input","sequence":42,"direction":"up"}
```

Server examples:

```json
{"type":"room_joined","roomCode":"AB12CD","playerId":"p1"}
{"type":"state","tick":318,"snakes":[],"food":{"x":8,"y":4}}
{"type":"match_ended","winnerId":"p1"}
```

The server must reject malformed JSON, unknown message types, impossible direction reversals, excessive input frequency and requests for nonexistent rooms. A later implementation will define maximum payload sizes and close codes before accepting public traffic.
