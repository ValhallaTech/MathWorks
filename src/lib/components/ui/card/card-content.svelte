<script>
	import { cn } from "$lib/utils.js";

	/** @type {import('$lib/utils.js').WithElementRef<import('svelte/elements').HTMLAttributes<HTMLDivElement>>} */
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-content"
	class={cn("px-6 group-data-[size=sm]/card:px-4", className)}
	{...restProps}
>
	{@render children?.()}
</div>