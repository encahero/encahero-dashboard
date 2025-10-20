import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PenLineIcon, Trash2Icon } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "./ui/input";
import Selector from "./selector";
import { useQuery } from "@tanstack/react-query";
import { collectionService } from "@/services";
import ImageWithFallback from "./image-with-fallback";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";

function CardTable({ data, onDelete, onEdit }) {
  const [search, setSearch] = useState("");
  const [filterCollection, setFilterCollection] = useState("");
  const [filterType, setFilterType] = useState("");
  const { showErrorToast } = useToast();
  const { data: collections = [] } = useQuery({
    queryKey: ["collections"],
    queryFn: () => collectionService.getAllCollections(),
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  // Filter + search cards
  const filteredCards = useMemo(() => {
    return data.filter((card) => {
      const matchesSearch =
        card.en_word.toLowerCase().includes(search.toLowerCase()) ||
        card.vn_word.toLowerCase().includes(search.toLowerCase());

      const type = filterType === "all" ? null : filterType;
      const collectionName =
        filterCollection === "all" ? null : filterCollection;
      const matchesCollection = collectionName
        ? card.collectionName === collectionName
        : true;
      const matchesType = type ? card.type === type : true;
      return matchesSearch && matchesCollection && matchesType;
    });
  }, [data, search, filterCollection, filterType]);
  return (
    <div>
      {/* Filter/Search */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search EN/VN Word..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Selector
          value={filterCollection}
          onValueChange={setFilterCollection}
          list={collections}
          placeholder="Collection"
          property={"name"}
          triggerClassName="w-48"
        />

        <Selector
          value={filterType}
          onValueChange={setFilterType}
          placeholder="Type"
          list={["all", "noun", "verb", "adj"]}
          triggerClassName="w-48"
        />
      </div>

      <ScrollArea className="h-[76vh] border rounded bg-[var(--sidebar)]">
        <Table noWrapper className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-stone-950 sticky top-0 z-10 hover:bg-muted/100">
              <TableHead className="px-4 py-2">ID</TableHead>
              <TableHead className="px-4 py-2">Thumbnail</TableHead>
              <TableHead className="px-4 py-2">EN Word</TableHead>
              <TableHead className="px-4 py-2">VN Word</TableHead>
              <TableHead className="px-4 py-2">Type</TableHead>
              <TableHead className="px-4 py-2">Collection</TableHead>

              <TableHead className="px-4 py-2">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredCards.map((card) => (
              <TableRow
                key={card.id}
                className="hover:bg-gray-200 dark:hover:bg-stone-800"
              >
                <TableCell className="px-4 py-2">{card.id}</TableCell>
                <TableCell className="px-4 py-2">
                  <ImageWithFallback
                    src={card.image_url}
                    alt={card.en_word}
                    className="w-8 h-8  dark:bg-white border-1"
                  />
                </TableCell>
                <TableCell className="px-4 py-2">{card.en_word}</TableCell>
                <TableCell className="px-4 py-2 max-w-[200px] overflow-hidden whitespace-nowrap truncate">
                  {card.vn_word}
                </TableCell>
                <TableCell className="px-4 py-2">{card.type}</TableCell>

                <TableCell className="px-4 py-2 max-w-[200px] overflow-hidden whitespace-nowrap truncate">
                  {card.collectionName}
                </TableCell>

                <TableCell className="px-4 py-2 space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(card)}
                  >
                    <PenLineIcon />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(card.id)}
                  >
                    <Trash2Icon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}

export default CardTable;
