import styles from "./GameActions.module.css";

type Props = {
  onOpenCreateGame: () => void;
  onConnectSelectedGame: () => void;
  onDeleteSelectedGame: () => void;
  selectedGameId: string;
  status: string;
  error: string;
};

export function GameActions({
  onOpenCreateGame,
  onConnectSelectedGame,
  onDeleteSelectedGame,
  selectedGameId,
  status,
  error,
}: Props) {
  return (
    <div className={styles.panel}>
      <h2>Actions</h2>

      <button className={styles.button} onClick={onOpenCreateGame}>
        Create Game
      </button>

      <button
        className={styles.button}
        onClick={onConnectSelectedGame}
        disabled={!selectedGameId}
      >
        Connect to Selected Game
      </button>

      <button
        className={styles.button}
        onClick={onDeleteSelectedGame}
        disabled={!selectedGameId}
      >
        Delete Selected Game
      </button>

      <div className={styles.info}>
        <p>
          <strong>Selected Game:</strong>
        </p>
        <p>{selectedGameId || "None"}</p>

        <p>
          <strong>Status:</strong>
        </p>
        <p>{status || "-"}</p>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
