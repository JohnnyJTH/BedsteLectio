<script lang="ts">
    import { createCombobox, melt } from "@melt-ui/svelte";
    import { Check, ChevronDown, ChevronUp } from "lucide-svelte";
    import { fly } from "svelte/transition";

    export let items: string[] = [];
    export let placeholder = "Vælg en mulighed";
    export let value: string;

    const {
        elements: { menu, input, option },
        states: { open, inputValue, selected, touchedInput },
        helpers: { isSelected },
    } = createCombobox({
        defaultSelected: { label: value, value },
        forceVisible: true,
    });

    $: if ($selected) value = $selected.value;

    $: filteredItems = $touchedInput
        ? items.filter((value) => {
              const normalizedInput = $inputValue.toLowerCase();
              return value.toLowerCase().includes(normalizedInput);
          })
        : items;
</script>

<div class="w-full relative">
    <input use:melt={$input} class="w-full h-11 border dark:border-gray-600 border-gray-400 rounded-[6px] p-2 bg-[inherit] dark:bg-[#2e2e2e]" {placeholder} />
    <div class="absolute right-2 top-1/2 z-10 -translate-y-1/2">
        {#if $open}
            <ChevronUp class="square-4" />
        {:else}
            <ChevronDown class="square-4" />
        {/if}
    </div>
</div>
{#if $open}
    <ul class="z-10 flex max-h-[300px] flex-col overflow-hidden rounded-lg" use:melt={$menu} transition:fly={{ duration: 150, y: -5 }}>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div class="flex max-h-full flex-col gap-0 overflow-y-auto bg-white dark:bg-dark px-2 py-2 text-slate-900 dark:text-slate-100" tabindex="0">
            {#each filteredItems as item, index (index)}
                <li
                    use:melt={$option({
                        value: item,
                        label: item,
                    })}
                    class="relative cursor-pointer scroll-my-2 rounded-md py-2 pl-4 pr-4
                    data-[highlighted]:bg-[#e3ffe7] dark:data-[highlighted]:bg-[#8778f9be]"
                >
                    {#if $isSelected(item)}
                        <div class="check absolute left-2 top-1/2 z-10 text-magnum-900">
                            <Check class="square-4" />
                        </div>
                    {/if}
                    <span class="pl-4 font-medium">{item}</span>
                </li>
            {:else}
                <li
                    class="relative cursor-pointer rounded-md py-1 pl-8 pr-4
          data-[highlighted]:bg-[#e3ffe7] dark:data-[highlighted]:bg-[#8778f9be]"
                >
                    Ingen resultater
                </li>
            {/each}
        </div>
    </ul>
{/if}

<style lang="postcss">
    .check {
        @apply absolute left-2 top-1/2;
        translate: 0 calc(-50% + 1px);
    }
</style>
