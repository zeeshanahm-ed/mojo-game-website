'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export type CountryInfo = {
    name: string;
    cca2: string;
    cca3: string;
    dialCode: string;
    flagPng: string;
    flagSvg: string;
};

const fetchCountries = async (): Promise<CountryInfo[]> => {
    const { data } = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2,cca3,flags,idd');

    return data.map((c: any) => {
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

export const useCountries = () => {
    const [countries, setCountries] = useState<CountryInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCountries()
            .then(setCountries)
            .catch((err) => {
                console.error(err);
                setError('Failed to fetch countries');
            })
            .finally(() => setLoading(false));
    }, []);

    return { countries, loading, error };
};