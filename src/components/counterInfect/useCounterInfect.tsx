import { InfoPlayer } from "../../@types";
import { useGamePlayers } from "../../storeds/useThemeMode/useGamePlayers";

export const useCounterInfect = (playerId: number) => {
  const { updatePlayers, getPlayer, setShowTemp } = useGamePlayers();
  const player = getPlayer(playerId);

  const addInfect = () => {
    const newInfoPlayer: InfoPlayer = {
      ...player,
      infect: player?.infect + 1,
    };
    setShowTemp(playerId, "infect");
    updatePlayers(newInfoPlayer);
  };

  const subInfect = () => {
    const newInfoPlayer: InfoPlayer = {
      ...player,
      infect: player?.infect - 1,
    };
    setShowTemp(playerId, "infect");
    updatePlayers(newInfoPlayer);
  };

  return {
    addInfect,
    subInfect,
  };
};