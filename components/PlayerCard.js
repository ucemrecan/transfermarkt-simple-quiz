import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";

export default function PlayerCard({ player }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!isMobile) {
    return (
      <Box sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Typography
            variant="body1"
            p={2}
            sx={{
              textDecoration: "underline",
            }}
          >
            Transfer History
          </Typography>
          <Table aria-label="transfer history table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Season</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>From</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>To</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Market Value</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Transfer Fee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {player.transfers.map((transfer, index) => (
                <TableRow key={index}>
                  <TableCell>{transfer.season}</TableCell>
                  <TableCell>{transfer.date}</TableCell>
                  <TableCell>{transfer.fromClub}</TableCell>
                  <TableCell>{transfer.toClub}</TableCell>
                  <TableCell>{transfer.marketValue}</TableCell>
                  <TableCell>{transfer.transferFee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Typography
          variant="body1"
          sx={{
            textDecoration: "underline",
            mb: 2,
          }}
        >
          Transfer History
        </Typography>

        {player.transfers.map((transfer, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 1.5,
              mb: 1.5,
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack spacing={1}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">Season:</Typography>
                <Typography variant="body2">{transfer.season}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">Date:</Typography>
                <Typography variant="body2">{transfer.date}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">From:</Typography>
                <Typography variant="body2">{transfer.fromClub}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">To:</Typography>
                <Typography variant="body2">{transfer.toClub}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">Market Value:</Typography>
                <Typography variant="body2">{transfer.marketValue}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">Transfer Fee:</Typography>
                <Typography variant="body2">{transfer.transferFee}</Typography>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Paper>
    </Box>
  );
}
