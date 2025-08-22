import { useRef } from "react";

type PlayerInfoProps = {
  playerInformation: {
    name: string;
    symbol: string;
    score: number;
    isChanged: boolean;
  };
  handleNameChange: (name: string) => void;
  isValid: boolean;
};

function PlayerInfo({
  playerInformation,
  handleNameChange,
  isValid,
}: PlayerInfoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="player">
      <li>
        {!isValid ? (
          <p className="error-message">⚠ Not valid input please try again</p>
        ) : null}
        <span className="player-name">{playerInformation.score}</span>
        <span className="player-name">{playerInformation.name}</span>
        <span className="player-symbol">{playerInformation.symbol}</span>
        {playerInformation.isChanged ? null : (
          <input type="text" ref={inputRef} />
        )}
        <button
          onClick={() => handleNameChange(inputRef.current?.value ?? "  ")}
        >
          {!playerInformation.isChanged ? "Save" : "Edit"}
        </button>
      </li>
    </div>
  );
}
export default PlayerInfo;
