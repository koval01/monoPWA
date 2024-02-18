<script>
    import { Preloader, Block } from "konsta/svelte";
</script>

<div>
    <img src="/images/cat/matrix.webp" class="m-auto max-h-[400px]" alt="Кіт очікує теж..." />
    <Block strong inset class="w-max !m-auto !mb-3">
        Отримуємо дані для авторизації...
    </Block>
    <Preloader class="!block m-auto" />
</div>
