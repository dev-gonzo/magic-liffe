import { create } from "zustand";
import { getStoragePlayer } from "../../helpers/getStoragePlayers";
import { PropsInfoPlayers } from "./@types";
import { ConfigPlayer, InfoPlayer } from "../../@types";
import { RiShieldFlashFill } from "react-icons/ri";
import { getStorageConfigPlayer } from "../../helpers/getStorageConfigPlayers";
import { getStorageScreen } from "../../helpers/getStorageScreen";

export const useGamePlayers = create<PropsInfoPlayers>((set, get) => ({
  players: getStoragePlayer(),
  screen: getStorageScreen(),
  configPlayers: getStorageConfigPlayer(),
  showTemp: undefined,

  toggleScreen: () =>
    set((state) => {
      const screen = state?.screen == "table" ? "display" : "table";
      localStorage.setItem("screen", JSON.stringify(screen));
      return { screen: screen };
    }),
  saveConfigPlayers: (configPlayer) =>
    set((state) => {
      const newConfigPlayers = state?.configPlayers;

      const indexPlayer = newConfigPlayers?.findIndex(
        (item) => item?.player == configPlayer?.player
      );

      if (indexPlayer > -1) {
        newConfigPlayers[indexPlayer] = configPlayer;

        localStorage.setItem("configPlayers", JSON.stringify(newConfigPlayers));
        return { configPlayers: newConfigPlayers };
      }

      newConfigPlayers?.push(configPlayer);

      localStorage.setItem("configPlayers", JSON.stringify(newConfigPlayers));
      return { configPlayers: newConfigPlayers };
    }),

  getConfigPlayer: (playerId) => {
    return get().configPlayers?.find(
      (item) => item?.player == playerId
    ) as ConfigPlayer;
  },

  resetConfigPlayers: () =>
    set(() => {
      localStorage.removeItem("configPlayers");
      return { configPlayers: [] };
    }),

  initGame: (playersNumber) =>
    set((state) => {
      const oldPlayersQtd = state?.players?.length;
      let newPlayers: InfoPlayer[] = [];

      if (playersNumber) {
        for (let i = 0; i < playersNumber; i++) {
          newPlayers.push({
            player: i + 1,
            life: 40,
            commanderDamage: [],
            commanderTax: 0,
            infect: 0,
            rad: 0,
            energy: 0,
            experience: 0,
            citysBlessing: false,
            monarch: false,
            viewCommanderDamage: false,
            loses: false,
            immmortal: false,
            sorted: false,
          });
        }
      } else if (!playersNumber && !oldPlayersQtd) {
        for (let i = 0; i < 2; i++) {
          newPlayers.push({
            player: i + 1,
            life: 40,
            commanderDamage: [],
            commanderTax: 0,
            infect: 0,
            rad: 0,
            energy: 0,
            experience: 0,
            citysBlessing: false,
            monarch: false,
            viewCommanderDamage: false,
            loses: false,
            immmortal: false,
            sorted: false,
          });
        }
      } else {
        newPlayers = state?.players;
      }

      localStorage?.setItem("players", JSON.stringify(newPlayers));
      return { players: newPlayers };
    }),

  updatePlayers: (infoPlayer) =>
    set((state) => {
      const newInfoPlayers = state?.players;

      const indexPlayer = newInfoPlayers?.findIndex(
        (item) => item?.player == infoPlayer?.player
      );

      newInfoPlayers[indexPlayer] = infoPlayer;

      localStorage.setItem("players", JSON.stringify(newInfoPlayers));
      return { players: newInfoPlayers };
    }),

  getPlayer: (playerId) => {
    return get().players?.find(
      (item) => item?.player == playerId
    ) as InfoPlayer;
  },

  addLife: (playerId) =>
    set((state) => {
      const newInfoPlayers = state?.players;

      const indexPlayer = newInfoPlayers?.findIndex(
        (item) => item?.player == playerId
      );

      newInfoPlayers[indexPlayer] = {
        ...newInfoPlayers[indexPlayer],
        life: newInfoPlayers[indexPlayer]?.life + 1,
      };

      localStorage.setItem("players", JSON.stringify(newInfoPlayers));
      return { players: newInfoPlayers };
    }),

  subLife: (playerId) =>
    set((state) => {
      const newInfoPlayers = state?.players;

      const indexPlayer = newInfoPlayers?.findIndex(
        (item) => item?.player == playerId
      );

      newInfoPlayers[indexPlayer] = {
        ...newInfoPlayers[indexPlayer],
        life: newInfoPlayers[indexPlayer]?.life - 1,
      };

      localStorage.setItem("players", JSON.stringify(newInfoPlayers));
      return { players: newInfoPlayers };
    }),

  addCommanderDamage: (playerId, playerCommander, commanderId) =>
    set((state) => {
      const newInfoPlayers = state?.players;

      const indexPlayer = newInfoPlayers?.findIndex(
        (item) => item?.player == playerId
      );

      const damageCommanderIndex = newInfoPlayers[
        indexPlayer
      ]?.commanderDamage?.findIndex((item) => {
        return (
          item?.commander == commanderId && item?.player == playerCommander
        );
      });

      if (damageCommanderIndex > -1) {
        const damageCommander = newInfoPlayers[indexPlayer]?.commanderDamage;

        damageCommander[damageCommanderIndex] = {
          ...damageCommander[damageCommanderIndex],
          damage: damageCommander[damageCommanderIndex]?.damage + 1,
        };

        newInfoPlayers[indexPlayer] = {
          ...newInfoPlayers[indexPlayer],
          commanderDamage: damageCommander,
          life: newInfoPlayers[indexPlayer]?.life - 1,
        };

        localStorage.setItem("players", JSON.stringify(newInfoPlayers));
        return { players: newInfoPlayers };
      }

      newInfoPlayers[indexPlayer] = {
        ...newInfoPlayers[indexPlayer],
        commanderDamage: [
          ...newInfoPlayers[indexPlayer].commanderDamage,
          {
            player: playerCommander,
            commander: commanderId,
            damage: 1,
          },
        ],
        life: newInfoPlayers[indexPlayer]?.life - 1,
      };

      localStorage.setItem("players", JSON.stringify(newInfoPlayers));
      return { players: newInfoPlayers };
    }),

  subCommanderDamage: (playerId, playerCommander, commanderId) =>
    set((state) => {
      const newInfoPlayers = state?.players;

      const indexPlayer = newInfoPlayers?.findIndex(
        (item) => item?.player == playerId
      );

      const damageCommanderIndex = newInfoPlayers[
        indexPlayer
      ]?.commanderDamage?.findIndex(
        (item) =>
          item?.commander == commanderId && item?.player == playerCommander
      );

      if (damageCommanderIndex > -1) {
        const damageCommander = newInfoPlayers[indexPlayer]?.commanderDamage;

        damageCommander[damageCommanderIndex] = {
          ...damageCommander[damageCommanderIndex],
          damage:
            damageCommander[damageCommanderIndex]?.damage > 0
              ? damageCommander[damageCommanderIndex]?.damage - 1
              : 0,
        };

        newInfoPlayers[indexPlayer] = {
          ...newInfoPlayers[indexPlayer],
          commanderDamage: damageCommander,
          life: newInfoPlayers[indexPlayer]?.life + 1,
        };

        localStorage.setItem("players", JSON.stringify(newInfoPlayers));
        return { players: newInfoPlayers };
      }

      localStorage.setItem("players", JSON.stringify(newInfoPlayers));
      return { players: newInfoPlayers };
    }),

  setMonarch: (playerId) =>
    set((state) => {
      const oldInfoPlayers = state?.players;

      const indexPlayer = oldInfoPlayers?.findIndex(
        (item) => item?.player == playerId
      );

      if (oldInfoPlayers[indexPlayer]?.monarch) {
        oldInfoPlayers[indexPlayer] = {
          ...oldInfoPlayers[indexPlayer],
          monarch: false,
        };

        localStorage.setItem("players", JSON.stringify(oldInfoPlayers));
        return { players: oldInfoPlayers };
      }

      const newInfoPlayers = state.players.map((item) => {
        return { ...item, monarch: item?.player == playerId };
      });

      localStorage.setItem("players", JSON.stringify(newInfoPlayers));
      return { players: newInfoPlayers };
    }),

  setShowTemp: (playerId, layer) =>
    set(() => {
      return {
        showTemp: {
          layer: layer,
          icon: <RiShieldFlashFill size={33} color="white" />,
          playerId: playerId,
          timestamp: new Date().getTime() + 1500,
        },
      };
    }),

  toogleShowCommander: (playerId) =>
    set((state) => {
      const newInfoPlayers = state?.players;

      const indexPlayer = newInfoPlayers?.findIndex(
        (item) => item?.player == playerId
      );

      newInfoPlayers[indexPlayer] = {
        ...newInfoPlayers[indexPlayer],
        viewCommanderDamage: !newInfoPlayers[indexPlayer]?.viewCommanderDamage,
      };

      localStorage.setItem("players", JSON.stringify(newInfoPlayers));
      return { players: newInfoPlayers };
    }),

  cleanShowTemp: () =>
    set(() => {
      return {
        showTemp: undefined,
      };
    }),

  setSorted: (playerId) =>
    set((state) => {
      console.log();
      const newInfoPlayers = state?.players?.map((item) => {
        return {
          ...item,
          sorted: item?.player == playerId,
        };
      });

      localStorage.setItem("players", JSON.stringify(newInfoPlayers));
      return { players: newInfoPlayers };
    }),
}));
