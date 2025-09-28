import { TableCell, TableRow } from "@/shared/ui/table";
import { UserDto } from "@/entities/user/domain";

interface Props {
  user: UserDto;
}

export const UserTableRow: React.FC<Props> = ({ user }) => {
  return (
    <TableRow className="hover:cursor-pointer">
      <TableCell className="text-center text-sm">{user.fullName}</TableCell>
      <TableCell className="text-center">{user.email}</TableCell>
    </TableRow>
  );
};
