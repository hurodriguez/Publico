<template>
    <div class="home">
        <div class="hero">
            <p class="description">
                Just learn and share
            </p>
            <p class="action" v-if="btn"><a href="/it/" class="nav-link action-button">Get Started →</a></p></div> <!---->
    </div>
</template>

<script>
    export default {
        props: {
            btn: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="css">

    .home  {
        padding-top: 0;
    }

</style>
