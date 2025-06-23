import React from 'react';

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name, ...restProps }) => {
  return <i className={`icon-${name}`} {...restProps}></i>;
};

export default Icon;
