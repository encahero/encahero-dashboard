"use client";
import { CpuIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { PlusIcon, Trash2Icon } from "lucide-react";
import Selector from "./selector";
import { useQuery } from "@tanstack/react-query";
import { collectionService } from "@/services";
import ImageWithFallback from "./image-with-fallback";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";

const defaultValues = {
  en_word: "",
  vn_word: "",
  type: "",
  meaning: "",
  ex: [""],
  en_choice: "",
  vn_choice: "",
  image_url: "",
  image_file: "",
  collectionId: "",
};

function CardCreation({ isOpen, onClose, isEdit, onSubmit, editValues }) {
  const [imageType, setImageType] = useState("url");
  const [preview, setPreview] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { register, handleSubmit, reset, control, watch, setValue } = useForm({
    defaultValues: editValues || defaultValues,
  });

  const { showErrorToast, showSuccessToast } = useToast();

  const imageUrl = watch("image_url");

  const { data: collections = [] } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      try {
        const res = await collectionService.getAllCollections();
        return res;
      } catch (err) {
        showErrorToast("Ops!", getErrorMessage(err));
        return [];
      }
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ex",
  });

  useEffect(() => {
    reset(editValues || {});
    if (editValues?.image_url) setPreview(editValues.image_url);
  }, [editValues, reset]);

  useEffect(() => {
    if (imageType === "url" && imageUrl && typeof imageUrl === "string") {
      setPreview(imageUrl);
    }
  }, [imageUrl, imageType]);

  const handleFormSubmit = async (data) => {
    const filteredEx = (data.ex || []).filter(Boolean);

    const finalData = {
      ...data,
      ex: filteredEx,
    };
    await onSubmit(finalData);
    setImageType("url");
    setPreview(null);
    reset(defaultValues);
    currentEntryIndex.current = 0;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setValue("image_file", file);
    setValue("image_url", "");
  };

  const handleClose = () => {
    reset(defaultValues);
    setPreview(null);
    setImageType("url");
    onClose();
    currentEntryIndex.current = 0;
  };

  const handleFill = async (e) => {
    e?.preventDefault?.();

    const word = watch("en_word")?.trim();

    if (!word) {
      showErrorToast("Ops!", "Please enter an English word first.");
      return;
    }
    setIsGenerating(true);
    try {
      // Call your Next.js App Router API route
      const res = await fetch("/api/generate-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const card = JSON.parse(data.choices[0].message.content);

      // Fill your form fields
      setValue("vn_word", card.vn_word || "");
      setValue("meaning", card.meaning || "");
      setValue("type", card.type || "");
      setValue("ex", card.ex && card.ex.length ? card.ex : [""]);
      setValue("en_choice", card.en_choice || "");
      setValue("vn_choice", card.vn_choice || "");
      setValue("collectionId", card.collectionId || "");

      showSuccessToast("Success!", "Flashcard generated successfully!");
    } catch (err) {
      showErrorToast("Ops!", getErrorMessage(err));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="p-0 flex flex-col max-h-[80vh]"
        onPointerDownOutside={(e) => {
          if (e.target === e.currentTarget) {
            e.preventDefault();
          }
        }}
      >
        <div className="p-4 border-b">
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit Card" : "New Card"}</DialogTitle>
            <DialogDescription>
              {isEdit ? "Update card info" : "Create a new card"}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-4 overflow-y-auto flex-1 space-y-4"
        >
          <div className="grid gap-4 py-4">
            <div className="grid gap-1">
              <label className="text-sm font-medium">EN Word</label>
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="EN Word"
                  {...register("en_word")}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleFill}
                  disabled={isGenerating}
                  className="flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <CpuIcon className="animate-spin w-4 h-4" />
                      {"Generating..."}
                    </>
                  ) : (
                    "Fill with AI"
                  )}
                </Button>
              </div>
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium">VN Word</label>
              <Input placeholder="VN Word" {...register("vn_word")} />
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium">Type</label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Selector
                    value={field.value}
                    onValueChange={field.onChange}
                    list={["noun", "verb", "adjective", "adverb"]}
                  />
                )}
              />
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium">Meaning</label>
              <Input placeholder="Meaning" {...register("meaning")} />
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium">VN Choice</label>
              <Input placeholder="Viet Nam choice" {...register("vn_choice")} />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium">EN Choice</label>
              <Input placeholder="Eng choice" {...register("en_choice")} />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium">Examples</label>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 ">
                  <Textarea
                    placeholder={`Example ${index + 1}`}
                    {...register(`ex.${index}`)}
                    className="h-12 resize-none"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                    size="sm"
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                onClick={() => append("")}
                className="w-max"
                size="sm"
              >
                <PlusIcon />
              </Button>
            </div>

            <div className="grid gap-1">
              <Tabs value={imageType} onValueChange={(v) => setImageType(v)}>
                <TabsList>
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>

                <TabsContent value="url">
                  <div className="grid gap-1">
                    <label className="text-sm font-medium">Image URL</label>
                    <Input placeholder="Image URL" {...register("image_url")} />
                  </div>
                </TabsContent>

                <TabsContent value="upload">
                  <div className="grid gap-1">
                    <label className="text-sm font-medium">Upload Image</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Preview */}
              {preview && (
                <ImageWithFallback
                  src={preview}
                  alt="preview"
                  folderName="card_thumbnails"
                  className="w-full h-48 object-contain rounded-md mt-2 border"
                />
              )}
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium">Collection</label>
              <Controller
                control={control}
                name="collectionId"
                render={({ field }) => (
                  <Selector
                    value={field.value}
                    onValueChange={field.onChange}
                    list={collections}
                    property={"id"}
                    displayProperty={"name"}
                  />
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CardCreation;
