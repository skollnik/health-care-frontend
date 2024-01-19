import { Children } from "../types";

type Props = {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children?: Children | Children[];
};

export const Button = ({ children, className, onClick, disabled }: Props) => {
  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
