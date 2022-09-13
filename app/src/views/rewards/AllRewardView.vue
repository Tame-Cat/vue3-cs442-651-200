<template>
    <section class="mx-8">
        <h1 class="text-3xl text-yellow-700"> {{ title }} </h1>

        <div v-if="error != null">
            {{ error }}
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
export default {
    data() {
        return {
            title: "Reward List",
            selected: null,
            rewards: null,
            error: null
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
            const response = await this.$axios.get("/rewards")
            if(response.status == 200){
                this.rewards = response.data.data
            }else{
                console.error(response.status)
            }
        }catch(error) {
            this.error = error.message
        }
    }

}
</script>

<style>

</style>