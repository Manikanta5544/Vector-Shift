// conditionNode.js
import { BaseNode } from './BaseNode';
import { NODE_TYPES } from './nodeConfig';

export const ConditionNode = (props) => <BaseNode {...props} config={NODE_TYPES.condition} />;
