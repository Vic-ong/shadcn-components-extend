import * as React from "react";
import { CheckIcon, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export type SelectOption = {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export interface InputSelectProvided {
  options: SelectOption[];
  onValueChange?: (v: string) => void;
  placeholder: string;
  clearable: boolean;
  disabled: boolean;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  isPopoverOpen: boolean;
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOptionSelect: (v: string) => void;
  onClearAllOptions: () => void;
}

export const InputSelect: React.FC<{
  options: SelectOption[];
  value?: string;
  onValueChange?: (v: string) => void;
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: (v: InputSelectProvided) => React.ReactNode;
}> = ({
  options,
  value = "",
  onValueChange,
  placeholder = "Select...",
  clearable = false,
  disabled = false,
  className,
  children,
  ...restProps
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(value);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const onOptionSelect = (option: string) => {
    setSelectedValue(option);
    onValueChange?.(option);
    setIsPopoverOpen(false);
  };

  const onClearAllOptions = () => {
    setSelectedValue("");
    onValueChange?.("");
    setIsPopoverOpen(false);
  };

  React.useEffect(() => {
    if (isPopoverOpen && value !== selectedValue) {
      setSelectedValue(value);
    }
  }, [isPopoverOpen])

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        {children({
          options,
          onValueChange,
          placeholder,
          clearable,
          disabled,
          selectedValue,
          setSelectedValue,
          isPopoverOpen,
          setIsPopoverOpen,
          onOptionSelect,
          onClearAllOptions,
        })}
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-auto p-0", className)}
        align="start"
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
        {...restProps}
      >
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList className="max-h-[unset] overflow-y-hidden">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="max-h-[20rem] min-h-[10rem] overflow-y-auto">
              {options.map((option) => {
                const isSelected = selectedValue === option.value;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => onOptionSelect(option.value)}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-1 flex h-4 w-4 items-center justify-center",
                        isSelected ? "text-primary" : "invisible"
                      )}
                    >
                      <CheckIcon className="w-4 h-4" />
                    </div>
                    {option.icon && (
                      <option.icon className="w-4 h-4 mr-2 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <div className="flex items-center justify-between">
                {selectedValue && clearable && (
                  <>
                    <CommandItem
                      onSelect={onClearAllOptions}
                      className="justify-center flex-1 cursor-pointer"
                    >
                      Clear
                    </CommandItem>
                    <Separator
                      orientation="vertical"
                      className="flex h-full mx-2 min-h-6"
                    />
                  </>
                )}
                <CommandItem
                  onSelect={() => setIsPopoverOpen(false)}
                  className="justify-center flex-1 max-w-full cursor-pointer"
                >
                  Close
                </CommandItem>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
InputSelect.displayName = "InputSelect";

export const InputSelectTrigger = React.forwardRef<
  HTMLButtonElement,
  InputSelectProvided & {
    className?: string;
    children?: (v: SelectOption) => React.ReactNode;
    style?: React.CSSProperties;
  }
>(
  (
    {
      options,
      // onValueChange,
      placeholder,
      clearable,
      disabled,
      selectedValue,
      // setSelectedValue,
      // isPopoverOpen,
      setIsPopoverOpen,
      // onOptionSelect,
      onClearAllOptions,
      className,
      style,
      children,
    },
    ref,
  ) => {
    const onTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    return (
      <Button
        ref={ref}
        onClick={onTogglePopover}
        variant="outline"
        type="button"
        disabled={disabled}
        className={cn(
          "flex h-11 w-full items-center justify-between p-1 [&_svg]:pointer-events-auto",
          className,
        )}
        style={style}
      >
        {selectedValue ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-wrap items-center px-2">
              {[selectedValue].map((value, index) => {
                const option = options.find((o) => o.value === value);

                if (!option) {
                  return <div key={`${index}-${value}`}></div>;
                }

                if (children) {
                  return <div key={`${index}-${value}`}>{children(option)}</div>;
                }

                return (
                  <div key={`${index}-${value}`} className={cn("text-foreground")}>
                    {option?.icon && <option.icon className="mr-1 h-3.5 w-3.5" />}
                    {option?.label}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between">
              {selectedValue && clearable && (
                <>
                  <X
                    className={cn(
                      "mx-1 h-4 cursor-pointer text-muted-foreground",
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearAllOptions();
                    }}
                  />
                  <Separator orientation="vertical" className="flex h-full min-h-6" />
                </>
              )}
              <ChevronDown className="h-4 mx-1 cursor-pointer text-muted-foreground" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full mx-auto">
            <span className="mx-3 text-sm text-muted-foreground">{placeholder}</span>
            <ChevronDown className="h-4 mx-1 cursor-pointer text-muted-foreground" />
          </div>
        )}
      </Button>
    );
  },
);
InputSelectTrigger.displayName = "InputSelectTrigger";
