// BaseNode.jsx

import React from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { resolveFieldDefault, CATEGORY_COLORS } from './nodeConfig';
import './BaseNode.css';

const POSITION_MAP = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

const distributeOffset = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

const FieldInput = ({ field, value, onChange }) => {
  switch (field.type) {
    case 'select':
      return (
        <select className="base-node__control" value={value} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case 'textarea':
      return (
        <textarea
          className="base-node__control base-node__control--textarea"
          rows={field.rows || 3}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case 'checkbox':
      return (
        <input
          type="checkbox"
          className="base-node__checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
        />
      );
    case 'number':
      return (
        <input
          type="number"
          className="base-node__control"
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case 'text':
    default:
      return (
        <input
          type="text"
          className="base-node__control"
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
};

export const BaseNode = ({ id, data, selected, config, children }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  if (!config) {
    console.error(`BaseNode: no config found for node id "${id}". Check nodeConfig.js.`);
    return null;
  }

  const { label, icon, description, category, fields = [], handles = [], minWidth = 220 } = config;
  const accent = CATEGORY_COLORS[category] || '#6B7280';

  const handlesByPosition = handles.reduce((acc, handle) => {
    const position = handle.position || 'left';
    (acc[position] = acc[position] || []).push(handle);
    return acc;
  }, {});

  return (
    <div
      className={`base-node base-node--${category || 'default'}${selected ? ' base-node--selected' : ''}`}
      style={{ minWidth, '--accent': accent }}
    >
      {Object.entries(handlesByPosition).map(([position, group]) =>
        group.map((handle, index) => {
          const offset = distributeOffset(index, group.length);
          const isVertical = position === 'left' || position === 'right';
          return (
            <React.Fragment key={handle.id}>
              <Handle
                id={`${id}-${handle.id}`}
                type={handle.type}
                position={POSITION_MAP[position]}
                className="base-node__handle"
                style={isVertical ? { top: offset } : { left: offset }}
              />
              {handle.label && (
                <span
                  className={`base-node__handle-label base-node__handle-label--${position}`}
                  style={isVertical ? { top: offset } : { left: offset }}
                >
                  {handle.label}
                </span>
              )}
            </React.Fragment>
          );
        })
      )}

      <div className="base-node__header">
        {icon && <span className="base-node__icon">{icon}</span>}
        <span className="base-node__title">{label}</span>
      </div>

      {description && <p className="base-node__description">{description}</p>}

      {fields.length > 0 && (
        <div className="base-node__body">
          {fields.map((field) => {
            const value = data?.[field.name] ?? resolveFieldDefault(field, id);
            return (
              <label key={field.name} className="base-node__field">
                <span className="base-node__field-label">{field.label}</span>
                <FieldInput field={field} value={value} onChange={(val) => updateNodeField(id, field.name, val)} />
              </label>
            );
          })}
        </div>
      )}

      {children}
    </div>
  );
};
