import { FormInput } from "../form-components";
import { WhiteBlock } from "../white-block";

type Props = {
  totalAmount: number;
  className?: string;
};

export const CheckoutPersonalData: React.FC<Props> = ({ totalAmount }) => {
  return (
    <WhiteBlock
      title="2. Персональная информация"
      className={!totalAmount ? "opacity-50 pointer-events-none" : ""}
      contentClassName="lg:p-8"
    >
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-5">
        <FormInput
          name="firstName"
          className="text-base col-span-2"
          placeholder="Имя"
        />

        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
