// nodeConfig.js

export const NODE_TYPES = {
  customInput: {
    label: 'Input',
    icon: '⬇️',
    description: 'Defines a pipeline input.',
    category: 'io',
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        getDefault: (id) => id.replace('customInput-', 'input_'),
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        options: ['Text', 'File'],
        defaultValue: 'Text',
      },
    ],
    // metadata: {
    //     version: '1.0',
    // },
    // tags: ['input', 'entrypoint', 'data'],
    handles: [{ id: 'value', type: 'source', position: 'right' }],
  },

  customOutput: {
    label: 'Output',
    icon: '⬆️',
    description: 'Defines a pipeline output.',
    category: 'io',
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        getDefault: (id) => id.replace('customOutput-', 'output_'),
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        options: ['Text', 'Image'],
        defaultValue: 'Text',
      },
    ],
    // metadata: {
    //     version: '1.0',
    // },
    // tags: ['output', 'result', 'export'],
    handles: [{ id: 'value', type: 'target', position: 'left' }],
  },

  llm: {
    label: 'LLM',
    icon: '🧠',
    description: 'Runs a system + user prompt through a language model.',
    category: 'ai',
    fields: [],
    // metadata: {
    //     version: '1.0',
    // },
    // tags: ['ai', 'llm', 'generation'],
    handles: [
      { id: 'system', type: 'target', position: 'left', label: 'system' },
      { id: 'prompt', type: 'target', position: 'left', label: 'prompt' },
      { id: 'response', type: 'source', position: 'right', label: 'response' },
    ],
  },

  text: {
    label: 'Text',
    icon: '📝',
    description: 'Static or templated text.',
    category: 'io',
    fields: [
      {
        name: 'text',
        label: 'Text',
        type: 'textarea',
        rows: 2,
        defaultValue: '{{input}}',
      },
    ],
    // metadata: {
    //     version: '1.0',
    // },
    // tags: ['text', 'template', 'prompt'],
    handles: [{ id: 'output', type: 'source', position: 'right' }],
  },

  // ---- Five new nodes demonstrating the abstraction ----

  api: {
    label: 'API Request',
    icon: '🌐',
    description: 'Calls an external HTTP endpoint.',
    category: 'integration',
    minWidth: 260,
    fields: [
      {
        name: 'endpoint',
        label: 'Endpoint',
        type: 'text',
        placeholder: 'https://api.example.com/v1/...',
      },
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        defaultValue: 'GET',
      },
      {
        name: 'headers',
        label: 'Headers',
        type: 'textarea',
        rows: 2,
        placeholder: '{ "Authorization": "Bearer ..." }',
      },
    ],
    // metadata: {
    //     version: '1.0',
    // },
    // tags: ['http', 'api', 'integration'],
    handles: [
      { id: 'input', type: 'target', position: 'left' },
      { id: 'output', type: 'source', position: 'right' },
    ],
  },

  database: {
    label: 'Database Query',
    icon: '🗄️',
    description: 'Runs a query against a connected database.',
    category: 'integration',
    minWidth: 260,
    fields: [
      {
        name: 'connection',
        label: 'Connection',
        type: 'text',
        placeholder: 'production-db',
      },
      {
        name: 'query',
        label: 'Query',
        type: 'textarea',
        rows: 3,
        placeholder: 'SELECT * FROM users WHERE ...',
      },
    ],
    // metadata: {
    //     version: '1.0',
    // },
    // tags: ['database', 'query', 'storage'],
    handles: [
      { id: 'input', type: 'target', position: 'left' },
      { id: 'output', type: 'source', position: 'right' },
    ],
  },

  condition: {
    label: 'Condition',
    icon: '🔀',
    description: 'Branches the pipeline based on an expression.',
    category: 'logic',
    fields: [
      {
        name: 'expression',
        label: 'If',
        type: 'text',
        placeholder: 'value > 10',
      },
    ],
    // metadata: {
    //     version: '1.0',
    // },
    // tags: ['logic', 'branching', 'condition'],
    handles: [
      { id: 'input', type: 'target', position: 'left' },
      { id: 'true', type: 'source', position: 'right', label: 'True' },
      { id: 'false', type: 'source', position: 'right', label: 'False' },
    ],
  },

  transform: {
    label: 'Transform',
    icon: '🔧',
    description: 'Reshapes data flowing through the pipeline.',
    category: 'logic',
    fields: [
      {
        name: 'transformType',
        label: 'Type',
        type: 'select',
        options: ['Map', 'Filter', 'Reduce', 'Custom'],
        defaultValue: 'Map',
      },
      {
        name: 'expression',
        label: 'Expression',
        type: 'textarea',
        rows: 2,
        placeholder: 'item => item.value',
      },
    ],
    // metadata: {
    //     version: '1.0',
    // },
    // tags: ['transform', 'mapping', 'processing'],
    handles: [
      { id: 'input', type: 'target', position: 'left' },
      { id: 'output', type: 'source', position: 'right' },
    ],
  },

  email: {
    label: 'Send Email',
    icon: '✉️',
    description: 'Sends an email as a pipeline action.',
    category: 'integration',
    fields: [
      {
        name: 'recipient',
        label: 'To',
        type: 'text',
        placeholder: 'someone@example.com',
      },
      {
        name: 'subject',
        label: 'Subject',
        type: 'text',
        getDefault: () => 'Pipeline notification',
      },
      {
        name: 'body',
        label: 'Body',
        type: 'textarea',
        rows: 3,
        placeholder: 'Message content...',
      },
    ],
    // metadata: {
    //     version: '1.0',
    // },
    // tags: ['email', 'notification', 'communication'],
    handles: [
      { id: 'input', type: 'target', position: 'left' },
      { id: 'output', type: 'source', position: 'right', label: 'sent' },
    ],
  },
};

// Resolves a single field's default value, preferring a computed default
// (getDefault) over a static one (defaultValue).
export const resolveFieldDefault = (field, nodeId) => {
  if (typeof field.getDefault === 'function') return field.getDefault(nodeId);
  return field.defaultValue ?? '';
};

// Builds a fully-formed data object for a brand-new node, so a node's
// `data` is never partially undefined — every declared field is present
// from the moment the node is dropped onto the canvas.
export const createInitialNodeData = (type, nodeId) => {
  const config = NODE_TYPES[type];
  const fieldDefaults = (config?.fields || []).reduce((acc, field) => {
    acc[field.name] = resolveFieldDefault(field, nodeId);
    return acc;
  }, {});
  return { id: nodeId, nodeType: type, ...fieldDefaults };
};
