import { BsExclamationTriangle } from "react-icons/bs";

export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="bg-destructive text-destructive-foreground p-3 rounded-md flex items-center gap-x-2 text-sm">
      <BsExclamationTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
