<script lang="ts" setup>

function onSubmit(e: any) {

}
</script>

<template>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-6 bg-background-secondary p-6 rounded-2xl min-w-96">
        <div class="flex flex-col gap-2">
            <label>Email</label>
            <input type="email" class="p-2 rounded-xl border" required placeholder="Enter your email">
        </div>
        <div class="flex flex-col gap-2">
            <label>Password</label>
            <input type="text" class="p-2 rounded-xl border" required placeholder="Enter your password">
        </div>
        <div class="flex flex-col gap-2">
            <label>Repeat password</label>
            <input type="text" class="p-2 rounded-xl border" required placeholder="Enter your password again">
        </div>
        <button class="btn btn-primary">Register</button>
    </form>
</template>

<style lang="scss" scoped></style>