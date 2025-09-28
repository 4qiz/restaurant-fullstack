import { Input } from "@/shared/ui/input";
import { ResponsiveButton } from "@/shared/ui/responsive-button";
import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  fetchUsers: () => void;
}

export const UsersFilters: React.FC<Props> = ({
  search,
  setSearch,
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
    </div>
  );
};
