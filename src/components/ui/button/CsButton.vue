<script setup lang="ts">
import { computed, type VNode } from 'vue';

const props = withDefaults(
	defineProps<{
		view?: 'cta' | 'flat';
		disabled?: boolean;
	}>(),
	{
		view: 'cta',
		disabled: false,
	},
);

const slots = defineSlots<{
	icon?: () => VNode;
	default: string;
}>();

const emit = defineEmits<(e: 'click') => void>();

const click = () => {
	if (props.disabled) return;
	emit('click');
};

const hoverClass = computed(() => {
	if (props.disabled) {
		return '';
	}
	if (props.view === 'flat') {
		return [`hover:bg-(--main-color)/70 hover:border-(--main-color)/70`];
	}
	return [`hover:border-(--main-color)/10`];
});

const viewClass = computed(() => {
	if (props.disabled) {
		return [
			'border-(--neutral-color)/0 bg-(--neutral-color)/50 text-(--neutral-text-color)',
		];
	}
	if (props.view === 'flat') {
		return [
			`border-(--main-color) bg-(--main-color) text-gray-900 ${hoverClass.value}`,
		];
	}
	return [
		`border-(--main-color) bg-(--main-color)/20 text-slate-300 ${hoverClass.value}`,
	];
});
</script>

<template>
	<button
		class="box-border flex flex-nowrap items-center justify-center gap-1.5 rounded-[5px] border-1 pt-2.5 pr-[1.0625rem] pb-2.5 pl-[1.0625rem] text-xs transition"
		:class="[viewClass, props.disabled ? 'cursor-default' : 'cursor-pointer']"
		type="button"
		@click="click"
	>
		<div v-if="slots.icon">
			<slot name="icon" />
		</div>
		<slot />
	</button>
</template>
