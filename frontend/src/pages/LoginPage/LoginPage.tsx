import { useState } from "react";
import { login } from "../../features/auth/api/authApi";

type Props = {
  onLoginSuccess: (playerId: string, playerName: string) => void;
};

export function LoginPage({ onLoginSuccess }: Props) {
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      if (!playerName.trim()) {
        setError("Player name is required");
        return;
      }

      const result = await login(playerName.trim());
      onLoginSuccess(result.playerId, result.playerName);
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "4rem auto" }}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Player name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      <button
        onClick={handleLogin}
        style={{ width: "100%", padding: "0.75rem" }}
      >
        Log in
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
