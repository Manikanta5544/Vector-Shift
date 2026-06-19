// submit.js

import './submit.css';

export const SubmitButton = () => {
  return (
    <footer className="app-footer">
      <button type="button" className="submit-button">
        <span className="submit-button__icon">▶</span>
        Submit Pipeline
      </button>
    </footer>
  );
};
