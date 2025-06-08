import { Skeleton } from "../ui/skeleton";

function LoadingChart({ height = 320 }) {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className={`h-${height / 20} w-full rounded-xl`} />
        </div>
    );
}

export default LoadingChart;