// draggableNode.js

import { CATEGORY_COLORS } from './nodes/nodeConfig';

export const DraggableNode = ({ type, label, icon: Icon, category }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      style={{ '--accent': CATEGORY_COLORS[category] || '#6b7280' }}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {Icon && (
        <span className="draggable-node__icon">
          <Icon size={15} strokeWidth={2} />
        </span>
      )}
      <span className="draggable-node__label">{label}</span>
    </div>
  );
};
