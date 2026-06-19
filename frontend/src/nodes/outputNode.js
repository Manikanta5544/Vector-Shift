// outputNode.js
import { BaseNode } from './BaseNode';
import { NODE_TYPES } from './nodeConfig';

export const OutputNode = (props) => <BaseNode {...props} config={NODE_TYPES.customOutput} />;
