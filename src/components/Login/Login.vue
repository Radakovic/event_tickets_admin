<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        email (value) {
            if (/^[a-zA-Z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

            return 'Must be a valid e-mail.'
        },
        password (value) {
            if (value?.length >= 3) return true

            return 'Password needs to be at least 3 characters.'
        },
    },
})

const email = useField('email')
const password = useField('password')

const submit = handleSubmit(values => {
    store.dispatch('login/login', {
        username: values.email,
        password: values.password,
    }).then(() => {
        // const user = store.getters['login/user']
        // if (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_MANAGER')) {
        //     console.log('LocalStorage: ', localStorage)
        //     console.log('Store: ', store)
        //     router.push({
        //         name: 'organizer'
        //     })
        // } else {
        //     store.dispatch('logout/logout')
        //     handleReset()
        // }
        if (JSON.parse(localStorage.isManager) === true) {
            router.push({
                name: 'organizer'
            })
        } else {
            store.dispatch('logout/logout')
            handleReset()
        }
    })
})
</script>

<template>
    <v-container>
        <form @submit.prevent="submit">
            <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                label="Email"
            ></v-text-field>

            <v-text-field
                v-model="password.value.value"
                label="Password"
                :error-messages="password.errorMessage.value"
                type="password"
            ></v-text-field>

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
