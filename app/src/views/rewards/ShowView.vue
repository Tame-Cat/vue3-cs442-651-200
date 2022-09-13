<template>
    <div class="m-8">
        <h1 class="text-3xl"> {{reward.name}} </h1>

        <p>{{reward.detail}}</p>
        <p>จำนวน {{reward.total_amount}} สิทธิ์</p>
        <p>Redeem with {{reward.point}} point</p>
    </div>
</template>

<script>
import Axios  from 'axios'
export default {
    data() {
        return{
            error:null,
            reward:null
        }
    },
    async created() {
        const id = this.$route.params.id
        const url = `http://localhost/api/rewards/${id}`

        try {
            const response = await Axios.get(url)
            if(response.status === 200) {
                this.reward = response.data.data
                console.table(this.reward)
            }
        } catch (error) {
            console.log(error)
            this.error = error.message
        }
    }
}
</script>

<style>

</style>