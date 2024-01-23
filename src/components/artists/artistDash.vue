<template>
    <h1>Artist dash</h1>

    <table>
  <thead>
        <tr>
          <th>Fname</th>
          <th>Lname</th>
          <th>Email</th>
          <th>Dob</th>
          <th>Album Count</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.allUserData">
          <td>{{item.fname}}</td>
          <td>{{item.lname}}</td>
          <td>{{item.email}}</td>
          <td>{{item.dob}}</td>
          <td>{{item.count}}</td>
          <td>
            <button @click='showSongs(item)'>Songs</button>
            <button @click='toggleEdit(item)'>Edit</button>
            <button @click='deleteUser(item)'>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script setup>
import { userDataStore } from '/src/storeState/userData.js';
import axios from "./../../axios";
import { toast } from 'vue3-toastify';
import { ref, computed } from 'vue'
import 'vue3-toastify/dist/index.css';
import { useRouter } from 'vue-router';
const router = useRouter();

const store = userDataStore();

const selectedRow = ref(null);

const fetchArtist = async () => {
    try {
        let response =  await axios.get('users/'+store.userData.userId, {

        });
        if (response) {
            store.allUserData = response.data;
        } else {
            toast.error('Something Went Wrong');
        }

    } catch (error) {
        toast.error('Failed to fetch artist data');
    }
};

fetchArtist()

const deleteUser = async (item) => {
    try {
        let response = await axios('users/'+item.userId, {
            method: 'delete',
            body: {
                'email': item.email,
            },
        });
        if (response) {
            toast.success('Artist Deleted');
        } else {
            toast.error('Something Went Wrong');
        }
    } catch (error) {
        toast.error(error.response.data);
    }
    fetchArtist()
};

const updateUser = async () => {
    const submit_data = {
        id: selectedRow.value.id,
        fname: selectedRow.value.fname,
        lname: selectedRow.value.lname,
        email: selectedRow.value.email,
        phone: selectedRow.value.phone,
        gender: selectedRow.value.gender,
        date_of_birth: selectedRow.value.date_of_birth,
        address: selectedRow.value.address,
    }
    try {
        const { data } = await useApi('updateUser', {
            method: 'PUT',
            body: submit_data
            ,
        });

        if (data.value) {
            toast.success('User Updated.');
            isOpen.value = false;
        } else {
            toast.error('Something Went Wrong');
        }
    } catch (error) {
        console.error(error);
        toast.error('Failed to fetch user data');
    }
};

const items = (row) =>
    [
        [
            {
                label: 'Edit',
                icon: 'i-heroicons-pencil-square-20-solid',
                click: () => toggleEdit(row)
                //isOpen.value = true,
            },
        ],
        [{ label: 'Delete', icon: 'i-heroicons-trash-20-solid', click: () => deleteRow(row) }],
    ];

const showSongs = (item) => {
    store.selecTedUser =item
    store.artistId = item.userId
    router.push("/musicDash")
};

const toggleEdit = (item) => {
    store.selecTedUser =item

};

const deleteRow = (row) => {
    isOpen1.value = true;
    store.selectedRow.value = row;
};


const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1 // months are 0-indexed
    const day = today.getDate()

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}
</script>

<style scoped>

  table,td,th{
    border:1px solid red;
    display:flex horizontal;
    padding:10px ;
    border-collapse: collapse;
    }

  .action{
    display:flex horizontal;
  }

</style>

