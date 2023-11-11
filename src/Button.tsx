import React from "react";
/**
 * Button Components Collection
 *
 * This collection offers a main Button component and its specialized variants,
 * providing a wide range of styles, sizes, and configurations to cater to different UI needs.
 *
 * Main Features:
 * - Configurable styles through primary and secondary variants.
 * - Supports both text and icons (either left or right).
 * - Variety of sizes and colors to match different design systems.
 * - Specialized button variants like CircleButton and OutlineButton for common design patterns.
 *
 * Props:
 * @param {React.ReactNode} children - The button's label or content.
 * @param {React.ReactNode} iconLeft - Optional icon displayed to the left of the button label.
 * @param {React.ReactNode} iconRight - Optional icon displayed to the right of the button label.
 * @param {string} size - Size of the button ('xs', 'sm', 'md', 'lg', 'wide').
 * @param {string} primaryVariant - Primary style variant of the button.
 * @param {string} secondaryVariant - Secondary style variant of the button.
 * @param {string} color - Button color theme.
 * @param {string} className - Additional CSS classes.
 */

export type ButtonProps = {
  children?: string | React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  primaryVariant?: "link" | "outline" | "block" | "circle" | "square" | "disabled" | "wide" | "dark";
  secondaryVariant?: "link" | "outline" | "block" | "circle" | "square" | "disabled" | "wide" | "dark";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "base-100"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "ghost";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  /**Standard, VerticalButtonWithIcon, CircleIconButton, ButtonWithIcon**/
  size = "md",
  color = "accent",
  primaryVariant,
  secondaryVariant,
  className,
  children,
  iconLeft,
  iconRight,
  type = "button",
  ...rest
}: ButtonProps) => {
  // Configuration for button styles
  const BUTTON_STYLES = {
    color: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      neutral: "btn-neutral",
      "base-100": "btn-base-100",
      success: "btn-success",
      warning: "btn-warning",
      error: "btn-error",
      info: "btn-info",
      ghost: "btn-ghost",
    },
    variant: {
      link: "btn-link",
      outline: "btn-outline",
      block: "btn-block",
      circle: "btn-circle border-0",
      square: "btn-square",
      disabled: "btn-disabled",
      wide: "btn-wide",
      dark: "btn-dark",
    },
    size: {
      sm: "px-2 py-1  rounded-csm",
      md: "px-4 py-2 rounded-cmd",
      lg: "px-6 py-3 rounded-clg",
      full : "w-full"
    },
    circleSize: {
      sm: "w-8 h-8   [&>svg]:w-3 [&>svg]:h-3",
      md: "w-10 h-10  [&>svg]:w-5 [&>svg]:h-5 ",
      lg: "w-12 h-12 [&>svg]:w-6 [&>svg]:h-6",
      full : ""
    },
  };

  // Constructing the button's class names based on the provided props
  const classNames = `
    btn text-xs 
    ${primaryVariant == "circle" ? BUTTON_STYLES.circleSize[size] : BUTTON_STYLES.size[size]} 
    ${BUTTON_STYLES.color[color]} 
    ${primaryVariant && BUTTON_STYLES.variant[primaryVariant]} 
    ${secondaryVariant && BUTTON_STYLES.variant[secondaryVariant]} 
    ${className}
  `;

  return (
    <button type={type} className={classNames} {...rest}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
};

/**
 * CircleButton Component
 *
 * A button with a circular style.
 */
export const CircleButton = ({ ...props }: ButtonProps) => {
  return <Button primaryVariant="circle" {...props} />;
};

/**
 * OutlineButton Component
 *
 * A button with an outline style.
 */
export const OutlineButton = ({ ...props }: ButtonProps) => {
  return <Button primaryVariant="outline" {...props} />;
};

/**
 * TextWithLeftIconButton Component
 *
 * A button with an outline, color and scpesific className styles.
 */
export const TextWithLeftIconButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      primaryVariant="outline"
      color="secondary"
      size="sm"
      className={`rounded-cmd text-xs place-content-start content-center pl-1   ${className}`}
      {...props}
    /> /* Recebe ait */
  );
};

// FilledButton: A button with a solid background color
export const FilledButon = ({ className, ...props }: ButtonProps) => {
  return <Button color="secondary" size="sm" className={` ${className}`} {...props} />;
};

// ButtonVerticalWithIcon: A vertical layout button with an icon and accompanying text
export const ButtonVerticalWithIcon = ({ text, onClick, ...props }: ButtonProps & { text: string }) => {
  return (
    <div className={`flex flex-col justify-center items-center gap-2`}>
      <CircleButton onClick={onClick} {...props}>
        {props.children}
      </CircleButton>
      <span onClick={onClick} className="text-xs  cursor-pointer">
        {text}
      </span>
    </div>
  );
};

export default Button;
