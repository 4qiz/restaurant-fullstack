import { Badge } from "@/shared/ui/badge";
import { TableCell, TableRow } from "@/shared/ui/table";
import { roleColor, roleTranslations } from "../../helpers/role-mapping";
import { EmployeeUserDto } from "@/entities/employee-user/domain";
import { routes } from "@/shared/constants/routes";
import Link from "next/link";

interface Props {
  user: EmployeeUserDto;
}

export const EmployeeTableRow: React.FC<Props> = ({ user }) => {
  return (
    <Link href={routes.employeeUserId(user.id)} legacyBehavior={true}>
      <TableRow className="hover:cursor-pointer">
        <TableCell className="text-center text-sm">{user.name}</TableCell>
        <TableCell className="hidden md:block text-center">
          {user.email}
        </TableCell>
        <TableCell className="text-center">
          <Badge className={roleColor[user.role]} inert>
            {roleTranslations[user.role]}
          </Badge>
        </TableCell>
      </TableRow>
    </Link>
  );
};
