<script lang="ts">
    import { t } from "$lib/ts/i18n/index";
    import { AtpAgent } from "@atproto/api";

    let service = "bsky.social";
    let handle = "";
    let password = "";
    let isLoading = false;
    let error = "";

    const handleSubmit = async () => {
        isLoading = true;
        error = "";
        try {
            const agent = new AtpAgent({ service: `https://${service}` });
            const result = await agent.login({
                identifier: handle,
                password: password,
            });
            if (result.success) {
                // ログイン成功時の処理 (例: ダッシュボードページにリダイレクト)
                console.log("Login successful!", result.data);
                // 実際には、セッション情報をストアなどに保存し、
                // ダッシュボードなどの認証が必要なページにリダイレクトします
                // goto('/dashboard'); など (svelte-kitのgoto関数は使えなくなっているので注意)
                // 例：
                location.href = "/";
            } else {
                // error = "Login failed. Please check your credentials.";
                error = "error";
            }
        } catch (e) {
            console.error("Login error:", e);
            error = "An error occurred during login.";
        } finally {
            isLoading = false;
        }
    };
</script>

<div>
    <form on:submit|preventDefault={handleSubmit}>
        <div>
            <label for="service">{$t("common.login.service")}</label>
            <input type="text" id="service" bind:value={service} required />
        </div>
        <div>
            <label for="handle">{$t("common.login.handle")}</label>
            <input type="text" id="handle" bind:value={handle} required />
        </div>
        <div>
            <label for="password">{$t("common.login.password")}</label>
            <input
                type="password"
                id="password"
                bind:value={password}
                required
            />
        </div>
        <button type="submit" disabled={isLoading}>
            {#if isLoading}
                {$t("common.login.logging_in")}
            {:else}
                {$t("common.login.submit")}
            {/if}
        </button>
    </form>
    {#if error}
        <p class="error">{error}</p>
    {/if}
</div>

<style>
    label {
        display: block;
    }
</style>
