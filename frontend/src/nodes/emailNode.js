// emailNode.js
import { BaseNode } from './BaseNode';
import { NODE_TYPES } from './nodeConfig';

export const EmailNode = (props) => <BaseNode {...props} config={NODE_TYPES.email} />;
