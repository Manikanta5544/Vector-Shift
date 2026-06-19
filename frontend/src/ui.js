// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { APINode } from './nodes/apiNode';
import { DatabaseNode } from './nodes/databaseNode';
import { ConditionNode } from './nodes/conditionNode';
import { TransformNode } from './nodes/transformNode';
import { EmailNode } from './nodes/emailNode';
import { createInitialNodeData, NODE_TYPES, CATEGORY_COLORS } from './nodes/nodeConfig';

import 'reactflow/dist/style.css';
import './reactflow-theme.css';
import './ui.css';

const gridSize = 24;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  database: DatabaseNode,
  condition: ConditionNode,
  transform: TransformNode,
  email: EmailNode,
};

const minimapNodeColor = (node) => CATEGORY_COLORS[NODE_TYPES[node.type]?.category] || '#6b7280';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(
    selector,
    shallow
  );

  // Builds a fully-formed data object (every declared field present, with
  // its resolved default) instead of the bare { id, nodeType } the starter
  // shipped with — so a node's data is never partially undefined.
  const getInitNodeData = (nodeID, type) => createInitialNodeData(type, nodeID);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type || !nodeTypes[type]) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);

        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="pipeline-canvas" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
      >
        <Background color="#1f2937" gap={gridSize} />
        <Controls />
        <MiniMap nodeColor={minimapNodeColor} maskColor="rgba(11, 16, 32, 0.65)" pannable zoomable />
      </ReactFlow>

      {nodes.length === 0 && (
        <div className="pipeline-empty-state">
          <p>Drag a node onto the canvas to begin building your workflow.</p>
        </div>
      )}
    </div>
  );
};
