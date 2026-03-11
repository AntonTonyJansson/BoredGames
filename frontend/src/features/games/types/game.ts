export type GameListItem = {
  id: string;
  gameName: string;
  playerName: string;
  status: string;
  currentPlayer: number;
  createdAtUtc: string;
};

export type CreateGameResponse = {
  gameId: string;
  gameName: string;
  status: string;
  createdAtUtc: string;
};
