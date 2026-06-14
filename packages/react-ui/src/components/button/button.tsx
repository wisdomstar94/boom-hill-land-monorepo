import { type ButtonHTMLAttributes, type DetailedHTMLProps, useMemo } from "react";
import { type ButtonVariant, VARIANTS } from "./_consts/variant.consts";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: ButtonVariant;
  active?: boolean;
};

export function Button(props: ButtonProps) {
  const {
    children,
    type = "button",
    variant = VARIANTS.OUTLINE,
    active = false,
    ...otherProps
  } = props;

  const variantClass = useMemo(() => {
    switch (variant) {
      case VARIANTS.BLUE:
        return "text-white border border-transparent bg-blue-400 hover:bg-blue-500 data-[active=true]:bg-blue-500 data-[active=true]:hover:bg-blue-600";
      case VARIANTS.OUTLINE:
        return "text-black border border-gray-500 bg-white hover:bg-gray-100 data-[active=true]:bg-gray-100 data-[active=true]:hover:bg-gray-200";
    }
  }, [variant]);

  return (
    <button
      type={type}
      data-active={active}
      {...otherProps}
      className={`text-sm cursor-pointer px-2 py-1 rounded-md ${variantClass}`}
    >
      {children}
    </button>
  );
}
