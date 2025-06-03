<script setup lang="ts">
import { computed, ref } from 'vue';
import { IconChevron } from './ui';
import type { Match, Team } from '@/types/tournamentData';

const props = defineProps<{
	games: Match;
	gridHeight: number;
	columnNumber: number;
	numberOfColumns: number;
	numberOfGamesInColumn: number;
	hoverParentId: number | null;
}>();

const emit = defineEmits<{
	(e: 'hoverGame', payload: { parent_id: number | null }): void;
	(
		e: 'selectTeam',
		payload: {
			game_id: number | null;
			parent_id: number | null;
			team: Team | null;
		},
	): void;
}>();

const isHovered = ref(false);
const setTeamStatus = ref(false);

const verticalLineHeight = computed(() => {
	return `height: ${props.gridHeight / (2 * props.numberOfGamesInColumn)}px`;
});

const onMouseEnter = () => {
	isHovered.value = true;

	if (
		props.games.first_team &&
		props.games.second_team &&
		!setTeamStatus.value
	) {
		emit('hoverGame', { parent_id: props.games.parent_id });
	}
};
const onMouseLeave = () => {
	isHovered.value = false;

	emit('hoverGame', { parent_id: null });
};

const onHoverClasses = computed(() => {
	if (
		isHovered.value &&
		props.games.first_team &&
		props.games.second_team &&
		!setTeamStatus.value
	) {
		return `linear-gradient(45deg, #75c87e 0%, #75c87e 32%, transparent 100%)`;
	}

	return '#313840';
});

const setTeam = (team: Team | null) => {
	if (
		!setTeamStatus.value &&
		props.games.first_team &&
		props.games.second_team
	) {
		emit('selectTeam', {
			game_id: props.games.id,
			parent_id: props.games.parent_id,
			team,
		});
		setTeamStatus.value = true;
	}
};
</script>
<template>
	<div
		class="relative mr-[0.9375rem] ml-[0.9375rem] rounded-[0.3125rem] border border-[#313840] pt-2.5 pr-[0.5625rem] pb-3.5 pl-[0.5625rem] text-[0.6875rem] font-semibold"
		@mouseenter="onMouseEnter"
		@mouseleave="onMouseLeave"
	>
		<div
			v-if="
				props.columnNumber !== props.numberOfColumns && props.columnNumber !== 1
			"
			class="absolute top-1/2 -left-4.5 flex w-0.25 -translate-y-1/2 flex-col justify-between bg-[#313840]"
			:style="verticalLineHeight"
		>
			<div class="relative -left-4 h-0.25 w-4 bg-[#313840]"></div>
			<div class="h-0.25 w-4.5 bg-[#313840]"></div>
			<div class="relative -left-4 h-0.25 w-4 bg-[#313840]"></div>
		</div>

		<div
			v-if="props.columnNumber === props.numberOfColumns"
			class="absolute top-1/2 -left-8.25 flex h-0.25 w-8.25 -translate-y-1/2 flex-col justify-between bg-[#313840]"
		></div>

		<div
			v-if="props.columnNumber !== props.numberOfColumns"
			class="flex flex-col gap-[0.3125rem]"
		>
			<div
				v-if="props.columnNumber !== props.numberOfColumns"
				class="flex items-center justify-between gap-1"
			>
				<div class="text-xs text-[#A5AFBB]">16:00 19 мар</div>
				<div
					class="flex items-center rounded-[0.125rem] bg-(--main-color) pt-0.5 pr-1 pb-0.5 pl-1"
				>
					<IconChevron />
					<div class="text-black">+200</div>
				</div>
			</div>

			<div
				v-if="!props.games.first_team && props.hoverParentId === props.games.id"
				class="relative flex min-h-8 items-center gap-[0.3125rem] rounded-[0.3125rem] border border-[#2de198] bg-[#313840] pt-1.5 pr-2.5 pb-1.5 pl-2.5 text-white transition"
			>
				Выберите команду
			</div>
			<div
				v-else
				class="relative flex min-h-8 items-center gap-[0.3125rem] pt-1.5 pr-2.5 pb-1.5 pl-2.5 text-[#989B9F] transition"
				:class="[
					$style['gradient-border'],
					{
						'text-white':
							isHovered &&
							!setTeamStatus &&
							props.games.first_team &&
							props.games.second_team,
					},
					{
						'cursor-pointer':
							props.games.first_team &&
							props.games.second_team &&
							!setTeamStatus,
					},
				]"
				@click="setTeam(props.games.first_team)"
			>
				<div
					v-if="props.games.first_team"
					class="flex items-center gap-[0.3125rem]"
				>
					<img
						:src="props.games.first_team.logo_url ?? ''"
						:alt="props.games.first_team.title"
						width="20"
						height="20"
					/>
					{{ props.games.first_team.title }}
				</div>
			</div>

			<div
				v-if="
					!props.games.second_team &&
					props.games.first_team &&
					props.hoverParentId === props.games.id
				"
				class="relative flex min-h-8 items-center gap-[0.3125rem] rounded-[0.3125rem] border border-[#2de198] bg-[#313840] pt-1.5 pr-2.5 pb-1.5 pl-2.5 text-white transition"
			>
				Выберите команду
			</div>
			<div
				v-else
				class="relative flex min-h-8 items-center gap-[0.3125rem] pt-1.5 pr-2.5 pb-1.5 pl-2.5 text-[#989B9F] transition"
				:class="[
					$style['gradient-border'],
					{
						'text-white':
							isHovered &&
							!setTeamStatus &&
							props.games.first_team &&
							props.games.second_team,
					},
					{
						'cursor-pointer':
							props.games.first_team &&
							props.games.second_team &&
							!setTeamStatus,
					},
				]"
				@click="setTeam(props.games.second_team)"
			>
				<div
					v-if="props.games.second_team"
					class="flex items-center gap-[0.3125rem]"
				>
					<img
						:src="props.games.second_team.logo_url ?? ''"
						:alt="props.games.second_team.title"
						width="20"
						height="20"
					/>
					{{ props.games.second_team.title }}
				</div>
			</div>
		</div>

		<div v-if="props.columnNumber === props.numberOfColumns">
			<div class="mb-[0.3125rem] text-xs text-[#A5AFBB]">Победитель</div>

			<div
				class="flex min-h-8 items-center gap-[0.3125rem] rounded-[0.3125rem] bg-[#313840] pt-1.5 pr-2.5 pb-1.5 pl-2.5 text-[#989B9F]"
			>
				<div v-if="games.winner_team">
					<img
						:src="games.winner_team?.logo_url ?? ''"
						:alt="games.winner_team?.title"
						width="20"
						height="20"
					/>
				</div>
				{{ games.winner_team?.title }}
			</div>
		</div>
	</div>
</template>

<style module>
.gradient-border {
	background: v-bind('onHoverClasses');
	border-radius: 0.375rem;
	z-index: 1;
}
.gradient-border::after {
	content: '';
	background: #313840;
	border-radius: 0.3125rem;
	position: absolute;
	left: 1px;
	right: 1px;
	top: 1px;
	bottom: 1px;
	z-index: -1;
}
</style>
