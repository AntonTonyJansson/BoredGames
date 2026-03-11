import axios from "axios";
import type { LoginResponse } from "../types/auth";

export async function login(playerName: string): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>("/api/auth/login", {
    playerName,
  });

  return response.data;
}
