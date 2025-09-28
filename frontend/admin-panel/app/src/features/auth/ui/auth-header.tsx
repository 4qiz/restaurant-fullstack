export const AuthHeader = ({
  label,
  description,
}: {
  label: string;
  description?: string;
}) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center ">
      <h1 className="text-3xl font-bold">{label}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};
