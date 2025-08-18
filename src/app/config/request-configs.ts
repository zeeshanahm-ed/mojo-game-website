const cacheTime = 1000 * 60 * 60; // 1 hour
const staleTime = 1000 * 60 * 60; // 1 hour

const reactQueryConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            cacheTime,
            staleTime,
        },
    },
};

export default reactQueryConfig;
