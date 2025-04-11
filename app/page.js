import PlayerCard from "@/components/PlayerCard";
import PlayerGuestInput from "@/components/PlayerGuestInput";
import quizData from "@/mock/players";
import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <Container maxWidth="md" sx={{ padding: 4 }}>
          <Stack
            alignItems="center"
            justifyContent="center"
            direction="column"
            spacing={4}
          >
            <Typography variant="h5" align="center" fontWeight={500}>
              Transfermarkt Simple Daily Quiz
            </Typography>
            <Typography variant="body2" align="center">
              How much do you know about the players? Guess the player by the
              transfer history.
            </Typography>
            <Stack
              alignItems="center"
              justifyContent="center"
              direction="column"
              spacing={2}
            >
              {quizData.map((player, index) => (
                <PlayerCard key={player.player} player={player} />
              ))}
              <PlayerGuestInput
                correctAnswer={quizData[0].player}
                hints={quizData[0].hints}
              />
            </Stack>
          </Stack>
        </Container>
      </main>
      <footer>
        <Box sx={{ padding: 4 }}>
          <Typography align="center" color="text.secondary" fontSize={12}>
            developed by{" "}
            <Link  href="https://github.com/ucemrecan">ucemrecan</Link>
          </Typography>
        </Box>
      </footer>
    </div>
  );
}
