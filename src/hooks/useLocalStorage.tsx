import { useEffect, useState } from "react";

export default function useLocalStorage(key: string, initialState: object | null) {
    let preExistingValue: any = localStorage.getItem(key);
    preExistingValue &&= JSON.parse(preExistingValue);
    preExistingValue ||= initialState;

    const [value, setValue] = useState(preExistingValue);

    useEffect(() => {
        if (!value) localStorage.removeItem(key);
        else localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
