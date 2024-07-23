import { IconButton, Stack } from "@mui/material";
import { configCounter } from "../../data/configCounter";
import { defineSize } from "../../helpers/defineSize";
import { useGamePlayers } from "../../storeds/useThemeMode/useGamePlayers";

export const IconPhyrexia = ({
  color,
  action,
}: {
  color: string;
  action?: () => void;
}) => {
  const { players } = useGamePlayers();
  return (
    <IconButton
      aria-label="add"
      size="small"
      onClick={action}
    >
      <Stack
        height={configCounter?.iconBar[defineSize(players.length)]}
        width={configCounter?.iconBar[defineSize(players.length)]}
        overflow={"hidden"}
      >
        <svg
          viewBox="37.3275 420.565 55.4885 97.999"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            fill={color}
            d="M 92.634 469.492 C 92.693 464.148 90.995 458.754 87.667 454.564 C 86.06 452.794 84.736 450.777 83.034 449.103 C 79.279 445.378 73.659 445.13 69.138 442.783 C 68.874 440.426 68.013 438.068 68.534 435.689 C 68.693 434.898 68.927 434.097 68.505 433.341 C 67.318 430.609 68.339 427.642 68.128 424.794 C 67.97 423.306 68.07 421.485 66.652 420.565 C 66.322 423.663 65.183 426.545 64.26 429.483 C 63.834 431.774 63.834 434.159 62.847 436.319 C 63.474 438.508 62.234 440.35 60.892 441.965 C 57.924 443.485 54.396 443.846 51.814 446.074 C 49.974 447.637 47.986 449.006 45.927 450.277 C 44.382 452.211 42.671 454.074 41.982 456.517 C 39.22 459.851 38.894 464.328 37.328 468.234 C 37.299 474.033 38.474 480.277 42.178 484.925 C 44.828 487.113 46.68 490.056 49.327 492.243 C 51.868 493.761 54.579 495.007 57.202 496.37 C 58.911 496.77 60.677 496.966 62.378 497.431 C 63.757 504.54 64.7 511.82 67.47 518.564 C 68.388 515.796 68.277 512.828 69.07 510.031 C 70.189 505.896 67.894 501.592 69.187 497.531 C 71.125 495.799 74.357 496.924 76.507 495.437 C 80.599 492.914 84.929 490.457 87.898 486.597 C 89.003 484.378 91.324 482.72 91.324 480.058 C 91.343 476.475 93.433 473.117 92.634 469.492 Z M 62.261 491.424 C 59.296 490.703 56.534 489.285 54.048 487.553 C 51.372 485.77 50.374 482.444 47.734 480.619 C 45.261 477.67 45.796 473.639 44.783 470.144 C 45.189 467.705 45.668 465.287 45.922 462.818 C 47.127 460.863 48.988 459.304 49.504 456.949 C 51.273 454.416 53.963 452.664 56.123 450.469 C 57.695 448.656 60.197 449.422 62.262 449.35 C 62.058 451.35 61.896 453.42 62.396 455.391 C 62.64 456.604 63.187 457.799 63 459.067 C 62.586 461.766 63.598 464.475 62.883 467.143 C 61.44 472.719 63.014 478.352 63.151 483.975 C 62.945 486.463 62.828 488.973 62.261 491.424 Z M 84.738 480.854 C 82.775 482.252 81.101 483.965 79.388 485.639 C 76.409 487.7 73.464 489.879 69.919 490.909 C 70.238 488.38 70.55 485.778 69.745 483.302 C 67.766 477.708 70.189 471.857 70.599 466.2 C 70.238 462.837 70.582 459.249 69.039 456.151 C 68.838 453.825 69.845 451.577 70.525 449.387 C 72.867 450.323 75.072 451.584 77.021 453.207 C 79.375 454.973 82.982 456.115 83.509 459.406 C 83.777 461.566 86.142 462.873 86.073 465.084 C 85.927 470.34 86.652 475.836 84.738 480.854 Z"
          />
        </svg>
      </Stack>
    </IconButton>
  );
};
