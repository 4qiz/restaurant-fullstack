import { Button } from "@/shared/ui/button";

export const DeleteConfirmationDialog = ({
  onDelete,
  onCancel,
  btnText,
  dialogText,
}: {
  onDelete: () => void;
  onCancel: () => void;
  btnText?: string;
  dialogText?: string;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <p>
        {dialogText ? dialogText : "Вы уверены, что хотите удалить этот товар?"}
      </p>
      <div className="flex justify-end gap-3">
        <Button onClick={onDelete} variant="destructive">
          {btnText ? btnText : "Удалить"}
        </Button>
        <Button onClick={onCancel} variant="outline">
          Закрыть
        </Button>
      </div>
    </div>
  );
};
