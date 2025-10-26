import { Avatar, Box, Stack, Typography, Tooltip } from "@mui/material"
import noPoster from "../../assets/Image-not-found.png"

export function ActorItem({ name, character, profilePath }) {
  const profileUrl = profilePath
    ? `https://image.tmdb.org/t/p/w185${profilePath}`
    : noPoster

  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      sx={{
        minWidth: 0,
        width: 180,
        overflow: "hidden",
      }}

    >
      <Avatar
        src={profileUrl}
        alt={name}
        sx={{
          width: 56,
          height: 56,
          flexShrink: 0,
        }}
      />
      <Box
        sx={{
          minWidth: 0,
          flexGrow: 1,
          maxWidth: "100%",
        }}
      >
        <Tooltip title={name} arrow>
          <Typography
            fontWeight={700}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
            }}
          >
            {name?.length > 15 ? `${name.slice(0, 15)}...` : name}
          </Typography>
        </Tooltip>

        <Tooltip title={character || "—"} arrow>
          <Typography
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
            }}
          >
            {character?.length > 10
              ? `${character.slice(0, 10)}...`
              : character || "—"}
          </Typography>
        </Tooltip>
      </Box>
    </Stack>
  )
}
