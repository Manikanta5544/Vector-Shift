// header.js

import './header.css';

export const AppHeader = () => {
  return (
    <header className="app-header">
      <span className="app-header__brand">VectorShift</span>
      <h1 className="app-header__title">Pipeline Studio</h1>
      <p className="app-header__subtitle">Design and analyze AI workflows</p>
    </header>
  );
};
