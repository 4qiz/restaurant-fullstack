import { useSession } from "next-auth/react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { CircleUser, User } from "lucide-react";

interface Props {
  onClickSignIn?: VoidFunction;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  onClickSignIn,
  className,
}) => {
  const { data: session } = useSession();
  return (
    <div className={className}>
      {session ? (
        <Link href="/profile">
          <Button
            loading={session === undefined}
            variant="outline"
            className="flex items-center gap-1 w-28"
          >
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      ) : (
        <Button
          loading={session === undefined}
          onClick={onClickSignIn}
          variant="outline"
          className="flex items-center gap-1 w-28"
        >
          <User size={16}></User>Войти
        </Button>
      )}
    </div>
  );
};
