import type { GameListItem } from "../types/game";
import styles from "./GameList.module.css";

type Props = {
  games: GameListItem[];
  selectedGameId: string;
  onSelectGame: (gameId: string) => void;
};

export function GameList({ games, selectedGameId, onSelectGame }: Props) {
  return (
    <div className={styles.panel}>
      <h2>Available Games</h2>

      {games.length === 0 ? (
        <p>No games created yet.</p>
      ) : (
        <div className={styles.scrollArea}>
          <table className={styles.table}>
            <thead className={styles.header}>
              <tr>
                <th>Game</th>
                <th>Player</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => {
                const isSelected = selectedGameId === game.id;

                return (
                  <tr
                    key={game.id}
                    className={isSelected ? styles.selectedRow : styles.row}
                    onClick={() => onSelectGame(game.id)}
                  >
                    <td>{game.gameName}</td>
                    <td>{game.playerName}</td>
                    <td>{game.status}</td>
                    <td>{new Date(game.createdAtUtc).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
