<template>
    <div class="networkError`">
        <h1>Uh-Oh!</h1>
        <h3>
            It looks like your are experiencing some network issue, please take a breath and
            <a href="#" @click="$router.go(-1)">Click here</a> to try again.
        </h3>
    </div>
</template>
