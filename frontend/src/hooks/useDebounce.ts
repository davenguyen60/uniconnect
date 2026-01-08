import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Mỗi lần value thay đổi, đặt hẹn giờ cập nhật
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;