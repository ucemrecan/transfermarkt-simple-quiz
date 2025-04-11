import {
  Check as CheckIcon,
  Close as CloseIcon,
  Lightbulb as HintIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { lowerCase } from "lodash";
import { useState } from "react";

export default function PlayerGuessInput({
  correctAnswer,
  hints = [],
  onCorrectGuess,
  onFailure,
  maxAttempts = 3,
}) {
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleGuessSubmit = (e) => {
    e.preventDefault();

    if (!guess.trim()) return;

    const normalizedGuess = lowerCase(guess.trim());
    const normalizedAnswer = lowerCase(correctAnswer);

    if (normalizedGuess === normalizedAnswer) {
      const baseScore = 10;
      const hintPenalty = hintsUsed * 2;
      const attemptPenalty = attempts * 1;
      const finalScore = Math.max(1, baseScore - hintPenalty - attemptPenalty);

      setFeedback(`Correct! The player is ${correctAnswer}.`);
      setGameStatus("success");

      if (onCorrectGuess) onCorrectGuess(finalScore);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= maxAttempts) {
        setFeedback(`Game over! The player was ${correctAnswer}.`);
        setGameStatus("failed");
        if (onFailure) onFailure();
      } else {
        setFeedback(
          `Incorrect. You have ${maxAttempts - newAttempts} attempts left.`
        );
      }
    }

    setGuess("");
  };

  const useHint = () => {
    if (hintsUsed < hints.length) {
      setHintsUsed(hintsUsed + 1);
    }
  };

  const getScoreText = () => {
    const baseScore = 10;
    const hintPenalty = hintsUsed * 2;
    const attemptPenalty = attempts * 1;
    return `Potential score: ${Math.max(
      1,
      baseScore - hintPenalty - attemptPenalty
    )} points`;
  };

  return (
    <Paper elevation={1} sx={{ padding: isMobile ? 2 : 3, width: "100%" }}>
      {gameStatus === "playing" && (
        <>
          <form onSubmit={handleGuessSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Guess the player"
                variant="outlined"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                autoComplete="off"
                disabled={gameStatus !== "playing"}
                size={isMobile ? "small" : "medium"}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 1 : 0,
                  justifyContent: "space-between",
                  alignItems: isMobile ? "stretch" : "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={gameStatus !== "playing" || !guess.trim()}
                  fullWidth={isMobile}
                  size={isMobile ? "small" : "medium"}
                >
                  Submit Guess
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<HintIcon />}
                  onClick={useHint}
                  disabled={
                    gameStatus !== "playing" || hintsUsed >= hints.length
                  }
                  fullWidth={isMobile}
                  size={isMobile ? "small" : "medium"}
                  sx={{ mt: isMobile ? 1 : 0 }}
                >
                  Use Hint ({hints.length - hintsUsed} left)
                </Button>
              </Box>

              {hintsUsed > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Hints:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {hints.slice(0, hintsUsed).map((hint, index) => (
                      <Chip
                        key={index}
                        label={hint}
                        color="info"
                        size="small"
                        sx={{ margin: "2px" }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              <Typography variant="caption" color="text.secondary">
                {getScoreText()}
              </Typography>
            </Stack>
          </form>
        </>
      )}

      {feedback && (
        <Box
          sx={{
            mt: 2,
            p: isMobile ? 1.5 : 2,
            bgcolor:
              gameStatus === "success"
                ? "success.light"
                : gameStatus === "failed"
                ? "error.light"
                : "info.light",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {gameStatus === "success" && <CheckIcon sx={{ mr: 1 }} />}
          {gameStatus === "failed" && <CloseIcon sx={{ mr: 1 }} />}
          <Typography variant={isMobile ? "body2" : "body1"}>
            {feedback}
          </Typography>
        </Box>
      )}

      {gameStatus !== "playing" && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"}>
            {gameStatus === "success"
              ? `Congratulations! Your score: ${Math.max(
                  1,
                  10 - hintsUsed * 2 - attempts * 1
                )}`
              : "Better luck next time!"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Come back tomorrow for a new challenge!
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
