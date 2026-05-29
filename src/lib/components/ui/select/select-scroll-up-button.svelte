<script>
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import ChevronUpIcon from '@lucide/svelte/icons/chevron-up';

	/** @type {import('$lib/utils.js').WithoutChild<import('bits-ui').Select.ScrollUpButtonProps>} */
	let {
		ref = $bindable(null),
		class: className,
		...restProps
	} = $props();
</script>

<SelectPrimitive.ScrollUpButton
	bind:ref
	data-slot="select-scroll-up-button"
	class={cn("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4 top-0 w-full", className)}
	{...restProps}
>
	<ChevronUpIcon  />
</SelectPrimitive.ScrollUpButton>