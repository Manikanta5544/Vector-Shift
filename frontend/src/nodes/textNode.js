// textNode.js
import { BaseNode } from './BaseNode';
import { NODE_TYPES } from './nodeConfig';

export const TextNode = (props) => <BaseNode {...props} config={NODE_TYPES.text} />;
