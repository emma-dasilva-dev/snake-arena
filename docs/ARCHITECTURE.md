# Architecture

The browser owns presentation and input. During the current single-player milestone it also owns the local game loop. The target multiplayer architecture moves the authoritative world state to C.

```text
Next.js canvas client -- WebSocket intentions --> C game server
Next.js canvas client <-- official snapshots ----- C game server
                                                |
                                                +--> PostgreSQL results
```

Clients will send directions, never trusted positions or scores. The server will tick rooms, validate turns, move snakes, resolve food and collisions, and broadcast snapshots.

The C service currently provides `/health` plus separately testable Snake rules. This keeps the first backend milestone small enough to understand.
