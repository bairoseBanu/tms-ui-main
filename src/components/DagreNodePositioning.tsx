// component as child of ReactFlowProvider so we have access to state
import { useState, useEffect, FC } from "react";
import { useStore, useReactFlow, Edge, Node, Position } from "reactflow";
import dagre from "dagre";

interface Props {
  Options: any;
  SetNodes: any;
  SetEdges: any;
  Edges: Edge[];
  SetViewIsFit: any;
}

const DagreNodePositioning: FC<Props> = ({
  Options,
  SetNodes,
  SetEdges,
  Edges,
  SetViewIsFit,
}) => {
  const [nodesPositioned, setNodesPositioned] = useState(false);
  const { fitView } = useReactFlow();

  // fetch react flow statef
  const store = useStore((state) => state);
  // isolate nodes map
  const nodeInternals = store.nodeInternals;
  // flatten nodes map to array
  const flattenedNodes = Array.from(nodeInternals.values());

  useEffect(() => {
    try {
      // node dimensions are not immediately detected, so we want to wait until they are
      if (flattenedNodes[0]?.width) {
        // create dagre graph
        const dagreGraph = new dagre.graphlib.Graph();
        // this prevents error
        dagreGraph.setDefaultEdgeLabel(() => ({}));

        // use dagre graph to layout nodes
        const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
          dagreGraph.setGraph(Options);

          edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
          nodes.forEach((node) => dagreGraph.setNode(node.id, node));

          dagre.layout(dagreGraph);

          return {
            nodes: nodes.map((node) => {
              const { x, y } = dagreGraph.node(node.id);

              return { ...node, position: { x, y } };
            }),
            edges,
          };
        };

        // if nodes exist and nodes are not positioned
        if (flattenedNodes.length > 0 && !nodesPositioned) {
          const layouted = getLayoutedElements(flattenedNodes, Edges);

          // ad target positions based on chart direction
          switch (Options.rankdir) {
            case "TB":
              layouted.nodes.forEach((node) => {
                node.targetPosition = Position.Top;
                node.sourcePosition = Position.Bottom;
              });
              break;
            case "BT":
              layouted.nodes.forEach((node) => {
                node.targetPosition = Position.Bottom;
                node.sourcePosition = Position.Top;
              });
              break;
            case "LR":
              layouted.nodes.forEach((node) => {
                node.targetPosition = Position.Left;
                node.sourcePosition = Position.Right;
              });
              break;
            case "RL":
              layouted.nodes.forEach((node) => {
                node.targetPosition = Position.Right;
                node.sourcePosition = Position.Left;
              });
              break;
            default:
              console.log("unrecognized chart direction");
          }

          // update react flow state
          SetNodes(layouted.nodes);
          SetEdges(layouted.edges);
          setNodesPositioned(true);

          // fit view
          window.requestAnimationFrame(() => {
            fitView();
          });
          SetViewIsFit(true);
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log("error", error);
      return null;
    }
  }, [
    Edges,
    Options,
    SetEdges,
    SetNodes,
    SetViewIsFit,
    fitView,
    flattenedNodes,
    nodesPositioned,
  ]);

  return null;
};

export default DagreNodePositioning;
