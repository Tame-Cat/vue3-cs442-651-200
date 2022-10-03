<template>
    <section class="mx-8">
        <h1 class="text-3xl text-yellow-700"> {{ title }} </h1>

        <div v-if="error != null">
            {{ error }}
        </div>

        <div>
            <label>Sort by</label>
            <select v-model="sortOption">
                <option value="default">---</option>
                <option value="name">name</option>
                <option value="point">point</option>
            </select>
        </div>

        <div class="grid grid-cols-2 my-4">
            <button @click="onClickSortByPoint"
             class="px-2 py-1 mx-4 bg-orange-200 border rounded-xl"
            >
                sort by point
            </button>

            <button @click="onClickSortByName"
            class="px-2 py-1 mx-4 bg-pink-200 border rounded-xl"
            >
                sort by name
            </button>

        </div>

        <reward-card v-for="reward in rewards" 
        :reward="reward"
        :key="reward.id"
        :url="`rewards/${reward.id}`"
        >
            {{reward.detail}} 
            <template #total_amount>
                จำกัดจำนวน {{reward.total_amount}} สิทธิ์
            </template>
        </reward-card>
        

        {{selected}}

    </section>
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
            title: "Reward List",
            selected: null,
            rewards: null,
            error: null,
            sortOption: 'default'
        }
    },
    watch: {
        sortOption (newOption, oldOption) {
            switch(newOption) {
                case 'name':
                    this.rewards = this.reward_store.sortByName
                    break;
                case 'point':
                    this.rewards = this.reward_store.sortByPoint
                    break;
                default:
                    this.rewards = this.reward_store.getRewards
                    break;
            }
        }
    },
    components:{
        RewardCard
    },
    methods: {
        selectReward(reward){
            this.$router.push({
                name: 'rewards.show',
                params: {id: reward.id}
            })
        },

        onClickSortByPoint(){
            this.rewards = this.reward_store.sortByPoint
        },

        onClickSortByName(){
            this.rewards = this.reward_store.sortByName
        }
    },
    async mounted() {
        console.log("mounted")
        this.error = null
        
        //Non-Blocking I/O ทำงานแบบไม่รอใคร ยังโหลดไม่เสร็จ ก็ทำแล้ว
        //Asynchronous Language
         //1. Callback -> Hell loop
         //2. Promise ถ้าข้อมูลมา จะทำต่อ -> Hell loop
         //3. async-await

        // const response = await axios.get(url)
        // if(response.status === 200) {
        //     this.rewards = response.data.data
        // } else {
        //     console.error(response.status)
        //     this.selected = error.message
        // }
        try{
            await this.reward_store.fetch()
            this.rewards = this.reward_store.getRewards
        }catch(error) {
            this.error = error.message
        }
    }

}
</script>

<style>

</style>