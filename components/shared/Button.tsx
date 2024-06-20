import { Button as ShadButton } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type ButtonProps = {
  content: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ShadButton
      className="bg-dark-purple py-6 px-8 rounded-xl text-white font-semibold text-center font-sans text-base leading-loose disabled:opacity-50 hover:bg-[#834BDD]"
      {...props}
      disabled={props.loading || props.disabled}
    >
      {props.loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {props.content}
    </ShadButton>
  );
};

export default Button;
