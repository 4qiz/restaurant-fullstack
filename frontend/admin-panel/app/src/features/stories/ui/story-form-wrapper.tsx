import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export const StoryFormWrapper = ({
  children,
  className,
  headerLabel,
}: {
  children: React.ReactNode;
  headerLabel: string;
  className?: string;
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{headerLabel}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
