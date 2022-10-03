<template>
    <div class="m-8">
        <h1 class="text-3xl">Create New Reward</h1>
        

        <div>
            <div>
                <label for="name">Reward Name</label>
                <input type="text" v-model="reward.name">
            </div>
            <div>
                <label for="detail">Reward Detail</label>
                <textarea name="detail" id="" cols="30" rows="10" 
                v-model="reward.detail"></textarea>
            </div>
            <div>
                <label for="total_amount">Total Amount</label>
                <input type="number" v-model="reward.total_amount">
            </div>
            <div>
                <label for="point">Point</label>
                <input type="number" v-model="reward.point">
            </div>

            <button @click="saveNewReward()" 
            class="px-4 py-2 rounded-lg bg-lime-400">
                Create
            </button>
        </div>

        <div class="mt-8">
            (preview)
            <RewardCard :reward="reward"></RewardCard>
        </div>
    </div>
</template>

<script>
import RewardCard from '@/components/rewards/RewardCard.vue'
import { useRewardStore } from '@/stores/reward.js'

export default {
    setup() {
        const reward_store = useRewardStore()
        return { reward_store }
    },
    data() {
        return {
            reward: {
                name: '',
                detail: '',
                total_amount: 1,
                point: 0
            },
            error: null
        }
    },
    components:{
        RewardCard
    },
    methods: {
        async saveNewReward() {
            // todo: validate data here
            // const url = 'http://localhost/api/rewards'
            this.error = null

            try {
                const reward_id = await this.reward_store.add(this.reward)
                if(reward_id){
                    this.$router.push(`/rewards/${reward_id}`)
                }
            } catch (error) {
                console.error(error)
				this.error = error.message
            }


        }
    }
}
</script>