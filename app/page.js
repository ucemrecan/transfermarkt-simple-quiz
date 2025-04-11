"use client";
import PlayerCard from "@/components/PlayerCard";
import PlayerGuessInput from "@/components/PlayerGuestInput";
import quizData from "@/mock/players";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <main>
        <Container
          maxWidth="md"
          sx={{
            padding: isMobile ? 2 : 4,
            paddingTop: isMobile ? 3 : 4,
          }}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            direction="column"
            spacing={isMobile ? 2 : 4}
          >
            <Typography
              variant={isMobile ? "h6" : "h5"}
              align="center"
              fontWeight={500}
            >
              Transfermarkt Simple Daily Quiz
            </Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{ px: isMobile ? 1 : 0 }}
            >
              How much do you know about the players? Guess the player by the
              transfer history.
            </Typography>

            <Stack
              alignItems="center"
              justifyContent="center"
              direction="column"
              spacing={isMobile ? 3 : 4}
              sx={{ width: "100%" }}
            >
              {quizData.map((player, index) => (
                <Box key={player.player} sx={{ width: "100%" }}>
                  <PlayerCard player={player} />
                  {index === 0 && (
                    <Box sx={{ mt: 2, width: "100%" }}>
                      <PlayerGuessInput
                        correctAnswer={player.player}
                        hints={
                          player.hints || [
                            `Nationality: ${player.nationality}`,
                            `Position: ${player.position}`,
                            `Birth year: ${player.birthYear}`,
                            `Current club: ${player.currentClub}`,
                          ]
                        }
                        onCorrectGuess={(score) =>
                          console.log(`Scored ${score} points`)
                        }
                        onFailure={() =>
                          console.log("Failed to guess correctly")
                        }
                      />
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          </Stack>
        </Container>
      </main>

      <footer>
        <Box
          sx={{
            padding: isMobile ? 2 : 4,
            paddingBottom: isMobile ? 4 : 4,
          }}
        >
          <Typography
            align="center"
            color="text.secondary"
            fontSize={isMobile ? 10 : 12}
          >
            developed by{" "}
            <Link
              href="https://github.com/ucemrecan"
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              ucemrecan
            </Link>
          </Typography>
        </Box>
      </footer>
    </div>
  );
}
