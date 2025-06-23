import Link from 'next/link';
import React from 'react';
import Icon from './Icon'; // Import the actual Icon component

const navigationLinks = [
  {
    text: 'Home',
    url: '/',
    iconName: 'home',
  },
  {
    text: 'Food',
    url: '/food',
    iconName: 'fruit-apple',
  },
  {
    text: 'Activity',
    url: '/activity',
    iconName: 'pie-chart',
  },
  {
    text: 'You',
    url: '/profile',
    iconName: 'person',
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav>
        <ul className="nav__list">
          {navigationLinks.map(({ text, url, iconName }) => (
            <li key={url}>
              <Link href={url} className="nav__item">
                <Icon name={iconName} />
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </>
  );
};

export default Layout;
