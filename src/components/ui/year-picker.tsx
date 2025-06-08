import React, { useEffect, useRef, useState } from "react";

interface YearPickerProps {
    selectedYear?: number;
    onYearChange?: (year: number) => void;
    startYear?: number;
    endYear?: number;
    className?: string;
    classNameChildren?: string;
    color?: string;
}

const YearPicker: React.FC<YearPickerProps> = ({
    selectedYear = new Date().getFullYear(),
    onYearChange,
    startYear = 2000,
    endYear = new Date().getFullYear() + 10,
    className = "",
    classNameChildren = "",
    color= ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const years = Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => startYear + i
    ).reverse();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleYearSelect = (year: number) => {
        onYearChange?.(year);
        setIsOpen(false);
    };

    return (
        <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex justify-between items-center w-full rounded-md shadow-sm px-4 text-sm font-medium  ${classNameChildren}`}
            >
                At {selectedYear}
                <svg
                    className="ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="max-h-60 overflow-auto py-1 scrollbar-hide">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => handleYearSelect(year)}
                                className={`block w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
                                    year === selectedYear
                                        ? " text-white"
                                        : "text-gray-900"
                                }`}
                                style={{ backgroundColor: year === selectedYear ? color : 'transparent' }}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default YearPicker;
