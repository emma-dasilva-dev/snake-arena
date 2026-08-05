"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Direction, GameStatus, Point } from "@/lib/gameTypes";
import TouchControls from "./TouchControls";

const COLS = 24;
const ROWS = 24;
const START: Point[] = [{ x: 12, y: 12 }, { x: 11, y: 12 }, { x: 10, y: 12 }];
const same = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

function foodFor(snake: Point[]): Point {
  let point: Point;
  do {
    point = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((segment) => same(segment, point)));
  return point;
}

export default function GameCanvas() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const snake = useRef<Point[]>(START);
  const direction = useRef<Direction>({ x: 1, y: 0 });
  const queued = useRef<Direction>({ x: 1, y: 0 });
  const food = useRef<Point>({ x: 17, y: 12 });
  const [status, setStatus] = useState<GameStatus>("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);

  const touchAction = useCallback((action: () => void) => ({
    onPointerUp: (event: React.PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      action();
    },
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event.detail === 0) action();
    },
  }), []);

  useEffect(() => setBest(Number(localStorage.getItem("snake-arena-best") || 0)), []);

  const draw = useCallback(() => {
    const element = canvas.current;
    if (!element) return;
    const context = element.getContext("2d");
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = Math.min(element.parentElement?.clientWidth || 600, 600);
    element.width = size * dpr;
    element.height = size * dpr;
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cell = size / COLS;

    context.fillStyle = "#07110f";
    context.fillRect(0, 0, size, size);
    context.strokeStyle = "rgba(0,170,158,.12)";
    context.lineWidth = 1;
    for (let i = 1; i < COLS; i += 1) {
      context.beginPath(); context.moveTo(i * cell, 0); context.lineTo(i * cell, size); context.stroke();
    }
    for (let i = 1; i < ROWS; i += 1) {
      context.beginPath(); context.moveTo(0, i * cell); context.lineTo(size, i * cell); context.stroke();
    }

    const foodX = (food.current.x + 0.5) * cell;
    const foodY = (food.current.y + 0.5) * cell;
    context.fillStyle = "rgba(243,194,2,.22)";
    context.beginPath(); context.arc(foodX, foodY, cell * 0.48, 0, Math.PI * 2); context.fill();
    context.fillStyle = "#f3c202";
    context.save();
    context.translate(foodX, foodY);
    context.rotate(Math.PI / 4);
    context.fillRect(-cell * .22, -cell * .22, cell * .44, cell * .44);
    context.restore();

    snake.current.forEach((segment, index) => {
      const gap = index === 0 ? 1.5 : 2.5;
      context.fillStyle = index === 0 ? "#de0029" : index % 2 ? "#00aa9e" : "#008c82";
      context.beginPath();
      context.roundRect(segment.x * cell + gap, segment.y * cell + gap, cell - gap * 2, cell - gap * 2, cell * .22);
      context.fill();
      if (index === 0) {
        context.fillStyle = "#ffffff";
        const eyeX = direction.current.x >= 0 ? .6 : .22;
        const eyeY = direction.current.y > 0 ? .6 : .22;
        context.fillRect(segment.x * cell + cell * eyeX, segment.y * cell + cell * eyeY, Math.max(2, cell * 0.13), Math.max(2, cell * 0.13));
      }
    });
  }, []);

  const startRound = useCallback(() => {
    snake.current = START.map((point) => ({ ...point }));
    direction.current = { x: 1, y: 0 };
    queued.current = { x: 1, y: 0 };
    food.current = foodFor(snake.current);
    setScore(0);
    setCountdown(3);
    setStatus("paused");
  }, []);

  const resumeWithCountdown = useCallback(() => {
    setCountdown(3);
    setStatus("paused");
  }, []);

  const togglePause = useCallback(() => {
    if (status === "playing") {
      setCountdown(null);
      setStatus("paused");
    } else if (status === "paused" && countdown === null) {
      resumeWithCountdown();
    }
  }, [countdown, resumeWithCountdown, status]);

  const turn = useCallback((x: number, y: number) => {
    if (status !== "playing") return;
    if (x === -direction.current.x && y === -direction.current.y) return;
    queued.current = { x, y };
  }, [status]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setCountdown(null);
      setStatus("playing");
      return;
    }
    const timer = window.setTimeout(() => setCountdown((value) => value === null ? null : value - 1), 650);
    return () => window.clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const map: Record<string, Direction> = {
        ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, S: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 }, D: { x: 1, y: 0 },
      };
      const nextDirection = map[event.key];
      if (nextDirection) { event.preventDefault(); turn(nextDirection.x, nextDirection.y); }
      if (event.key === " ") { event.preventDefault(); togglePause(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [togglePause, turn]);

  useEffect(() => {
    draw();
    const resize = () => draw();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  useEffect(() => {
    if (status !== "playing") { draw(); return; }
    const delay = Math.max(70, 145 - Math.floor(score / 5) * 8);
    const timer = window.setInterval(() => {
      direction.current = queued.current;
      const head = snake.current[0];
      const next = { x: head.x + direction.current.x, y: head.y + direction.current.y };
      const hit = next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS || snake.current.some((point, index) => index < snake.current.length - 1 && same(point, next));
      if (hit) { setStatus("gameover"); return; }
      const ate = same(next, food.current);
      snake.current = [next, ...snake.current];
      if (!ate) snake.current.pop();
      else {
        food.current = foodFor(snake.current);
        setScore((value) => {
          const nextScore = value + 1;
          setBest((currentBest) => {
            const nextBest = Math.max(currentBest, nextScore);
            localStorage.setItem("snake-arena-best", String(nextBest));
            return nextBest;
          });
          return nextScore;
        });
      }
      draw();
    }, delay);
    return () => window.clearInterval(timer);
  }, [draw, score, status]);

  return (
    <section className="gameShell">
      <header className="gameTop">
        <Link href="/" className="homeButton" aria-label="Return to expedition camp">← <span>Camp</span></Link>
        <Link href="/" className="miniLogo">SNAKE <b>QUEST</b></Link>
        <div className="stats"><span>RELICS <b>{String(score).padStart(2, "0")}</b></span><span>RECORD <b>{String(best).padStart(2, "0")}</b></span></div>
        <button type="button" className="pause" {...touchAction(togglePause)} disabled={status === "ready" || status === "gameover" || countdown !== null}>{status === "paused" ? "Resume" : "Pause"}</button>
      </header>

      <div className="arenaLabel"><span>THE SUNKEN TEMPLE</span><span>DEPTH {String(Math.floor(score / 5) + 1).padStart(2, "0")}</span></div>
      <div className="canvasFrame">
        <div className="templeCrest" aria-hidden="true">◆</div>
        <i className="corner cornerTl"/><i className="corner cornerTr"/><i className="corner cornerBl"/><i className="corner cornerBr"/>
        <div className="canvasWrap">
          <canvas ref={canvas} aria-label="Snake game arena" />
          {status !== "playing" && (
            <div className="overlay">
              {countdown !== null ? (
                <div className="countdown" aria-live="assertive"><p>GET READY</p><strong>{countdown || "GO!"}</strong></div>
              ) : (
                <>
                  <p>{status === "gameover" ? "EXPEDITION LOST" : status === "paused" ? "TRAIL PAUSED" : "CHAPTER I"}</p>
                  <h2>{status === "gameover" ? `${score} RELICS FOUND` : status === "paused" ? "THE RUINS WAIT" : "ENTER THE TEMPLE"}</h2>
                  <button type="button" className="button primary gameAction" {...touchAction(status === "paused" ? resumeWithCountdown : startRound)}>
                    {status === "gameover" ? "Try the trail again" : status === "paused" ? "Continue in 3" : "Begin adventure"}
                  </button>
                  {status !== "ready" && <Link href="/" className="quitLink">Return to camp</Link>}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="gameBottom">
        <p><b>Navigate</b><span>WASD / arrows</span></p>
        <TouchControls onDirection={turn} disabled={status !== "playing"} />
        <p><b>Mission</b><span>recover gold relics</span></p>
      </div>
    </section>
  );
}
