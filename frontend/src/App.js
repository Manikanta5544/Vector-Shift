import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { AppHeader } from './header';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <AppHeader />
      <PipelineToolbar />
      <div className="app-canvas">
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
