<template>
    <h1>User dash</h1>

    <table>
  <thead>
        <tr>
          <th>Fname</th>
          <th>Lname</th>
          <th>Email</th>
          <th>Dob</th>
          <th>Gender</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.allUserData">
          <td>{{item.fname}}</td>
          <td>{{item.lname}}</td>
          <td>{{item.email}}</td>
          <td>{{item.dob}}</td>
          <td>{{item.gender}}</td>
          <td>{{item.address}}</td>
          <td>
            <button @click='toggleEdit(item)'>Edit</button>
            <button >Show</button>
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

const fetchPeople = async () => {
    try {
        let response =  await axios.get('users', {

        });
        if (response) {
            store.allUserData = response.data;
        } else {
            toast.error('Something Went Wrong');
        }

    } catch (error) {
        toast.error('Failed to fetch user data');
    }
};

fetchPeople()

const deleteUser = async (item) => {
    try {
        let response = await axios('users/'+item.userId, {
            method: 'delete',
            body: {
                'email': item.email,
            },
        });
        if (response) {
            toast.success('User Deleted');
        } else {
            toast.error('Something Went Wrong');
        }
    } catch (error) {
        toast.error(error.response.data);
    }
    fetchPeople()
};

const toggleEdit = (item) => {
    store.selecTedUser =item
    router.push('/oof');
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