import { useEffect, useState } from "react";
import { createGame, deleteGame, getGames } from "../api/gameApi";
import axios from "axios";
import type { GameListItem } from "../types/game";

export function useGames(playerId: string) {
  const [games, setGames] = useState<GameListItem[]>([]);
  const [selectedGameId, setSelectedGameId] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGameName, setNewGameName] = useState("");

  const refreshGames = async () => {
    try {
      const data = await getGames(playerId);
      setGames(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load games");
    }
  };

  const openCreateModal = () => {
    setError("");
    setNewGameName("");
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewGameName("");
  };

  const confirmCreateGame = async () => {
    try {
      setError("");
      setStatus("");

      const trimmedName = newGameName.trim();

      if (!trimmedName) {
        setError("Game name is required");
        return;
      }

      const result = await createGame(playerId, trimmedName);

      setStatus(`Created game ${result.gameName}`);
      closeCreateModal();
      await refreshGames();
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setError("You already have a game with that name");
        return;
      }

      setError("Failed to create game");
    }
  };

  const handleConnectToSelectedGame = () => {
    if (!selectedGameId) {
      setError("Select a game first");
      return;
    }

    setError("");
    setStatus(`Connected to game ${selectedGameId}`);
  };

  const handleDeleteSelectedGame = async () => {
    if (!selectedGameId) {
      setError("Select a game first");
      return;
    }

    try {
      setError("");
      setStatus("");

      await deleteGame(selectedGameId);
      setStatus(`Deleted game ${selectedGameId}`);
      setSelectedGameId("");
      await refreshGames();
    } catch (err) {
      console.error(err);
      setError("Failed to delete game");
    }
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const data = await getGames(playerId);
        if (!cancelled) {
          setGames(data);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Failed to load games");
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [playerId]);

  return {
    games,
    selectedGameId,
    setSelectedGameId,
    status,
    error,

    isCreateModalOpen,
    newGameName,
    setNewGameName,
    openCreateModal,
    closeCreateModal,
    confirmCreateGame,

    handleConnectToSelectedGame,
    handleDeleteSelectedGame,
  };
}
