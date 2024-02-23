<script>
    import {
        BlockTitle,
        Block,
        Button,
        Actions,
        ActionsButton,
        ActionsLabel,
        ActionsGroup,
    } from "konsta/svelte";

    import { CookieManager } from "../../utils/cookies";

    const closeSession = () => {
        actionsOpened = false;
        CookieManager.deleteCookie("session");
        window.location.pathname = "/";
    }

    let actionsOpened = false;
</script>

<div class="max-w-[600px] m-auto">
    <Block strong inset class="space-y-4">
        <p>
            Зараз тут фактично пусто.
        </p>
    </Block>

    <div class="max-w-[360px] m-auto">
        <BlockTitle>Опції</BlockTitle>
        <Block strong inset class="flex space-x-4 rtl:space-x-reverse">
            <Button onClick={() => (actionsOpened = true)}>Завершити сеанс</Button>
        </Block>
    </div>

    <Actions
        opened={actionsOpened}
        onBackdropClick={() => (actionsOpened = false)}
    >
        <ActionsGroup>
            <ActionsLabel>Завершити сеанс?</ActionsLabel>
            <ActionsButton onClick={closeSession} bold class="text-red-500">
                Так, завершити
            </ActionsButton>
        </ActionsGroup>
        <ActionsGroup>
            <ActionsButton onClick={() => (actionsOpened = false)}>
                Скасувати
            </ActionsButton>
        </ActionsGroup>
    </Actions>
</div>
