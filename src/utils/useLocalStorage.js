import { useEffect, useState } from "react";

function useLocalStorage(defaultValue, key) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

    useEffect(() => {
        if (value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
            localStorage.removeItem(key); // Xóa key khỏi localStorage
        } else {
            localStorage.setItem(key, JSON.stringify(value)); // Lưu giá trị mới
        }
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;