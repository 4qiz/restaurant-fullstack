import Image from "next/image";

export const AuthHeader = ({ label }: { label: string }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center ">
      <Image src={"/logo.svg"} width={170} height={50} alt="Штаб" />
      {/* <h1 className="text-3xl font-semibold">Штаб</h1> */}
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
