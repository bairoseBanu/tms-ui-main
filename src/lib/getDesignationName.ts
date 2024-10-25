import { DesignationDoc } from "types/api-response";

export const getDesignationName = (
  designationId: string,
  designationDocs: DesignationDoc[]
) => {
  return designationDocs.find((des) => des.id === designationId)?.name;
};
