import { forwardRef } from "react";

type PlayerInfoProps = {
  playerName: string;
  playerSymbol: string;
  playerScore: number;
  handleClick: () => void;
  isEdited: { X: boolean; O: boolean };
};
const PlayerInfo = forwardRef<HTMLInputElement, PlayerInfoProps>(
  ({ playerName, playerSymbol, playerScore, handleClick, isEdited }, ref) => {
    let checkEdit: boolean = false;
    if (playerSymbol === "X" && isEdited.X === true) checkEdit = true;
    else if (playerSymbol === "O" && isEdited.O === true) checkEdit = true;
    else checkEdit = false;
    return (
      <div className="player">
        <li>
          <span className="player-name">{playerScore}</span>
          <span className="player-name">{playerName}</span>
          <span className="player-symbol">{playerSymbol}</span>
          {checkEdit ? null : <input type="text" ref={ref} />}
          <button onClick={handleClick}>{!checkEdit ? "Save" : "Edit"}</button>
        </li>
      </div>
    );
  }
);

export default PlayerInfo;
