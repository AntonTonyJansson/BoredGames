import { useState } from "react";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { HomePage } from "../pages/HomePage/HomePage";

function App() {
  const [playerId, setPlayerId] = useState("");
  const [playerName, setPlayerName] = useState("");

  const handleLoginSuccess = (newPlayerId: string, newPlayerName: string) => {
    setPlayerId(newPlayerId);
    setPlayerName(newPlayerName);
  };

  const handleLogout = () => {
    setPlayerId("");
    setPlayerName("");
  };

  if (!playerId) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <HomePage
      playerId={playerId}
      playerName={playerName}
      onLogout={handleLogout}
    />
  );
}

export default App;
