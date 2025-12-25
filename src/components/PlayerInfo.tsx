import { useRef, useState } from "react";

type PlayerInfoProps = {
  playerInformation: {
    name: string | undefined;
    symbol: string;
    score: number;
  };
  handleNameChange: (name: string) => string | null;
};

function PlayerInfo({ playerInformation, handleNameChange }: PlayerInfoProps) {
  const [error, setError] = useState<null | string>(null);
  const [edit, setEdit] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = () => {
    if (error) setError(null);
  };

  function validateInput(input: string) {
    if (input.length < 3) {
      return "Invalid input player name must have atleast 3 characters";
    } else {
      return null;
    }
  }

  return (
    <div className="player">
      <li>
        {error ? <p className="error-message">⚠ {error}</p> : null}
        <span className="player-name">{playerInformation.score}</span>
        {playerInformation.name === undefined ? (
          <span className="player-name">
            <p>Enter a name</p>
          </span>
        ) : (
          <span className="player-name">{playerInformation.name}</span>
        )}
        <span className="player-symbol">{playerInformation.symbol}</span>
        {edit ? (
          <input type="text" ref={inputRef} onChange={handleInputChange} />
        ) : null}
        {edit ? (
          <button
            onClick={() => {
              const input = inputRef.current?.value ?? "";
              const error = validateInput(input) ?? handleNameChange(input);
              if (!error) setEdit(false);
              setError(error);
            }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </button>
        )}
      </li>
    </div>
  );
}
export default PlayerInfo;
