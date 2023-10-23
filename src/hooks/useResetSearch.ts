import { useSearchStore } from "@/store/store";
import { useEffect } from "react";

export default function useResetSearch() {
  const { setSearchValue } = useSearchStore();
  useEffect(() => {
    setSearchValue("");
  }, []);
  return true;
}
