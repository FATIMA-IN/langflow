import { cloneDeep } from "lodash";
import useFlowStore from "../../stores/flowStore";
import { IOInputProps } from "../../types/components";
import IOFileInput from "../IOInputs/FileInput";
import { Textarea } from "../ui/textarea";

export default function IOInputField({
  inputType,
  inputId,
  left,
}: IOInputProps): JSX.Element | undefined {
  const nodes = useFlowStore((state) => state.nodes);
  const setNode = useFlowStore((state) => state.setNode);
  const node = nodes.find((node) => node.id === inputId);
  function handleInputType() {
    if (!node) return <>"No node found!"</>;
    switch (inputType) {
      case "TextInput":
        return (
          <Textarea
            className={`w-full ${left ? "" : " h-full"}`}
            placeholder={"Enter text..."}
            value={node.data.node!.template["input_value"].value}
            onChange={(e) => {
              e.target.value;
              if (node) {
                let newNode = cloneDeep(node);
                newNode.data.node!.template["input_value"].value =
                  e.target.value;
                setNode(node.id, newNode);
              }
            }}
          />
        );
      case "FileLoader":
        return (
          <IOFileInput
            field={node.data.node!.template["file_path"]["value"]}
            updateValue={(e) => {
              if (node) {
                let newNode = cloneDeep(node);
                newNode.data.node!.template["file_path"].value = e;
                setNode(node.id, newNode);
              }
            }}
          />
        );

      default:
        return (
          <Textarea
            className="w-full custom-scroll"
            placeholder={"Enter text..."}
            value={node.data.node!.template["input_value"]}
            onChange={(e) => {
              e.target.value;
              if (node) {
                let newNode = cloneDeep(node);
                newNode.data.node!.template["input_value"].value =
                  e.target.value;
                setNode(node.id, newNode);
              }
            }}
          />
        );
    }
  }
  return handleInputType();
}
