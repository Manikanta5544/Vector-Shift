// toolbar.js

import { DraggableNode } from './draggableNode';
import { NODE_TYPES } from './nodes/nodeConfig';
import './draggableNode.css';

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {Object.entries(NODE_TYPES).map(([type, config]) => (
          <DraggableNode key={type} type={type} label={config.label} icon={config.icon} />
        ))}
      </div>
    </div>
  );
};
