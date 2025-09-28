import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { UserDto } from "@/entities/user/domain";
import { UserTableRow } from "./user-table-row";

interface Props {
  users: UserDto[];
  loading: boolean;
}

export const UsersTable: React.FC<Props> = ({ users }) => {
  // if (loading) {
  //   return <Skeleton className="w-full h-20" />;
  // }

  if (users.length === 0) {
    return <p className="text-center">Пользователи не найдены</p>;
  }

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Имя</TableHead>
          <TableHead className="  text-center ">Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <UserTableRow key={user.id} user={user} />
        ))}
      </TableBody>
    </Table>
  );
};
