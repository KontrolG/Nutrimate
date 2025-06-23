import React from 'react';
import Icon from './Icon'; // Assuming Icon.tsx is in the same directory

interface LogoProps extends React.HTMLAttributes<HTMLElement> {
  size?: string | number;
}

const Logo: React.FC<LogoProps> = ({ size, ...restProps }) => {
  return (
    <Icon
      name="logo"
      aria-label="Nutrimate Logo" // Changed alt to aria-label for accessibility with <i>
      style={{ color: '#fdb035', fontSize: size }}
      {...restProps}
    />
  );
};

Logo.defaultProps = {
  size: '1rem',
};

export default Logo;
