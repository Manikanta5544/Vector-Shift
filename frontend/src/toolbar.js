// toolbar.js

import { DraggableNode } from './draggableNode';
import { NODE_TYPES } from './nodes/nodeConfig';
import './toolbar.css';

const CATEGORY_ORDER = [
  { key: 'io', label: 'I/O' },
  { key: 'ai', label: 'AI' },
  { key: 'logic', label: 'Logic' },
  { key: 'integration', label: 'Integrations' },
];

export const PipelineToolbar = () => {
  const grouped = Object.entries(NODE_TYPES).reduce((acc, [type, config]) => {
    const category = config.category || 'default';
    (acc[category] = acc[category] || []).push({ type, ...config });
    return acc;
  }, {});

  return (
    <nav className="toolbar" aria-label="Available pipeline nodes">
      <span className="toolbar__eyebrow">Nodes</span>
      <div className="toolbar__groups">
        {CATEGORY_ORDER.filter(({ key }) => grouped[key]?.length).map(({ key, label }) => (
          <div className="toolbar__group" key={key}>
            <span className="toolbar__group-label">{label}</span>
            <div className="toolbar__group-items">
              {grouped[key].map((node) => (
                <DraggableNode key={node.type} type={node.type} label={node.label} icon={node.icon} category={key} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};
