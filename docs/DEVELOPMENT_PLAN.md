# Development Plan

## Milestone 1 — included

- Responsive Next.js interface
- Playable Canvas Snake
- Keyboard and touch controls
- Local best score
- C health server
- C movement and collision functions with tests

## Milestone 2 — C connection

- Choose and document a C WebSocket library
- Complete handshake, frames, limits and disconnect handling
- Connect one browser to one server process
- Move the single-player game tick to C

## Milestone 3 — rooms

- Six-character room codes
- Host and lobby state
- Two authoritative players
- Reconnection and timeout policy
- Expand to four players only after two-player tests pass

## Milestone 4 — persistence and release

- PostgreSQL schema for matches and leaderboard entries
- Server-side score validation
- Railway backend deployment
- Vercel frontend deployment
- Secure `wss://` configuration and cross-device testing

## Definition of done for multiplayer

Two browsers on different networks can join the same code, play a complete synchronized match, receive the same winner, survive a client disconnect without crashing the server, and save exactly one validated result.
