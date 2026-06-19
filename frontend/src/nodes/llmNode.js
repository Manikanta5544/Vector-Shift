// llmNode.js
import { BaseNode } from './BaseNode';
import { NODE_TYPES } from './nodeConfig';

export const LLMNode = (props) => <BaseNode {...props} config={NODE_TYPES.llm} />;
