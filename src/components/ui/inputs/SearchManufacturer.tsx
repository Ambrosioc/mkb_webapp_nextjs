"use client";

import { Fragment, useMemo } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { SearchManufacturerProps } from "@/src/types";

const SearchManufacturer = ({
  data,
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  // Extract unique manufacturers from car data
  const manufacturers = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    const unique = Array.from(new Set(data.map((car: any) => car.marque).filter(Boolean)));
    return unique.sort();
  }, [data]);

  // Filter manufacturers based on search input
  const filteredManufacturers = useMemo(() => {
    if (!manufacturer) return manufacturers;
    return manufacturers.filter((m: string) =>
      m.toLowerCase().includes(manufacturer.toLowerCase())
    );
  }, [manufacturers, manufacturer]);

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="Car logo"
            />
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="search-manufacturer__options">
              {filteredManufacturers.length === 0 ? (
                <div className="relative search-manufacturer__option text-gray-500 py-3 px-4">
                  Aucune marque trouvée
                </div>
              ) : (
                filteredManufacturers.map((item: string) => (
                <Combobox.Option
                  key={item}
                    value={item}
                  className={({
                    active,
                  }) => `relative search-manufacturer__option ${
                    active ? "bg-primary-orange text-white" : "text-gray-900"
                    }`}
                >
                    {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-orange">
                            ✓
                          </span>
                        )}
                    </>
                  )}
                </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
