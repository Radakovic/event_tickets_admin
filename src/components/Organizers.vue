<script setup lang="ts">
  import {ref, onMounted} from 'vue';
  import axios from "axios";

  interface Item {
    id: string;
    name: string;
    city: string;
    address: string;
    link: string;
  }

  const items = ref<Item[]>([])
  const headers = [
    { title: 'Name', key: 'name', sortable: true },
    { title: 'City', key: 'city', sortable: true },
    { title: 'Address', key: 'address', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false },
  ]

  onMounted(() => {
    axios.get('/organizers')
        .then(response => parseResponse(response.data))
        .catch(error => {
          console.error('Error fetching organizers:', error);
        });
  })

  function parseResponse(data: any) {
    for (let item of data.member) {
      let organizer = {
        id: item.id,
        address: item.address,
        city: item.city,
        name: item.name,
        link: '/organizers/' + item.id
      }
      items.value.push(organizer)
    }
  }

  function navigateToLink(link: string) {
    window.location.href = link;
  }

  function editItem(item: Item) {
    console.log(item.id);
  }

  function deleteItem(item: Item) {
    axios.delete('/organizers/' + item.id)
        .then(response => console.log(response.data))
        .catch(error => {
          console.error('Error fetching organizers:', error);
        });
    console.log(item.id);
  }
  // export default defineComponent({
  //   name: 'OrganizersView',
  //   mounted() {
  //     axios.get('events')
  //         .then(response => console.log(response.data))
  //     // axios.post('/organizers', {
  //     //   name: 'Fred',
  //     //   city: 'Flintstone',
  //     //   address: 'Mite Balije 8',
  //     //   manager: '/api/users/168c2f5a-e6b5-4a16-b27b-ec360f04c5c6'
  //     // })
  //     //     .then(function (response) {
  //     //       console.log(response);
  //     //     })
  //     //     .catch(function (error) {
  //     //       console.log(error);
  //     //     });
  //   },
  //   methods: {
  //     goToAbout() {
  //       this.$router.push('/about')
  //     },
  //   },
</script>

<template>
  <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Organizers</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
<!--        <v-dialog-->
<!--            v-model="dialog"-->
<!--            max-width="500px"-->
<!--        >-->
        <v-dialog
            max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
                class="mb-2"
                color="primary"
                dark
                v-bind="props"
            >
              New Item
            </v-btn>
          </template>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td @click="navigateToLink(item.link)" style="cursor: pointer;" class="text-cyan">{{ item.name }}</td>
        <td>{{ item.city }}</td>
        <td>{{ item.address }}</td>
        <td>
          <v-icon
              class="me-2 text-cyan"
              size="small"
              @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              class="me-2 text-red-accent-1"
              size="small"
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<style scoped lang="sass">

</style>
