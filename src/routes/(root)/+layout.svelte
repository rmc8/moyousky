<script>
    import "../app.css";
    import { loadTranslations } from "$lib/ts/i18n/index";
    const defaultLanguage = "ja";
    loadTranslations(defaultLanguage, "/");
</script>

<slot />
