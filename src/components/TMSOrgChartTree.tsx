import { FC, useEffect, useMemo } from "react";
import ReactFlow, {
  Edge,
  Node,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import TMSEmployeeNode from "./TMSEmployeeNode";

// const nodeTypes = { customNode: TMSEmployeeNode };

interface Props {
  initialNodes: Node[];
  initialEdges: Edge[];
}
const Flow: FC<Props> = ({ initialEdges, initialNodes }) => {
  // const [nodes, setNodes] = useNodesState(initialNodes);
  // const [edges, setEdges] = useEdgesState(initialEdges);
  //   const [viewIsFit, setViewIsFit] = useState(false);
  const { fitView } = useReactFlow();
  //   const dagreOptions = { rankdir: "TB" };

  // useEffect(() => {
  //   setTimeout(() => {
  //     const { nodes: layoutNodes, edges: layoutEdges } = getLayoutedElements(
  //       initialNodes,
  //       initialEdges,
  //       "TB"
  //     );
  //     setNodes(layoutNodes);
  //     setEdges(layoutEdges);
  //   });
  // }, [fitView, initialEdges, initialNodes, setEdges, setNodes]);

  useEffect(() => {
    setTimeout(() => {
      fitView();
    }, 0);
  }, [fitView]);

  const nodeTypes = useMemo(
    () => ({
      customNode: TMSEmployeeNode,
    }),
    []
  );
  return (
    <ReactFlowProvider>
      <div
        style={{
          width: "75vw",
          height: "100vh",
          margin: "auto",
          // backgroundColor: "lightblue",
        }}
      >
        {/* <DagreNodePositioning
        Options={dagreOptions}
        Edges={edges}
        SetEdges={setEdges}
        SetNodes={setNodes}
        SetViewIsFit={setViewIsFit}
      /> */}
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          preventScrolling={true}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          fitView
          style={{ marginTop: 5 }}
          maxZoom={1}
          minZoom={0.5}
        ></ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};
const TMSOrgChartTree: FC<Props> = (props) => {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
};
export default TMSOrgChartTree;
