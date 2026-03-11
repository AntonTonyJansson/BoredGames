import styles from "./CreateGameModal.module.css";

type Props = {
  isOpen: boolean;
  gameName: string;
  onGameNameChange: (value: string) => void;
  onCreate: () => void;
  onCancel: () => void;
};

export function CreateGameModal({
  isOpen,
  gameName,
  onGameNameChange,
  onCreate,
  onCancel,
}: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2>Create Game</h2>

        <input
          className={styles.input}
          type="text"
          placeholder="Game name"
          value={gameName}
          onChange={(e) => onGameNameChange(e.target.value)}
        />

        <div className={styles.actions}>
          <button className={styles.button} onClick={onCreate}>
            Create
          </button>
          <button className={styles.button} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
