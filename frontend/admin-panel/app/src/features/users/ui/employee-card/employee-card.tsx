import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { EmployeeForm } from "./employee-form";
import { EmployeeUser } from "@prisma/client";

export const EmployeeCard = ({
  employeeUser,
}: {
  employeeUser: EmployeeUser;
}) => {
  return (
    <Card className="lg:w-1/2">
      <CardHeader>
        <CardTitle>Сотрудник</CardTitle>
      </CardHeader>
      <CardContent>
        <EmployeeForm employeeUser={employeeUser} />
      </CardContent>
    </Card>
  );
};
