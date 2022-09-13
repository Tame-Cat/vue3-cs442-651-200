<template>
    <section class="mx-8">
        <h1 class="text-3xl text-yellow-700"> {{ title }} </h1>

        <div v-if="error != null">
            {{ error }}
        </div>
        
        <div v-for="reward in rewards"
            v-bind:key="reward.id"
            class="grid grid-cols-2 p-4 mb-4 border-2
            border-blue-800 rounded-lg"
        >
            <h3 class="text-xl">{{ reward.name }}</h3>
            <p class="text-red-500 text-4xl">{{ reward.point }}</p>
            <RouterLink :to="`rewards/${reward.id}`">Deteail</RouterLink>
            <button v-on:click="selectReward(reward)"
                class="px-2 py-1 border rounded-xl"
            >
            Redeem
            </button>

            <button v-on:click="deleteReward(reward)"
                class="px-2 py-1 border rounded-xl text-red-600"
            >
            Delete
            </button>
            

        </div>

        {{selected}}

    </section>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            title: "Reward List",
            selected: null,
            rewards: null,
            error: null
        }
    },
    methods: {
        selectReward(reward){
            this.$router.push({
                name: 'rewards.show',
                params: {id: reward.id}
            })
        },
        async deleteReward(reward){
            const id = reward.id
            const url = `http://localhost/api/rewards/${id}`

            try {
                const response = await axios.delete(url)
                if(response.status == 200) {
                    console.table(response.status)
                    this.$router.push({
                        name: 'rewards'
                    })
                }
                
            } catch (error) {
                console.log(error)
                this.error = error.message
            }
        }
    },
    async mounted() {
        console.log("mounted")
        this.error = null
        const url = "http://localhost/api/rewards"
        
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
            const response = await axios.get(url)
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