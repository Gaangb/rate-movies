import { Avatar, Box, Stack, Typography } from "@mui/material";
import noPoster from '../../assets/Image-not-found.png'

    
export function ActorItem({ name, character, profilePath }) {
  const profileUrl = profilePath ? `https://image.tmdb.org/t/p/w185${profilePath}` : noPoster;

  return (
<Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 240 }}>
      <Avatar
        src={profileUrl}
        alt={name}
        sx={{ width: 56, height: 56 }}
      />
      <Box minWidth={0}>
        <Typography fontWeight={700} noWrap>
          {name}
        </Typography>
        <Typography color="text.secondary" noWrap>
          {character || "—"}
        </Typography>
      </Box>
    </Stack>
  );
}