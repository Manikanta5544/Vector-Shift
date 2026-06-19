// apiNode.js
import { BaseNode } from './BaseNode';
import { NODE_TYPES } from './nodeConfig';

export const APINode = (props) => <BaseNode {...props} config={NODE_TYPES.api} />;
