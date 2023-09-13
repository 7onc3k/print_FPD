<template>
    <div v-if="loading">
        Loading...
    </div>

    <div v-else>
        <div v-for="design in userDesigns">
            <img :src="design.thumbnail" @click="onDesignClick(design.id)">
            {{ design.id }}
        </div>
    </div>
</template>
  
<script>
import { supabase } from '../supabaseClient'

export default {
    data() {
        return {
            loading: false,
            userDesigns: []
        }
    },

    async created() {
        this.loading = true

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()

        // Fetch user designs
        const { data: designs } = await supabase
            .from('user_designs')
            .select('id, design_data')
            .eq('user_id', user.id)
        console.log("Supabase response data:", designs);
        // Map designs 
        this.userDesigns = designs.map(design => {
            return {
                id: design.id,
                thumbnail: design.design_data[0].thumbnail
            }
        })

        this.loading = false
    },
    methods: {
        onDesignClick(designId) {
            this.$emit('design-selected', designId);
            this.$router.push('/designer');
        }
    }
}
</script>