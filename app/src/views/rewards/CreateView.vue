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
export default {
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

            try {
                this.reward.balance = this.reward.total_amount
                this.reward.is_active = true
                const response = await this.$axios.post("/rewards", this.reward)

                if(response.status == 201){
                    let reward_id = response.data.reward_id
                    this.$router.push({name: 'rewards.show', params: {id: reward_id}})
                }
            } catch (error) {
                this.error = error.message
                console.log(error)
            }


        }
    }
}
</script>