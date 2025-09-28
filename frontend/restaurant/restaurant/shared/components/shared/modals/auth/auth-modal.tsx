import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { signIn } from "next-auth/react";
import React from "react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<"login" | "register">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    onClose();
    setType("login");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full md:w-[450px] bg-white p-10 rounded-lg">
        {type === "login" ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}

        <hr />

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn("yandex", {
                callbackUrl: "/api/auth/callback/yandex",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <div className="relative size-7">
              <Image
                src={"/assets/images/yandex.svg"}
                alt="icon"
                fill
                className="object-contain "
              />
            </div>
            Яндекс
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/api/auth/callback/google",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="google"
            />
            Google
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={onSwitchType}
          type="button"
          className="h-12"
        >
          {type !== "login" ? "Войти" : "Регистрация"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
