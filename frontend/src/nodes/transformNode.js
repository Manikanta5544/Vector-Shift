// transformNode.js
import { BaseNode } from './BaseNode';
import { NODE_TYPES } from './nodeConfig';

export const TransformNode = (props) => <BaseNode {...props} config={NODE_TYPES.transform} />;
