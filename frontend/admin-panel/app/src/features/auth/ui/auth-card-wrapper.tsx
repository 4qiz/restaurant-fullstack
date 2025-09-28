import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { AuthHeader } from "./auth-header";

export const AuthCardWrapper = ({
  children,
  headerLabel,
  headerDescription,
}: {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription?: string;
  showSocial?: boolean;
}) => {
  return (
    <Card className="w-full md:w-[400px] shadow-md">
      <CardHeader>
        <AuthHeader label={headerLabel} description={headerDescription} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
