import { useRef, useState, useEffect } from "react";

type PlayerInfoProps = {
  playerInformation: {
    name: string;
    symbol: string;
    score: number;
    // remove
    isChanged: boolean;
  };
  handleNameChange: (name: string) => string | null;
  isRestart: boolean;
};

function PlayerInfo({
  playerInformation,
  handleNameChange,
  isRestart,
}: PlayerInfoProps) {
  // add error state null/string that uses onclick and onchange min lenght
  const [error, setError] = useState<null | string>(null);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRestart) {
      setEdit(false);
      setError(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [isRestart]);

  const handleInputChange = () => {
    if (error) setError(null);
  };

  return (
    <div className="player">
      <li>
        {error ? <p className="error-message">⚠ {error}</p> : null}
        <span className="player-name">{playerInformation.score}</span>
        <span className="player-name">{playerInformation.name}</span>
        <span className="player-symbol">{playerInformation.symbol}</span>
        {edit ? null : (
          <input type="text" ref={inputRef} onChange={handleInputChange} />
        )}
        <button
          // return value and update error state
          onClick={() => {
            const input = inputRef.current?.value ?? "";
            if (input.length < 3) {
              if (input === "" && edit) {
                setEdit((prevValue) => !prevValue);
              } else {
                setError(
                  "Invalid input player name must have atleast 3 characters"
                );
              }
            } else if (input === "Player1" || input === "Player2") {
              setError("Invalid input name please chose diffrent name");
            } else {
              const str = handleNameChange(inputRef.current?.value ?? "  ");
              if (!str) setEdit((prevValue) => !prevValue);
              setError(str);
            }
          }}
        >
          {!edit ? "Save" : "Edit"}
        </button>
      </li>
    </div>
  );
}
export default PlayerInfo;
