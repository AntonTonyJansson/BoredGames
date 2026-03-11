import axios from "axios";
import type { CreateGameResponse, GameListItem } from "../types/game";

export async function getGames(playerId: string): Promise<GameListItem[]> {
  const response = await axios.get<GameListItem[]>(
    `/api/game/player/${playerId}`,
  );
  return response.data;
}

export async function createGame(
  playerId: string,
  gameName: string,
): Promise<CreateGameResponse> {
  const response = await axios.post<CreateGameResponse>("/api/game/create", {
    playerId,
    gameName,
  });

  return response.data;
}

export async function deleteGame(gameId: string): Promise<void> {
  await axios.delete(`/api/game/${gameId}`);
}
