type ButtonOutlineProps = {
  content: string;
  onClick?: () => void;
};
import { Button as ShadButton } from "@/components/ui/button";

const ButtonOutline: React.FC<ButtonOutlineProps> = (props) => {
  return (
    <ShadButton
      className="py-6 px-8 rounded-xl font-bold text-center font-sans text-base leading-loose  border border-dark-purple border-solid text-dark-purple"
      {...props}
    >
      {props.content}
    </ShadButton>
  );
};

export default ButtonOutline;
