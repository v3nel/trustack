import { setupDevCycle } from "@devcycle/nextjs-sdk/server";

const getUserIdentity = async () => {
  // In a real app, determine identity from cookies/session.
  // For now, use a static anonymous user.
  return {
    user_id: "trustack-default-user",
  };
};

const serverKey = process.env.DEVCYCLE_SERVER_SDK_KEY ?? "";
const clientKey = process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? "";
const isConfigured = serverKey.length > 0 && clientKey.length > 0;

/**
 * When DevCycle keys are not yet set we skip initialisation entirely
 * and return safe no-op helpers so the app still builds & runs.
 * Every feature flag will resolve to its hard-coded default value.
 */

// --- real SDK setup (only when keys exist) ---
const sdk = isConfigured
  ? setupDevCycle({
      serverSDKKey: serverKey,
      clientSDKKey: clientKey,
      userGetter: getUserIdentity,
      options: {
        disableAutomaticEventLogging: true,
        disableCustomEventLogging: true,
      },
    })
  : null;

/** Server-side: resolve a variable value (falls back to defaultValue when unconfigured) */
export async function getVariableValue<T extends string | boolean | number>(
  key: string,
  defaultValue: T
): Promise<T> {
  if (!sdk) return defaultValue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sdk.getVariableValue(key as any, defaultValue as any) as Promise<T>;
}
