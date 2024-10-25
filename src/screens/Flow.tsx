import { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  DefaultEdgeOptions,
  NodeTypes,
} from "reactflow";

import burceMars from "assets/images/bruce-mars.jpg";

import CustomNode from "./CustomNode";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import { Card } from "@mui/material";

const OrgName = () => {
  return (
    <Card
      sx={{
        bgcolor: "#E6F4FF",
        position: "relative",
        marginTop: 4,
        width: "100",
      }}
    >
      <MDAvatar
        sx={{ position: "absolute", bottom: 50, left: 15 }}
        src={burceMars}
      />
      <MDBox p={0.5} pl={1} pt={3}>
        <MDBox fontSize={14}>
          <MDTypography variant="body">Andrew Simon</MDTypography>
        </MDBox>
        <MDBox fontSize={14}>
          <MDTypography variant={"body"}>CEO & Founder</MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
};

const initialNodes: Node[] = [
  { id: "1", data: { label: <OrgName /> }, position: { x: 5, y: 5 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 5, y: 100 } },
];

const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={fitViewOptions}
      defaultEdgeOptions={defaultEdgeOptions}
      nodeTypes={nodeTypes}
    />
  );
}

export default Flow;
