import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Selector({ value, onValueChange, list = [], triggerClassName }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={`w-full ${triggerClassName}`}>
        <SelectValue placeholder="Select Collection" />
      </SelectTrigger>
      <SelectContent>
        {list.map((val, index) => {
          return (
            <SelectItem key={index} value={val}>
              {val}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default Selector;
