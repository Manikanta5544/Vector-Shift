// pipelineApi.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export class PipelineApiError extends Error {
  constructor(message, { status = null, detail = null } = {}) {
    super(message);
    this.name = 'PipelineApiError';
    this.status = status;
    this.detail = detail;
  }
}

export const parsePipeline = async (nodes, edges) => {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges }),
    });
  } catch (networkError) {

    throw new PipelineApiError('Unable to reach the backend. Make sure the server is running.');
  }

  let body = null;
  try {
    body = await response.json();
  } catch {
    // Empty or non-JSON body — body stays null, the status check below still fires.
  }

  if (!response.ok) {
    const detail = body?.detail;
    throw new PipelineApiError(
      typeof detail === 'string' ? detail : `Request failed with status ${response.status}.`,
      { status: response.status, detail }
    );
  }

  return body; // { num_nodes, num_edges, is_dag }
};
