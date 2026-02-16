"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * A map of feature-flag key → resolved value.
 * Values are computed server-side (via DevCycle or defaults) and passed down.
 */
type FeatureFlags = Record<string, string | boolean | number>;

const FeatureFlagsContext = createContext<FeatureFlags>({});

export function FeatureFlagsProvider({
    flags,
    children,
}: {
    flags: FeatureFlags;
    children: ReactNode;
}) {
    return <FeatureFlagsContext.Provider value={flags}>{children}</FeatureFlagsContext.Provider>;
}

/**
 * Read a feature flag value from context.
 * Returns `defaultValue` if the flag was not evaluated server-side.
 */
export function useFeatureFlag<T extends string | boolean | number>(
    key: string,
    defaultValue: T,
): T {
    const flags = useContext(FeatureFlagsContext);
    return (flags[key] as T) ?? defaultValue;
}
