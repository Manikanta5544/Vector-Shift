// databaseNode.js
import { BaseNode } from './BaseNode';
import { NODE_TYPES } from './nodeConfig';

export const DatabaseNode = (props) => <BaseNode {...props} config={NODE_TYPES.database} />;
