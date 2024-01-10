import ProgressBar from "@/ui/ProgressBar";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            {/* <ProgressBar type={"indeterminated"} /> */}

            <Outlet />
        </>
    );
}
