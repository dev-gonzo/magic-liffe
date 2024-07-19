import { Stack, Typography } from "@mui/material";
import { useGamePlayers } from "../../storeds/useThemeMode/useGamePlayers";
import { Props } from "./types";

export const CommanderDamage = ({ playerId }: Props) => {
  const { getPlayer, addCommanderDamage } = useGamePlayers();
  const player = getPlayer(playerId);

  return (
    <Stack
      flexDirection={"row"}
      gap={0.5}
      flexWrap={"wrap"}
      justifyContent={"space-evenly"}
    >
      {player?.commanderDamage?.map((item) => (
        <Stack
          width={35}
          height={25}
          bgcolor={"blue"}
          borderRadius={1.5}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => {
            addCommanderDamage(playerId, item?.player, item?.commander);
          }}
        >
          <Typography
            variant="body1"
            color={"white"}
            fontWeight={"bold"}
            fontFamily={"monospace"}
            sx={{ textShadow: "1px 1px black" }}
            component={"span"}
          >
            {item?.damage}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};