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
import formatDate from "@/utils/format-date";
import { headerTextClassName } from "@/constants";

function CardTable({ data, onDelete, onEdit }) {
  const [search, setSearch] = useState("");
  const [filterCollection, setFilterCollection] = useState("");
  const [filterType, setFilterType] = useState("");
  const { showErrorToast } = useToast();
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
          displayProperty={"name"}
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

      <div className="overflow-auto border rounded bg-[var(--sidebar)] h-[76vh]">
        <table className="w-full min-w-[800px] table-auto border-collapse">
          <thead className="sticky top-0 bg-gray-100 dark:bg-stone-950 z-2">
            <tr>
              {[
                "ID",
                "Thumbnail",
                "EN Word",
                "VN Word",
                "Type",
                "Collection",
                "Updated At",
                "Actions",
              ].map((text) => (
                <th key={text} className={headerTextClassName}>
                  {text}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredCards.map((card) => (
              <tr
                key={card.id}
                className="hover:bg-gray-200 dark:hover:bg-stone-800"
              >
                <td className="px-4 py-2">{card.id}</td>
                <td className="px-4 py-2">
                  <ImageWithFallback
                    src={card.image_url}
                    alt={card.en_word}
                    className="w-8 h-8 dark:bg-white border"
                  />
                </td>
                <td className="px-4 py-2">{card.en_word}</td>
                <td className="px-4 py-2 max-w-[200px] overflow-hidden whitespace-nowrap truncate">
                  {card.vn_word}
                </td>
                <td className="px-4 py-2">{card.type}</td>
                <td className="px-4 py-2 max-w-[200px] overflow-hidden whitespace-nowrap truncate">
                  {card.collectionName}
                </td>
                <td className="px-4 py-2">{formatDate(card.updated_at)}</td>
                <td className="px-4 py-2 flex space-x-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CardTable;
