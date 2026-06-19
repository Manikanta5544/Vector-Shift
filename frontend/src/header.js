// header.js

import './header.css';

export const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__logo">VectorShift</span>
        <span className="app-header__divider" />
        <div className="app-header__titles">
          <h1 className="app-header__title">Pipeline Studio</h1>
          <p className="app-header__subtitle">Build AI workflows visually</p>
        </div>
      </div>
    </header>
  );
};
