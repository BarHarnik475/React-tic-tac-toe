# Tic-Tac-Toe (React + TypeScript)

A polished Tic-Tac-Toe game built with React and TypeScript, focusing on clean state management and reusable game logic.

## Features

- Two-player game with name input + validation (min length + no duplicate names)
- Prevents moves until both players set names
- Score tracking across rounds
- Rematch / Restart flows
- Winner detection (rows, columns, diagonals) implemented in a reusable utility

## Tech Stack

- React
- TypeScript
- Custom React Hook for game state (`useGame`)
- CSS (animations + responsive layout)

## Project Structure (high level)

- `hooks/useGame.ts` – game flow and state management (board, turn counter, winner, score)
- `utils/checkWinner.ts` – winner detection logic (supports configurable win length)
- `components/PlayerInfo.tsx` – player name editing + validation UI
- `components/GameBoard.tsx` – board rendering + input disabling rules
- `components/GameOver.tsx` – end-of-round overlay and controls

## How to Run

### Vite

```bash
npm install
npm run dev
```
