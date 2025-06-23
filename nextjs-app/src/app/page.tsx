import React from 'react';
import Logo from './components/Logo'; // Import the actual Logo component
import Button from './components/Button'; // Import the actual Button component

// Placeholder components - TODO: Implement these later
const SearchShortcut = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} style={{ display: 'block', margin: '10px 0' }}>
    Search Shortcut
  </button>
);

const HomePage = () => {
  const openSearch = () => {
    // TODO: Implement search opening logic
    console.log('Open search');
  };

  return (
    <>
      <header>Home</header> {/* Simple header for now */}
      <main>
        <section id="homeSection">
          <Logo size={80} />
          <h1>Nutrimate</h1>
          <h2>Calorie Counter</h2>
          <p className="copy">
            Find <strong>healthiest foods</strong> for you while{' '}
            <em>Nutrimate</em> tracks your <strong>calories</strong>.
          </p>
          <SearchShortcut onClick={openSearch} />
          <Button
            className="profile__shortcut"
            isFilled
            isPrimary
            icon={{ name: 'plate' }}
          >
            Sign In
          </Button>
        </section>
      </main>
    </>
  );
};

export default HomePage;
