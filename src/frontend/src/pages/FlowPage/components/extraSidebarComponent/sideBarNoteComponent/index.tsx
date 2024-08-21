import { APIClassType } from "@/types/api";
import IconComponent from "../../../../../components/genericIconComponent";
export default function NoteDraggableComponent() {
  function onDragStart(event: React.DragEvent<any>): void {
    const noteNode: APIClassType = {
      description: "",
      display_name: "",
      documentation: "",
      template: {},
    };
    event.dataTransfer.setData(
      "noteNode",
      JSON.stringify({ node: noteNode, type: "note" }),
    );
  }

  return (
    <div
      className="cursor-grab"
      draggable
      onDragStart={(event) => onDragStart(event)}
    >
      <IconComponent name="StickyNote" />
    </div>
  );
}