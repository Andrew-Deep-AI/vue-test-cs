<script setup lang="ts">
import type { VNode } from 'vue';

const props = withDefaults(
	defineProps<{
		toLink: string;
	}>(),
	{},
);

const slots = defineSlots<{
	icon?: () => VNode;
	default: string;
}>();
</script>

<template>
	<RouterLink
		class="box-border flex min-w-[7.5625rem] flex-nowrap items-center justify-center gap-3 rounded-md pt-2.5 pr-4 pb-2.5 pl-4 text-sm text-[#A5AAB1] transition hover:bg-[#F9FAFB]/10"
		:to="props.toLink"
		active-class="bg-[#F9FAFB]/10 text-white"
	>
		<div v-if="slots.icon">
			<slot name="icon" />
		</div>
		<slot name="default" />
	</RouterLink>
</template>
