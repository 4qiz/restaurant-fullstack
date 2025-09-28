import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { EmployeeTableRow } from "./employee-table-row";
import { EmployeeUserDto } from "@/entities/employee-user/domain";

interface Props {
  users: EmployeeUserDto[];
  loading: boolean;
}

export const EmployeeTable: React.FC<Props> = ({ users, loading }) => {
  if (loading) {
    return;
  }

  if (users.length === 0) {
    return <p className="text-center">Пользователи не найдены</p>;
  }

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Имя</TableHead>
          <TableHead className="hidden md:flex w-full justify-center items-center  ">
            Email
          </TableHead>
          <TableHead className="text-center">Роль</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <EmployeeTableRow key={user.id} user={user} />
        ))}
      </TableBody>
    </Table>
  );
};
