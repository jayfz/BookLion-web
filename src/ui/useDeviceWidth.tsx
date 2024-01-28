import { useEffect, useState } from "react";

export default function useDeviceWidth() {
    const initialWidth = window.innerWidth;
    const [width, setWidth] = useState(initialWidth);

    useEffect(() => {
        const resizeEventHandler = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", resizeEventHandler);

        return () => window.removeEventListener("resize", resizeEventHandler);
    });

    return width;
}
