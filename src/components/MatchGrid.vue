<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import GameItem from './GameItem.vue';
import type { Match, Team } from '@/types/tournamentData';

type GroupedGame =
	| Omit<Match, 'children'>
	| { id: 'winner'; winner_team: Team | null };
type GroupedGames = GroupedGame[][];

const props = defineProps<{
	matches: Match[];
}>();

const emit = defineEmits<{
	(e: 'betMade'): void;
}>();

const gridRef = ref<HTMLElement | null>(null);
const gridHeight = ref<number>(0);
const isRandomized = ref(false);

const findMaxLevel = (matches: Match[]): number => {
	return matches.reduce((maxLevel, match) => {
		const currentMax = Math.max(maxLevel, match.level);

		if (match.children && match.children.length > 0) {
			return Math.max(currentMax, findMaxLevel(match.children));
		}

		return currentMax;
	}, 0);
};

const maxLevelColumns = computed(() => findMaxLevel(props.matches) + 1);

const gridColsWidth = computed(() => {
	const rowWidth = [];
	for (let i = 0; i < maxLevelColumns.value; i++) {
		rowWidth.push('12.1875rem');
	}
	return `grid-template-columns: ${rowWidth.join(' ')}`;
});

const newGroupedGames = ref();

const groupedGames = computed<GroupedGames>(() => {
	const groupByLevel = (
		game: Match,
		result: GroupedGames = [],
	): GroupedGames => {
		if (!result[game.level - 1]) {
			result[game.level - 1] = [];
		}

		const maxLevel = findMaxLevel(props.matches);
		result[game.level - 1].push({
			id: game.id,
			level: game.level,
			pickem_group_id: game.pickem_group_id,
			parent_id: game.parent_id,
			first_team: game.level === maxLevel ? game.first_team : null,
			second_team: game.level === maxLevel ? game.second_team : null,
			winner_team: game.winner_team,
			first_score: game.first_score,
			second_score: game.second_score,
		});

		if (game.children && game.children.length > 0) {
			game.children.forEach((child) => groupByLevel(child, result));
		}

		return result;
	};
	const result = groupByLevel(props.matches[0]).slice().reverse();
	result.push([
		{
			id: 'winner',
			winner_team: null,
		},
	]);

	return result;
});

newGroupedGames.value = groupedGames.value;

const hoverParentId = ref<number | null>(null);

const onHoverGame = (payload: { parent_id: number | null }) => {
	hoverParentId.value = payload.parent_id;
};

const onSelectTeam = (payload: {
	game_id: number | null;
	parent_id: number | null;
	team: Team | null;
}) => {
	const setFirstTeamInGroupedGames = (
		arr: GroupedGame[],
		parentId: number | string | null,
		newTeam: Team | null,
		gameId?: number | string | null,
	): void => {
		for (const group of arr) {
			const items = Array.isArray(group) ? group : [group];
			for (const item of items) {
				if (!item) continue;

				if (item.id === parentId) {
					if (!item.first_team) {
						item.first_team = newTeam;
					} else if (item.first_team && !item.second_team) {
						item.second_team = newTeam;
					}
				}

				if (parentId === null && item.id === 'winner') {
					item.winner_team = newTeam;
				} else if (gameId !== undefined && item.id === gameId) {
					item.winner_team = newTeam;
				}
			}
		}
	};

	setFirstTeamInGroupedGames(
		newGroupedGames.value,
		payload.parent_id,
		payload.team,
		payload.game_id,
	);

	emit('betMade');
};

const handleConfirm = () => {
	console.log('Ставка сделана, сетка игр выбрана!');
	console.log('Новвая сетка: ', newGroupedGames.value);
};

const randomizeTeams = () => {
	const processGames = (gamesArr: GroupedGame[]) => {
		for (const group of gamesArr) {
			const items = Array.isArray(group) ? group : [group];
			for (const item of items) {
				if (!item || !item.first_team || !item.second_team) continue;

				const teams = [item.first_team, item.second_team];
				const randomTeam = teams[Math.floor(Math.random() * teams.length)];

				onSelectTeam({
					game_id: item.id,
					parent_id: item.parent_id,
					team: randomTeam,
				});
			}
		}
	};

	processGames(newGroupedGames.value);
};

const handleRandomizeGrid = () => {
	if (!isRandomized.value) {
		randomizeTeams();
	}

	isRandomized.value = true;
};

defineExpose({ handleConfirm, handleRandomizeGrid });

onMounted(() => {
	if (gridRef.value) {
		const rect = gridRef.value.getBoundingClientRect();
		gridHeight.value = rect.height;
	}
});
</script>

<template>
	<div class="overflow-auto">
		<div
			class="mb-5 grid w-fit gap-0.25 overflow-hidden rounded-[0.3125rem]"
			:style="gridColsWidth"
		>
			<div
				v-for="level in maxLevelColumns"
				:key="level"
				class="flex items-center justify-center bg-[#313840] p-2 text-xs text-[#CBD5E4]"
			>
				{{
					`${level === maxLevelColumns ? 'Победитель' : level === maxLevelColumns - 1 ? 'Финал верхней сетки' : `${level} раунд`}`
				}}
			</div>
		</div>

		<div
			ref="gridRef"
			class="grid gap-0.5"
			:style="gridColsWidth"
		>
			<div
				v-for="(arrGames, index) of newGroupedGames"
				:key="arrGames.id"
			>
				<div
					class="flex h-full flex-col justify-around gap-[1.5625rem]"
					:class="arrGames[index] === arrGames[0] ? '-ml-[0.9375rem]' : ''"
				>
					<div
						v-for="column of arrGames"
						:key="column?.id"
					>
						<GameItem
							:grid-height="gridHeight"
							:games="column"
							:column-number="index + 1"
							:number-of-columns="newGroupedGames.length"
							:number-of-games-in-column="arrGames.length"
							:hover-parent-id="hoverParentId"
							@hover-game="onHoverGame"
							@select-team="onSelectTeam"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
