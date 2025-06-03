<script setup lang="ts">
import { CsButton, IconClose, IconRandom } from '@/components/ui';
import ScoreMatchGrid from './ScoreMatchGrid.vue';
import MatchGrid from './MatchGrid.vue';
import { ref } from 'vue';
import type { Group } from '@/types/tournamentData';

const props = defineProps<{
	tournament: Group;
}>();

const isBetSelected = ref(false);
const matchGridKey = ref(0);
const matchGridRef = ref();

const onBetMade = () => {
	isBetSelected.value = true;
};

const resetMatchGrid = () => {
	matchGridKey.value++;
	isBetSelected.value = false;
};

const onConfirm = () => {
	matchGridRef.value?.handleConfirm();
};

const onRandomizeGrid = () => {
	matchGridRef.value?.handleRandomizeGrid();
};
</script>

<template>
	<div class="rounded-md bg-(--bg-basic-color) pt-4 pr-6 pb-6 pl-6">
		<div class="mb-8 flex items-center gap-4">
			<h1 class="text-[1.75rem] font-semibold text-white">
				{{ tournament.title }}
			</h1>
			<ScoreMatchGrid />
		</div>

		<MatchGrid
			ref="matchGridRef"
			:key="matchGridKey"
			:matches="props.tournament.matches"
			:on-confirm="onConfirm"
			@bet-made="onBetMade"
		/>

		<div
			class="mt-5 flex items-center justify-between gap-2 border-t border-[#313840] pt-5"
		>
			<div class="flex items-center gap-2">
				<CsButton @click="onRandomizeGrid">
					<template #icon>
						<IconRandom />
					</template>
					Случайно
				</CsButton>

				<CsButton
					:disabled="!isBetSelected"
					@click="resetMatchGrid"
				>
					<template #icon>
						<IconClose />
					</template>
					Сбросить
				</CsButton>
			</div>

			<CsButton
				:disabled="!isBetSelected"
				class="min-w-36 text-xs"
				view="flat"
				@click="onConfirm"
			>
				Подтвердить
			</CsButton>
		</div>
	</div>
</template>
