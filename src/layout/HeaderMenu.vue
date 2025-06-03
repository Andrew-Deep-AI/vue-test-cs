<script setup lang="ts">
import HeaderMenuButton from '@/components/HeaderMenuButton.vue';
import {
	IconAward,
	IconBarChart,
	IconBranch,
	IconGroup,
	IconHome,
} from '@/components/ui';
</script>

<template>
	<header class="main-container rounded-md bg-(--bg-basic-color) p-6">
		<nav
			class="flex justify-center gap-12"
			:class="$style['nav-menu']"
		>
			<div class="relative">
				<HeaderMenuButton to-link="/">
					<template #icon>
						<IconHome />
					</template>
					Главная
				</HeaderMenuButton>
			</div>
			<div class="relative">
				<HeaderMenuButton to-link="/groups">
					<template #icon>
						<IconGroup />
					</template>
					Группы
				</HeaderMenuButton>
			</div>
			<div class="relative">
				<HeaderMenuButton to-link="/leaderboard">
					<template #icon>
						<IconBarChart />
					</template>
					Лидерборд
				</HeaderMenuButton>
			</div>
			<div class="relative">
				<HeaderMenuButton to-link="/nominations">
					<template #icon>
						<IconAward />
					</template>
					Номинации
				</HeaderMenuButton>
			</div>
			<div class="relative">
				<HeaderMenuButton to-link="/playoff">
					<template #icon>
						<IconBranch />
					</template>
					Плэйофф
				</HeaderMenuButton>
			</div>
		</nav>
	</header>
</template>

<style module>
.nav-menu :not(:last-child)::after {
	position: absolute;
	top: 50%;
	right: -1.4688rem;
	content: '';
	height: 2.5rem;
	width: 0.0625rem;
	background-color: rgba(249, 250, 251, 0.1);
	transform: translateY(-50%);
}
</style>
