import i18n from "sveltekit-i18n";

/** @type {import('sveltekit-i18n').Config} */
const config = {
    loaders: [
        {
            locale: "en",
            key: "common",
            loader: async () =>
                (await import("./lang//en/common.json")).default,
        },
        {
            locale: "ja",
            key: "common",
            loader: async () => (await import("./lang/ja/common.json")).default,
        },
    ],
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(
    config
);
