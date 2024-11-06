<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore()

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        name (value) {
            if (value?.length >= 3) return true

            return 'Name needs to be at least 3 characters.'
        },
        city (value) {
            if (value?.length >= 3) return true

            return 'City needs to be at least 3 characters.'
        },
        address (value) {
            if (value?.length >= 3) return true

            return 'Address needs to be at least 3 characters.'
        },
        manager (value) {
            if (value) return true

            return 'Please choose manager.'
        },
    },
})

const name = useField('name')
const city = useField('city')
const address = useField('address')
const manager = useField('manager')
const managers = computed(() => store.getters['organizerCreate/managers']);

const submit = handleSubmit(values => {
    store.dispatch('organizerCreate/createOrganizer', {
        name: values.name,
        city: values.city,
        address: values.address,
        manager: values.manager,
    })
})

onMounted(() => {
    store.dispatch('organizerCreate/fetchManagers');
});

watch(
    () => store.getters['organizerCreate/organizer'],
    (newOrganizer) => {
        if (newOrganizer?.id) { // Ensure the organizer has an ID
            router.push({
                name: "organizer-details",
                params: { id: newOrganizer.id }
            });
        }
    }
);
</script>

<template>
    <v-container>
        <form @submit.prevent="submit">
            <v-text-field
                v-model="name.value.value"
                :counter="10"
                :error-messages="name.errorMessage.value"
                label="Name"
            ></v-text-field>

            <v-text-field
                v-model="city.value.value"
                :counter="7"
                :error-messages="city.errorMessage.value"
                label="City"
            ></v-text-field>

            <v-text-field
                v-model="address.value.value"
                :error-messages="address.errorMessage.value"
                label="Address"
            ></v-text-field>

            <v-select
                v-model="manager.value.value"
                :error-messages="manager.errorMessage.value"
                :items="managers"
                label="Manager"
                placeholder="Choose manager"
            ></v-select>

            <v-btn
                class="me-4"
                type="submit"
            >
                submit
            </v-btn>

            <v-btn @click="handleReset">
                clear
            </v-btn>
        </form>
    </v-container>

</template>

<style scoped lang="sass">

</style>
