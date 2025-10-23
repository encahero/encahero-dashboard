"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "./ui/input";
import Selector from "./selector";
import { useQuery } from "@tanstack/react-query";
import { collectionService } from "@/services";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";
import { useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export default function CardFilter({ onChange }) {
  const { showErrorToast } = useToast();

  const { data: collections = [] } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      try {
        return await collectionService.getAllCollections();
      } catch (err) {
        showErrorToast("Ops!", getErrorMessage(err));
        return [];
      }
    },
  });

  const { control, watch } = useForm({
    defaultValues: {
      searchValue: "",
      collectionName: "all",
      type: "all",
      rowQuantity: 20,
    },
  });

  const { searchValue, collectionName, type, rowQuantity } = watch();
  const debouncedSearchValue = useDebounce(searchValue, 900);

  useEffect(() => {
    onChange({
      searchValue: debouncedSearchValue,
      collectionName,
      type,
      rowQuantity,
    });
  }, [debouncedSearchValue, collectionName, type, rowQuantity, onChange]);

  return (
    <div className="flex gap-4 mb-4 flex-wrap">
      <Controller
        name="searchValue"
        control={control}
        render={({ field }) => (
          <Input
            placeholder="Search EN/VN Word..."
            {...field}
            className="max-w-sm"
          />
        )}
      />

      <Controller
        name="rowQuantity"
        control={control}
        render={({ field }) => (
          <Selector
            value={field.value}
            onValueChange={field.onChange}
            placeholder="Rows"
            list={[10, 20, 50, 100]}
            triggerClassName="w-32"
          />
        )}
      />

      <Controller
        name="collectionName"
        control={control}
        render={({ field }) => (
          <Selector
            value={field.value}
            onValueChange={field.onChange}
            list={[{ name: "all" }, ...collections]}
            placeholder="Collection"
            property="name"
            displayProperty="name"
            triggerClassName="w-48"
          />
        )}
      />

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Selector
            value={field.value}
            onValueChange={field.onChange}
            list={["all", "noun", "verb", "adj"]}
            placeholder="Type"
            triggerClassName="w-48"
          />
        )}
      />
    </div>
  );
}
