import { InfoIcon } from "lucide-react";
import { AlertTitle } from "../ui/alert";
import { Card, CardContent } from "../ui/card";

export const MessageCard = ({
  icon,
  message,
}: {
  message: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex justify-center items-center">
      <Card className="w-full md:w-80">
        <CardContent className="flex flex-col justify-center items-center gap-3 p-6">
          {icon || <InfoIcon />}
          <AlertTitle>{message}</AlertTitle>
        </CardContent>
      </Card>
    </div>
  );
};
