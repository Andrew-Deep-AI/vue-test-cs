<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderMenu from './layout/HeaderMenu.vue';
</script>

<template>
	<div class="font-inter">
		<HeaderMenu />
		<main class="main-container flex-1">
			<div class="mt-2.5">
				<RouterView />
			</div>
		</main>
	</div>
</template>
