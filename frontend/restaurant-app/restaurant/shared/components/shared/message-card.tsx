import { AlertTitle } from "../ui/alert";
import { Card, CardContent } from "../ui/card";

export const MessageCard = ({
  icon,
  message,
}: {
  icon: React.ReactNode;
  message: string;
}) => {
  return (
    <div className="flex justify-center items-center">
      <Card className="w-full md:w-80">
        <CardContent className="flex flex-col justify-center items-center gap-3 pt-6">
          {icon}
          <AlertTitle>{message}</AlertTitle>
        </CardContent>
      </Card>
    </div>
  );
};
