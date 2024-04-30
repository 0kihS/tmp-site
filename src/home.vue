<script setup lang="ts">
import { Application } from '@splinetool/runtime';
import { ref, reactive, onMounted } from 'vue';

// template ref
const canvas = ref<HTMLCanvasElement | null>(null)

// spline state
const state = reactive({
    spline: {
        scene: "https://prod.spline.design/zoBeB2JCtkuRMSN0/scene.splinecode",
        app: null as Application | null,
        isLoaded: false,
    },
});

onMounted(async () =>{
    const app = new Application(canvas.value as HTMLCanvasElement);
    await app
    .load(state.spline.scene)

    state.spline.app = app;
    state.spline.isLoaded = true;
});

</script>

<template>
    <section>
        <canvas ref="canvas" />
    </section>
</template>