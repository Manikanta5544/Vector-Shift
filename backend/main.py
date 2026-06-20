# main.py

from collections import Counter

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict

from graph import is_directed_acyclic_graph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineNode(BaseModel):
    id: str

    model_config = ConfigDict(extra="allow")


class PipelineEdge(BaseModel):
    source: str
    target: str

    model_config = ConfigDict(extra="allow")


class PipelineRequest(BaseModel):
    nodes: list[PipelineNode]
    edges: list[PipelineEdge]


class PipelineParseResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse", response_model=PipelineParseResponse)
def parse_pipeline(pipeline: PipelineRequest):
    node_ids = [node.id for node in pipeline.nodes]

    duplicate_ids = [node_id for node_id, count in Counter(node_ids).items() if count > 1]
    if duplicate_ids:
        raise HTTPException(
            status_code=400,
            detail=f"Duplicate node id(s) in payload: {duplicate_ids}",
        )

    node_id_set = set(node_ids)
    for edge in pipeline.edges:
        if edge.source not in node_id_set or edge.target not in node_id_set:
            raise HTTPException(
                status_code=400,
                detail=(
                    "Edge references a node id that isn't in the payload "
                    f"(source={edge.source!r}, target={edge.target!r})."
                ),
            )

    edge_pairs = [(edge.source, edge.target) for edge in pipeline.edges]

    return PipelineParseResponse(
        num_nodes=len(pipeline.nodes),
        num_edges=len(pipeline.edges),
        is_dag=is_directed_acyclic_graph(node_ids, edge_pairs),
    )
