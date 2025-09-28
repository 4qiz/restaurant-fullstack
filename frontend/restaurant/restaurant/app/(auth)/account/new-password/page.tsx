import { NewPasswordForm } from "@/shared/components/shared/auth/new-password-form";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div></div>}>
      <NewPasswordForm />
    </Suspense>
  );
};

export default Page;
