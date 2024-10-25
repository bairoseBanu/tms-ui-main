import dagre from "dagre";
import { Edge, Node, Position } from "reactflow";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 200;

export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB"
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction, nodesep: 100, edgesep: 50 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // Calculate target position based on source node and direction
    if (node.parentNode) {
      const parentNodeWithPosition = dagreGraph.node(node.parentNode);
      node.position = {
        x:
          nodeWithPosition.x -
          (parentNodeWithPosition.x - parentNodeWithPosition.width / 2) -
          nodeWidth / 2,
        y:
          nodeWithPosition.y -
          (parentNodeWithPosition.y - parentNodeWithPosition.height / 2) -
          nodeHeight / 2,
      };
    } else {
      node.position = {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      };
    }

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
    return node;
  });
  // edges.forEach(edge => {
  //   edge.sourceNode.
  // })
  return { nodes, edges };
};
