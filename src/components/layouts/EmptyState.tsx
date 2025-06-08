import { Database } from "lucide-react";

function EmptyState({ message }) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Database className="h-16 w-16 mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold mb-2">{message}</h3>
            <p className="text-sm text-center">No data available</p>
        </div>
    );
}

export default EmptyState;