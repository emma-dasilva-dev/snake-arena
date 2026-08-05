# Snake Arena

A playful browser-based Snake game built with Next.js and TypeScript, with a C backend foundation for the future authoritative multiplayer server.

## Current release

- Playable single-player game
- Keyboard controls: arrows or WASD
- Mobile touch controls
- Score, best score, pause, restart, speed increase and collision detection
- Responsive arcade interface using the official red, blue, teal, yellow and black palette
- C `/health` server and unit-tested snake movement module

Live multiplayer, room codes and the persistent leaderboard are planned milestones; they are not falsely presented as complete in this starter.

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Run the C backend (Linux, WSL or macOS)

```bash
cd backend
make
./snake-server
```

In another terminal:

```bash
curl http://localhost:8080/health
```

## Test the backend

```bash
cd backend
make test
```

## Production direction

- Frontend: Vercel
- C server: Railway using `backend/Dockerfile`
- Communication: secure WebSockets
- Database: PostgreSQL

See `docs/DEVELOPMENT_PLAN.md` before starting multiplayer work.

## Author

Emma Da Silva — Junior Full-Stack Developer exploring software engineering, Linux, C and cybersecurity.
