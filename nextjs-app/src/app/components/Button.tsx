import React from 'react';
import Icon from './Icon'; // Assuming Icon.tsx is in the same directory
import './Button.css'; // We'll create this CSS file next

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFilled?: boolean;
  isPrimary?: boolean;
  icon?: { name: string; [key: string]: any }; // Allow other icon props
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className,
  isFilled,
  isPrimary,
  icon,
  children,
  ...restProps
}) => {
  const buttonClassNames = [
    'button',
    isPrimary ? 'button-primary' : '',
    isFilled ? 'button-filled' : '',
    className || '',
  ]
    .join(' ')
    .trim();

  return (
    <button className={buttonClassNames} {...restProps}>
      {icon && <Icon name={icon.name} {...icon} />}
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
