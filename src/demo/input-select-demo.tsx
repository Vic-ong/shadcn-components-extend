import * as React from "react";
import { InputSelect, InputSelectTrigger } from "@/components/extend/input-select";

export const InputSelectDemo: React.FC = () => {
  const [value, setValue] = React.useState("apple");

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
      <div className="font-bold">Input Select</div>

      <InputSelect
        options={options}
        value={value}
        onValueChange={(v) => setValue(v)}
        clearable
      >
        {(provided) => <InputSelectTrigger {...provided} />}
      </InputSelect>

      <div>
        <div className="mb-2 text-sm">Selected Value:</div>
        <div className="p-2 font-mono text-sm rounded-md bg-muted min-h-8">{value}</div>
      </div>
    </div>
  )
}