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
  // add error state null/string that uses onclick and onchange min lenght
  const [error, setError] = useState<null | string>(null);
  //swap it
  const [edit, setEdit] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = () => {
    if (error) setError(null);
  };

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
        <button
          onClick={() => {
            const input = inputRef.current?.value ?? "";
            if (input.length < 3) {
              // this condition is for when i click on edit i need to see the input field again

              if (input === "" && !edit) {
                setEdit((prevValue) => !prevValue);
              } else {
                setError(
                  "Invalid input player name must have atleast 3 characters"
                );
              }
            } else {
              // change it
              const error = handleNameChange(input);
              // need the prevValue for imediate rerender
              if (!error) setEdit((prevValue) => !prevValue);
              setError(error);
            }
          }}
        >
          {edit ? "Save" : "Edit"}
        </button>
      </li>
    </div>
  );
}
export default PlayerInfo;
