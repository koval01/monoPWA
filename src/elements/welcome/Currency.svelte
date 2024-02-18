<script>
    import {
        BlockTitle,
        Card,
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableRow,
    } from "konsta/svelte";

    import { currencyData } from "../../store";
    import { currencyFormat, getData } from "../../utils/currency"
    import { onMount } from "svelte";

    onMount(async () => await getData());
</script>

{#if $currencyData.loading === false}
<BlockTitle>Курс валют для карток</BlockTitle>
<Card class="block overflow-x-auto mt-8" contentWrap={false}>
    <Table>
        <TableHead>
            <TableRow header>
                <TableCell header>Валюта</TableCell>
                <TableCell header class="text-right">Купівля</TableCell>
                <TableCell header class="text-right">Продаж</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {#each $currencyData.currency as d}
                <TableRow>
                    <TableCell>{ currencyFormat(d) }</TableCell>
                    <TableCell class="text-right">{ d.a }</TableCell>
                    <TableCell class="text-right">{ d.b }</TableCell>
                </TableRow>
            {/each}
        </TableBody>
    </Table>
</Card>
{/if}
