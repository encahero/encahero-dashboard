"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";

export default function UserFilter({ onChange }) {
  const { control, watch } = useForm({
    defaultValues: {
      searchValue: "",
      rowQuantity: 20,
    },
  });

  const { searchValue, rowQuantity } = watch();
  const debouncedValue = useDebounce(searchValue, 900);

  useEffect(() => {
    onChange({
      searchValue: debouncedValue,
      rowQuantity: rowQuantity,
    });
  }, [debouncedValue, rowQuantity, onChange]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h2 className="text-lg sm:text-xl font-semibold tracking-wide">
        User List
      </h2>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <Controller
          name="searchValue"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Search by name or username..."
              className="max-w-xs"
            />
          )}
        />

        {/* Select rows per page */}
        <Controller
          name="rowQuantity"
          control={control}
          render={({ field }) => (
            <Select
              value={String(field.value)}
              onValueChange={(v) => field.onChange(Number(v))}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Rows" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50, 100].map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num} / page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
}
