<template>
    <div 
            class="grid grid-cols-2 p-4 mb-4 border-2
            border-blue-800 rounded-lg"
    >
        <h3 class="text-xl">{{ reward.name }}</h3>
        <p class="text-red-500 text-4xl">{{ reward.point }}</p>
        <span>Detail</span>
        <button class="px-2 py-1 border rounded-xl">
            Redeem
        </button>
        
    </div>
</template>

<script>
export default {
    props: {
        reward: Object,
        url: {
            type: String,
            default: ''
        }
    }
}
</script>