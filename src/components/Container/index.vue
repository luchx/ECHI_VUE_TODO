<template>
  <section class="container">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "Container"
};
</script>

<style lang="less">
	.container {
		display: flex;
		flex-direction: column;
		width: 750px;
		height: 100vh;
		margin: 0 auto;
	}
</style>