import * as React from "react";
import { InputMultiSelect, InputMultiSelectTrigger } from "@/components/extend/input-multiselect";

export const InputMultiSelectDemo: React.FC = () => {
  const [value, setValue] = React.useState<string[]>(["apple", "banana"]);

  const options = [
    {
      value: "apple",
      label: "Apple",
    },
    {
      value: "banana",
      label: "Banana",
    },
    {
      value: "avocado",
      label: "Avocado",
    },
    {
      value: "orange",
      label: "Orange",
    },
    {
      value: "peach",
      label: "Peach",
    },
    {
      value: "grape",
      label: "Grape",
    },
    {
      value: "pineapple",
      label: "Pineapple",
    },
    {
      value: "dragonfruit",
      label: "Dragon Fruit",
    },
    {
      value: "kiwi",
      label: "Kiwi",
    },
    {
      value: "tomato",
      label: "Tomato",
    },
    {
      value: "celery",
      label: "Celery",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="font-bold">Input MultiSelect</div>

      <InputMultiSelect
        options={options}
        value={value}
        onValueChange={(v) => setValue(v)}
      >
        {(provided) => <InputMultiSelectTrigger {...provided} />}
      </InputMultiSelect>

      <div>
        <div className="mb-2 text-sm">Selected Values ({value.length})</div>
        <div className="p-2 font-mono text-sm rounded-md bg-muted min-h-8">{value.join(", ")}</div>
      </div>
    </div>
  )
}