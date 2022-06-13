<script lang="ts">
	import { onMount } from 'svelte';
	import type { TopAppBarComponentDev } from '@smui/top-app-bar';
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import IconButton, { Icon } from '@smui/icon-button';
	import { mdiMenu } from '@mdi/js';
	import { Svg } from '@smui/common/elements';
	import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';

	let topAppBar: TopAppBarComponentDev;
	let darkTheme: boolean | undefined = undefined;

	onMount(() => {
		darkTheme =
			typeof window === 'undefined' || window.matchMedia('(prefers-color-scheme: dark)').matches;
	});
</script>

<svelte:head>
	<!-- SMUI Styles -->
	{#if darkTheme === undefined}
    <link rel="stylesheet" href="/smui-dark.css" media="screen and (prefers-color-scheme: dark)" />
		<link rel="stylesheet" href="/smui.css" media="(prefers-color-scheme: light)" />
		
	{:else if darkTheme}
		<link rel="stylesheet" href="/smui.css" />
		<link rel="stylesheet" href="/smui-dark.css" media="screen" />
	{:else}
		<link rel="stylesheet" href="/smui.css" />
	{/if}
</svelte:head>

<TopAppBar bind:this={topAppBar} variant="fixed">
	<Row>
		<Section>
			<!-- <IconButton>
				<Icon component={Svg} viewBox="0 0 24 24">
					<path fill="currentColor" d={mdiMenu} />
				</Icon>
			</IconButton> -->
			<Title>Ventrata</Title>
		</Section>
		<Section align="end" toolbar>
			<IconButton
				on:click={() => (darkTheme = !darkTheme)}
				title={darkTheme ? 'Lights on.' : 'Lights off.'}
			>
				<Icon component={Svg} viewBox="0 0 24 24">
					<path fill="currentColor" d={darkTheme ? mdiWeatherSunny : mdiWeatherNight} />
				</Icon>
			</IconButton>
		</Section>
	</Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
	<slot />
</AutoAdjust>
