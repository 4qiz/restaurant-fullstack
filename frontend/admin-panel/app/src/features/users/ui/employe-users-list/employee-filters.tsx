import { Input } from "@/shared/ui/input";
import { ResponsiveButton } from "@/shared/ui/responsive-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { UserRole } from "@prisma/client";
import { Search } from "lucide-react";

interface Props {
  search: string;
  role: string | null;
  setSearch: (value: string) => void;
  setRole: (value: string) => void;
  fetchUsers: () => void;
}

export const EmployeeFilters: React.FC<Props> = ({
  search,
  role,
  setSearch,
  setRole,
  fetchUsers,
}) => {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex w-full items-center gap-2">
        <Input
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
        <ResponsiveButton onClick={fetchUsers} text="Найти" icon={<Search />} />
      </div>

      <Select value={role || ""} onValueChange={setRole}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Все роли" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Роли</SelectLabel>
            <SelectItem value="ALL">Все роли</SelectItem>
            <SelectItem value={UserRole.ADMIN}>Администратор</SelectItem>
            <SelectItem value={UserRole.DELIVERY}>Доставка</SelectItem>
            <SelectItem value={UserRole.MANAGER}>Менеджер</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
