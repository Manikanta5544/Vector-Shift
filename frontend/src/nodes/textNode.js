// textNode.js

import { useState, useRef, useLayoutEffect, useMemo, useEffect, Fragment } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../store';
import { NODE_TYPES, resolveFieldDefault, CATEGORY_COLORS } from './nodeConfig';
import './textNode.css';

const VARIABLE_PATTERN = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

const MIN_WIDTH = 240;
const MAX_WIDTH = 520;
const MIN_HEIGHT = 88;
const MAX_HEIGHT = 320; // beyond this the textarea scrolls internally instead of the node growing without bound

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const extractVariables = (text) => {
  const found = [];
  for (const match of text.matchAll(VARIABLE_PATTERN)) {
    found.push(match[1]);
  }
  return Array.from(new Set(found));
};

const distribute = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

const config = NODE_TYPES.text;
const accent = CATEGORY_COLORS[config.category] || '#6B7280';
const textField = config.fields[0];
const Icon = config.icon;

export const TextNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();

  const text = data?.[textField.name] ?? resolveFieldDefault(textField, id);
  const variables = useMemo(() => extractVariables(text), [text]);
  const variablesKey = variables.join('|');

  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);
  const [width, setWidth] = useState(MIN_WIDTH);

  useLayoutEffect(() => {
    if (!mirrorRef.current) return;
    const longestLineWidth = mirrorRef.current.scrollWidth;
    setWidth(clamp(longestLineWidth + 28, MIN_WIDTH, MAX_WIDTH));
  }, [text]);

  useLayoutEffect(() => {
    const node = textareaRef.current;
    if (!node) return;
    node.style.height = 'auto';
    node.style.height = `${clamp(node.scrollHeight, MIN_HEIGHT, MAX_HEIGHT)}px`;
  }, [text, width]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [variablesKey, id, updateNodeInternals]);

  const handleTextChange = (event) => {
    updateNodeField(id, textField.name, event.target.value);
  };

  return (
    <div
      className={`text-node${selected ? ' text-node--selected' : ''}`}
      style={{ width, '--accent': accent }}
    >
      {variables.map((name, index) => {
        const top = distribute(index, variables.length);
        return (
          <Fragment key={name}>
            <Handle
              id={`${id}-field-${name}`}
              type="target"
              position={Position.Left}
              className="text-node__handle"
              style={{ top }}
            />
            <span className="text-node__handle-label" style={{ top }}>
              {name}
            </span>
          </Fragment>
        );
      })}

      {config.handles.map((handle, index) => (
        <Handle
          key={handle.id}
          id={`${id}-${handle.id}`}
          type={handle.type}
          position={Position.Right}
          className="text-node__handle"
          style={{ top: distribute(index, config.handles.length) }}
        />
      ))}

      <div className="text-node__header">
        <span className="text-node__icon">
          <Icon size={14} strokeWidth={2} />
        </span>
        <span className="text-node__title">{config.label}</span>
      </div>
      <p className="text-node__description">{config.description}</p>

      <textarea
        ref={textareaRef}
        className="text-node__textarea"
        value={text}
        placeholder="Hello {{name}}"
        spellCheck={false}
        onChange={handleTextChange}
      />
      
      <div ref={mirrorRef} className="text-node__mirror" aria-hidden="true">
        {text || ' '}
      </div>

      {variables.length > 0 && (
        <div className="text-node__variables">
          <span className="text-node__variables-label">Variables</span>
          <div className="text-node__variables-list">
            {variables.map((name) => (
              <span key={name} className="text-node__variable-badge">
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
