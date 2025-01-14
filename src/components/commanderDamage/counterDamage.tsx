import { IconButton, Stack, Typography } from "@mui/material";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useGamePlayers } from "../../storeds/useThemeMode/useGamePlayers";
import { mana } from "../../data/mana";

export const CounterDamage = ({
  playerId,
  playerCommander,
  commanderId,
  damage,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const { subCommanderDamage, addCommanderDamage } = useGamePlayers();
  const { getConfigPlayer } = useGamePlayers();
  const player = getConfigPlayer(playerCommander);

  return (
    <>
      <>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"row"}
          marginX={0.3}
          sx={{
            backgroundImage: `url(${player?.bgMagic})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          bgcolor={player?.color ? mana[player.color]?.color : "#34495E"}
        >
          <Stack>
            <IconButton
              aria-label="sub"
              size="small"
              onClick={() =>
                subCommanderDamage(playerId, playerCommander, commanderId)
              }
              sx={{ color: "white" }}
            >
              <FaMinusCircle size={12} />
            </IconButton>
          </Stack>
          <Stack>
            <Typography
              variant="h6"
              color={"white"}
              fontWeight={"bold"}
              fontFamily={"monospace"}
              sx={{ textShadow: "2px 2px black" }}
              component={"span"}
            >
              {damage}
            </Typography>
          </Stack>
          <Stack>
            <IconButton
              aria-label="add"
              size="small"
              onClick={() =>
                addCommanderDamage(playerId, playerCommander, commanderId)
              }
              sx={{ color: "white" }}
            >
              <FaPlusCircle size={12} />
            </IconButton>
          </Stack>
        </Stack>
      </>
    </>
  );
};
