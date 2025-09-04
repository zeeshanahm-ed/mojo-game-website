import { create } from "zustand";
import axios from "axios";

export type CountryInfo = {
    name: string;
    cca2: string;
    cca3: string;
    dialCode: string;
    flagPng: string;
    flagSvg: string;
};

interface CountryAPIResponse {
    name: {
        common: string;
    };
    cca2: string;
    cca3: string;
    idd?: {
        root?: string;
        suffixes?: string[];
    };
    flags?: {
        png?: string;
        svg?: string;
    };
}

interface CountriesDataStore {
    countriesData: CountryInfo[];
    setCountriesData: (countriesData: CountryInfo[]) => void;
    getCountriesData: () => void;
}

export const useCountriesData = create<CountriesDataStore>((set) => ({
    countriesData: [],
    setCountriesData: (countriesData: CountryInfo[]) => set({ countriesData }),
    getCountriesData: () => {
        const fetchCountries = async (): Promise<CountryInfo[]> => {
            const { data } = await axios.get<CountryAPIResponse[]>('https://restcountries.com/v3.1/all?fields=name,cca2,cca3,flags,idd');

            return data.map((c): CountryInfo => {
                const root = c.idd?.root ?? '';
                const suffix = c.idd?.suffixes?.[0] ?? '';
                return {
                    name: c.name?.common ?? '',
                    cca2: c.cca2 ?? '',
                    cca3: c.cca3 ?? '',
                    dialCode: suffix ? `${root}${suffix}` : root,
                    flagPng: c.flags?.png ?? '',
                    flagSvg: c.flags?.svg ?? '',
                };
            });
        };
        fetchCountries().then(response => {
            const sorted = [...response].sort((a, b) =>
                a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
            );
            set({ countriesData: sorted });
        }).catch((err) => {
            console.error(err);
        })
    },
}));