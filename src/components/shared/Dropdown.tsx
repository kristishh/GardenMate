import { ChevronDownIcon } from "@/components/ui/icon";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { PlantTypes } from "../../types/index";

export type DropdownTypes = {
  variant: any
  size: any
  options: PlantTypes[]
  onSelect: (value: string) => void
}

const Dropdown = ({ options, variant, size, onSelect }: DropdownTypes) => {

  return (
    <Select className="bg-white p-5 rounded-lg shadow-md" onValueChange={e => onSelect(e)}>
      <SelectTrigger variant={variant} size={size}>
        <SelectInput placeholder="Select plant type" />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          {options.map((option, index) => {
            return <SelectItem key={`${index} ${option.id}`} label={option.name} value={option.id} />
          })}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}

export default Dropdown