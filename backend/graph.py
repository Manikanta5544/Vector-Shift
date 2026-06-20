# graph.py

from collections import deque


def build_adjacency(node_ids, edges):
    adjacency = {node_id: [] for node_id in node_ids}
    for source, target in edges:
        adjacency[source].append(target)
    return adjacency


def build_indegree(node_ids, edges):
    indegree = {node_id: 0 for node_id in node_ids}
    for _source, target in edges:
        indegree[target] += 1
    return indegree


def is_directed_acyclic_graph(node_ids, edges):
    
    node_ids = list(node_ids)
    adjacency = build_adjacency(node_ids, edges)
    indegree = build_indegree(node_ids, edges)

    queue = deque(node_id for node_id in node_ids if indegree[node_id] == 0)
    visited_count = 0

    while queue:
        current = queue.popleft()
        visited_count += 1
        for neighbor in adjacency[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(node_ids)
