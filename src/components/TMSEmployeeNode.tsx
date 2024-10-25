import { Handle, NodeProps, Position } from "reactflow";
import TMSEmployeeTreeCard from "./TMSEmployeeTreeCard";
import MDBox from "./MDBox";

interface TMSEmployeeNodeProps {
  name: string;
  designation: string;
  imgUrl?: string;
}

const TMSEmployeeNode = (props: NodeProps<TMSEmployeeNodeProps>) => {
  const { name, designation, imgUrl } = props.data;
  return (
    <MDBox sx={{}}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={true}
        style={{ visibility: "hidden" }}
        // style={{
        //   backgroundColor: "yellow",
        //   position: "absolute",
        //   width: "100px",
        //   top: 0,
        //   left: 0,
        // }}
      />
      <TMSEmployeeTreeCard
        name={name}
        designation={designation}
        imgUrl={imgUrl}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={true}
        style={{ visibility: "hidden" }}
        // style={{
        //   backgroundColor: "blue",
        //   width: "100px",
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        // }}
      />
    </MDBox>
  );
};

export default TMSEmployeeNode;
