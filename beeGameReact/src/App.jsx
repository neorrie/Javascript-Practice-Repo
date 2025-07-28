import { useState } from "react";
import "./App.css";

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [grid, setGrid] = useState([]);

  const handleGameStart = () => {
    const newGrid = Array.from({ length: rows }, (_, yIdx) =>
      Array.from({ length: cols }, (_, xIdx) => {
        const isStart = xIdx === x && yIdx === y;
        return {
          hasHeart: !isStart,
          isVisited: false,
          beeHere: isStart,
        };
      })
    );
    setGrid(newGrid);
    setGameStart(true);
  };

  const handleMove = (xMove, yMove) => {
    const newX = x + xMove;
    const newY = y + yMove;

    // boundary check
    if (newX < 0 || newX >= cols || newY < 0 || newY >= rows) {
      console.log("You have gone out of bounds!");
      return;
    }

    if (grid[newY][newX].isVisited) {
      console.log("You lose! You have been here before...");
      return;
    }

    // create deep copy of grid to avoid direct mutation
    const newGrid = grid.map((row, rowIdx) =>
      row.map((cell, colIdx) => {
        return {
          ...cell,
          beeHere: rowIdx === newY && colIdx === newX, // only beeHere at new position
          isVisited: (rowIdx === y && colIdx === x) || cell.isVisited, // mark old position as visited
        };
      })
    );

    setGrid(newGrid);
    setX(newX);
    setY(newY);
  };

  return (
    <div className="main-container">
      {!gameStart ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGameStart();
          }}
        >
          <div className="form-input">
            <label>Number of rows</label>
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
            />
          </div>
          <div className="form-input">
            <label>Number of cols</label>
            <input
              type="number"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
            />
          </div>
          <div className="form-input">
            <label>Starting x-coordinate</label>
            <input
              type="number"
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
            />
          </div>
          <div className="form-input">
            <label>Starting y-coordinate</label>
            <input
              type="number"
              value={y}
              onChange={(e) => setY(Number(e.target.value))}
            />
          </div>

          <button type="submit">Start</button>
        </form>
      ) : (
        <div className="container">
          <div className="content">
            <div className="movement-buttons">
              <button onClick={() => handleMove(0, -1)}>⬆️</button>
              <button onClick={() => handleMove(-1, 0)}>⬅️</button>
              <button onClick={() => handleMove(1, 0)}>➡️</button>
              <button onClick={() => handleMove(0, 1)}>⬇️</button>
            </div>

            <div
              className="grid"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 50px)`,
                gridTemplateRows: `repeat(${rows}, 50px)`,
              }}
            >
              {grid.map((row, rowIdx) =>
                row.map((cell, colIdx) => {
                  let symbol = cell.beeHere
                    ? "🐝"
                    : cell.isVisited
                    ? "❌"
                    : "❤️";

                  return (
                    <div key={`${rowIdx}-${colIdx}`} className="cell">
                      {symbol}
                    </div>
                  );
                })
              )}
            </div>
            <div className="movement-buttons">
              <button>L1</button>
              <button>L2</button>
              <button>L3</button>
              <button>L4</button>
            </div>
          </div>

          <button onClick={() => setGameStart(false)}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default App;
