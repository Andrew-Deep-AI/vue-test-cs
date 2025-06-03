<script setup lang="ts">
import axios from 'axios';
import GroupGrid from '@/components/GroupGrid.vue';
import { ref, onMounted } from 'vue';
import type { PickemResponse, Group } from '@/types/tournamentData';

const groupsTournament = ref<PickemResponse>([]);
const tournaments = ref<Group[]>([]);
const isLoading = ref(true);

const fetchGroupsTournament = async () => {
	try {
		const { data } = await axios.get<PickemResponse>(
			'http://localhost:3001/data',
		);
		groupsTournament.value = data;
		tournaments.value = data[0]?.groups ?? [];
	} catch (error) {
		console.error('Ошибка при загрузке данных:', error);
	} finally {
		isLoading.value = false;
	}
};

onMounted(fetchGroupsTournament);
</script>

<template>
	<div
		v-if="isLoading"
		class="flex items-center justify-center rounded-md bg-(--bg-basic-color) pt-4 pr-6 pb-6 pl-6 text-white"
	>
		<span
			class="mr-2"
			:class="[$style.loader]"
		></span>
		<span class="text-white">Загрузка...</span>
	</div>

	<div
		v-else
		class="flex flex-col gap-2.5"
	>
		<GroupGrid
			v-for="tournament of tournaments"
			:key="tournament.id"
			:tournament="tournament"
		/>
	</div>
</template>

<style module>
.loader {
	border: 4px solid #cbd5e4;
	border-top: 4px solid #313840;
	border-radius: 50%;
	width: 24px;
	height: 24px;
	animation: spin 1s linear infinite;
	display: inline-block;
	vertical-align: middle;
}
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
