import { GameActions } from "../../features/games/components/GameActions";
import { GameList } from "../../features/games/components/GameList";
import { CreateGameModal } from "../../features/games/components/CreateGameModal";
import { useGames } from "../../features/games/hooks/useGames";
import styles from "./HomePage.module.css";

type Props = {
  playerId: string;
  playerName: string;
  onLogout: () => void;
};

export function HomePage({ playerId, playerName, onLogout }: Props) {
  const games = useGames(playerId);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Twilight Imperium</h1>
      <p>
        Logged in as: <strong>{playerName}</strong>
      </p>
      <button onClick={onLogout}>Log out</button>

      <div className={styles.layout}>
        <GameActions
          onOpenCreateGame={games.openCreateModal}
          onConnectSelectedGame={games.handleConnectToSelectedGame}
          onDeleteSelectedGame={games.handleDeleteSelectedGame}
          selectedGameId={games.selectedGameId}
          status={games.status}
          error={games.error}
        />

        <GameList
          games={games.games}
          selectedGameId={games.selectedGameId}
          onSelectGame={games.setSelectedGameId}
        />
      </div>

      <CreateGameModal
        isOpen={games.isCreateModalOpen}
        gameName={games.newGameName}
        onGameNameChange={games.setNewGameName}
        onCreate={games.confirmCreateGame}
        onCancel={games.closeCreateModal}
      />
    </div>
  );
}
