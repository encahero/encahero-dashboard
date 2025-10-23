import { useState, useEffect } from "react";

/**
 * Hook debounce giá trị
 * @param {any} value Giá trị cần debounce
 * @param {number} delay Thời gian delay (ms), mặc định 300ms
 * @returns Giá trị đã debounce
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup nếu value thay đổi trước khi timeout kết thúc
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
