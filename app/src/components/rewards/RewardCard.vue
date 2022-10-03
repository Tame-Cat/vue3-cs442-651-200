<template>
    <div 
            class="grid grid-cols-2 p-4 mb-4 border-2
            border-blue-800 rounded-lg"
    >
        <h3 class="text-xl">{{ reward.name }}</h3>
        <p class="text-red-500 text-4xl">{{ reward.point }}</p>

        <div class="italic text-green-500">
            <slot></slot>
        </div>

        <div class="text-2xl font-bold">
            <slot name="total_amount"></slot>
        </div>

        <button @click="onClickButton()"
        class="px-2 py-1 mx-4 border rounded-xl">
            Redeem
        </button>

        <div class="grid grid-cols-2">
            <button @click="onClickLike()"
            class="p-2 mx-8 bg-yellow-200 border-2 border-blue-400 rounded-xl"
            >
            {{ likeCount }} Likes
            </button>

            <button @click="onClickCounter()"
            class="p-2 mx-8 bg-green-200 border-2 border-blue-400 rounded-xl">
             {{ counter_store.counter }} |
             {{ counter_store.doubleCount }}
            </button>

        </div>
        
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter.js'

export default {
    setup() {
        const counter_store = useCounterStore()
        return {counter_store}
    },
    data() {
        return {
            likeCount: 0
            // isLike: false
        }
    },
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
        },
        onClickLike() {
            // if(!this.isLike){
            //     this.likeCount++
            //     this.isLike = true
            // }else{
            //     this.likeCount--
            //     this.isLike = false
            // }
            this.likeCount++
        },
        onClickCounter() {
            this.counter_store.increment()
        }
    }
}
</script>

<style scoped>
.my-style{
    @apply block p-2 bg-pink-400 w-20 rounded-lg
}
</style>>