<template>
    <div 
            class="grid grid-cols-2 p-4 mb-4 border-2
            border-blue-800 rounded-lg"
    >
        <h3 class="text-xl">{{ reward.name }}</h3>
        <p class="text-red-500 text-4xl">{{ reward.point }}</p>
        <router-link v-if="url != ''" :to="url">Detail 1</router-link>

        <span class="text-blue-700"
            :class="url == '' ? '':'cursor-pointer'"
            @click="onClickButton">
            Detail 2
        </span>
    
        <button @click="onClickButton()"
        class="px-2 py-1 border rounded-xl">
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
    },
    methods: {
        onClickButton() {
            if(this.url != '') {
                this.$router.push(this.url)
            }
        }
    }
}
</script>