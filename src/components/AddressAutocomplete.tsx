"use client";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import { useEffect, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";

interface AddressAutocompleteProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    onSelect?: (address: string, lat: number, lng: number) => void;
    className?: string;
}

export function AddressAutocomplete({
    label,
    placeholder,
    value,
    onChange,
    onSelect,
    className = "",
}: AddressAutocompleteProps) {
    const {
        ready,
        value: inputValue,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: "fr" }, // Limit to France
        },
        debounce: 300,
        defaultValue: value
    });

    // Sync internal state with external value prop
    useEffect(() => {
        setValue(value, false);
    }, [value, setValue]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(e.target.value);
    };

    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();
        onChange(address);

        try {
            if (onSelect) {
                const results = await getGeocode({ address });
                const { lat, lng } = await getLatLng(results[0]);
                onSelect(address, lat, lng);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <div className={`relative ${className}`}>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
                {label}
            </label>
            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder={placeholder || label}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pl-10 text-neutral-900 placeholder-neutral-400 focus:border-yellow-400 focus:ring-yellow-400"
                />
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
            </div>

            {status === "OK" && (
                <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {data.map(({ place_id, description }) => (
                        <li
                            key={place_id}
                            onClick={() => handleSelect(description)}
                            className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-neutral-900 hover:bg-yellow-50"
                        >
                            <span className="block truncate">{description}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
