import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Selector({
  value,
  onValueChange,
  list = [],
  triggerClassName,
  property = null,
  displayProperty = null,
}) {
  const selectedLabel = property
    ? list.find((item) => item[property] === value)?.[displayProperty] ?? ""
    : value;
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        const numVal = property === "id" ? Number(value) : value;
        return onValueChange(numVal);
      }}
    >
      <SelectTrigger className={`w-full ${triggerClassName}`}>
        <SelectValue placeholder="Select Collection">
          {selectedLabel}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {list.map((val, index) => {
          return (
            <SelectItem
              key={index}
              value={String(property ? val[property] : val)}
            >
              {displayProperty
                ? String(val[displayProperty]) // ép sang string
                : property
                ? String(val[property])
                : String(val)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default Selector;
