<script lang="ts">
  import type { VariantProps } from "class-variance-authority";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  import { cn } from "$lib/utils";
  import { cva } from "class-variance-authority";

  const badgeVariants = cva(
    "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
      defaultVariants: {
        variant: "default",
      },
      variants: {
        variant: {
          default:
            "bg-primary hover:bg-primary/80 border-transparent text-primary-foreground",
          destructive:
            "bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground",
          outline: "text-foreground",
          secondary:
            "bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground",
        },
      },
    }
  );

  export let href: HTMLAnchorAttributes["href"] = undefined;
  export let target: HTMLAnchorAttributes["target"] = undefined;
  export let variant: VariantProps<typeof badgeVariants>["variant"] = "default";
  let className: null | string | undefined = undefined;
  export { className as class };
</script>

<svelte:element
  class={cn(badgeVariants({ className, variant }))}
  {href}
  on:click
  {target}
  this={href ? "a" : "span"}
  {...$$restProps}
>
  <slot />
</svelte:element>
