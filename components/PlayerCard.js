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
} from "@mui/material";

export default function PlayerCard({ player }) {
  return (
    <Box>
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
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            {player.transfers.map((transfer) => (
              <TableRow key={transfer.season}>
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
