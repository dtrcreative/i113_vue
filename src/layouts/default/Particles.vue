<template>
  <div id="app">
<!--    <vue-particles id="tsparticles" @particles-loaded="particlesLoaded" url="@/assets/" />-->

    <vue-particles
      id="tsparticles"
      @particles-loaded="particlesLoaded"
      :options="{
                    background: {
                        color: {
                            value: '#000000'
                        }
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: false,
                                mode: 'push'
                            },
                            onHover: {
                                enable: true,
                                mode: 'repulse'
                            },
                        },
                        modes: {
                            bubble: {
                                distance: 150,
                                duration: 4,
                                opacity: 0.2,
                                size: 20
                            },
                            push: {
                                quantity: 4
                            },
                            repulse: {
                                distance: 150,
                                duration: 0.8
                            }
                        }
                    },
                    particles: {
                        color: {
                            value: '#ffffff'
                        },
                        links: {
                            color: '#2fff00',
                            distance: 130,
                            enable: true,
                            opacity: 0.3,
                            width: 0.5
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outModes: 'bounce',
                            random: true,
                            speed: 1.2,
                            straight: false
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 300
                        },
                        opacity: {
                            value: 0.2
                        },
                        shape: {
                            type: 'circle'
                        },
                        size: {
                            value: { min: 1, max: 2 }
                        }
                    },
                    detectRetina: true
                }"
    />
  </div>
</template>

<script setup>

const particlesLoaded = async container => {
  // console.log("Particles container loaded", container);
};
</script>

<style scoped>

</style>
