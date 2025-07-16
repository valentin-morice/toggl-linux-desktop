import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import type { UserData } from "../../../utils/storage";

interface ProfileInfoTableProps {
  userData: UserData;
}

export default function ProfileInfoTable({ userData }: ProfileInfoTableProps) {
  return (
    <Table
      size="small"
      sx={{
        mb: 3,
        width: "100%",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "background.paper" : "#f5f5f5",
      }}
    >
      <TableBody>
        <TableRow
          sx={(theme) => ({
            backgroundColor: theme.palette.background.paper,
            height: 40,
            minHeight: 40,
          })}
        >
          <TableCell
            component="th"
            scope="row"
            sx={{ fontWeight: 600, border: 0, pl: 0, px: 2, py: 1 }}
          >
            Timezone
          </TableCell>
          <TableCell align="right" sx={{ border: 0, pr: 0, px: 2, py: 1 }}>
            {userData.timezone}
          </TableCell>
        </TableRow>
        <TableRow
          sx={(theme) => ({
            backgroundColor: theme.palette.action.hover,
            height: 40,
            minHeight: 40,
          })}
        >
          <TableCell
            component="th"
            scope="row"
            sx={{ fontWeight: 600, border: 0, pl: 0, px: 2, py: 1 }}
          >
            Workspace ID
          </TableCell>
          <TableCell align="right" sx={{ border: 0, pr: 0, px: 2, py: 1 }}>
            {userData.default_workspace_id}
          </TableCell>
        </TableRow>
        <TableRow
          sx={(theme) => ({
            backgroundColor: theme.palette.background.paper,
            height: 40,
            minHeight: 40,
          })}
        >
          <TableCell
            component="th"
            scope="row"
            sx={{ fontWeight: 600, border: 0, pl: 0, px: 2, py: 1 }}
          >
            2FA Enabled
          </TableCell>
          <TableCell align="right" sx={{ border: 0, pr: 0, px: 2, py: 1 }}>
            {userData["2fa_enabled"] ? (
              <CheckIcon color="success" fontSize="small" />
            ) : (
              <CloseIcon color="error" fontSize="small" />
            )}
          </TableCell>
        </TableRow>
        <TableRow
          sx={(theme) => ({
            backgroundColor: theme.palette.action.hover,
            height: 40,
            minHeight: 40,
          })}
        >
          <TableCell
            component="th"
            scope="row"
            sx={{ fontWeight: 600, border: 0, pl: 0, px: 2, py: 1 }}
          >
            Your Plan
          </TableCell>
          <TableCell align="right" sx={{ border: 0, pr: 0, px: 2, py: 1 }}>
            —
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
