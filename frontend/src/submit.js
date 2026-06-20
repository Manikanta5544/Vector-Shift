// submit.js


import { useState, useCallback } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';
import { parsePipeline, PipelineApiError } from './api/pipelineApi';
import './submit.css';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

const formatAnalysisAlert = ({ num_nodes, num_edges, is_dag }) => {
  const dagStatus = is_dag ? ' Valid DAG' : ' Contains a cycle';
  return `Pipeline Analysis\n\nNodes: ${num_nodes}\nEdges: ${num_edges}\n\n${dagStatus}`;
};

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const result = await parsePipeline(nodes, edges);
      alert(formatAnalysisAlert(result));
    } catch (error) {
      const message =
        error instanceof PipelineApiError
          ? error.message
          : 'Unable to analyze pipeline. Please ensure the backend server is running.';
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [nodes, edges]);

  return (
    <footer className="app-footer">
      <button
        type="button"
        className="submit-button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        <span className="submit-button__icon">{isSubmitting ? '…' : '▶'}</span>
        {isSubmitting ? 'Analyzing…' : 'Submit Pipeline'}
      </button>
    </footer>
  );
};
