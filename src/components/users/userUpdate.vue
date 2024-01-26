<template>
  <div class="text-center p-5">
    <div class="d-flex justify-content-center">
      <form @submit.prevent="handleSubmit(this)"
        style="border: 2px solid black; border-radius: 20px; padding: 30px; background-color: white">
        <h1 class="h3 mb-3 fw-normal">User Update</h1>
        <div v-for="(field, index) in formFields" :key="index" class="form-floating">
        <input v-model="selectedRow[field.name]" :type="field.type" :id="'floating'+selectedRow.name" :name="selectedRow.name" class="form-control">
        <label :for="'floating'+field.name">{{ field.label }}:</label>
        <div v-if="errorMessages[field.name]" style="color: red;">{{ errorMessages[field.name] }}</div>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Update</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from './../../axios'
import { toast } from 'vue3-toastify'
import { userDataStore } from '/src/storeState/userData'
import { ref } from 'vue'
import 'vue3-toastify/dist/index.css'
import { useRouter } from 'vue-router'
const router = useRouter()

const store = userDataStore()
const selectedRow = ref([''])
const errorMessages = ref([''])

const formFields = [
      { name: 'fname', label: 'fname', type: 'text' },
      { name: 'lname', label: 'lname', type: 'text' },
      { name: 'email', label: 'email', type: 'text' },
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'gender', label: 'Gender', type: 'text' },
      { name: 'dob', label: 'Dob', type: 'date' },
];

selectedRow.value = store.selecTedUser

const handleSubmit = async () => {
  errorMessages.value = {};
  try {
    let response = await axios.put('users/' + selectedRow.value.userId, {
      fname: selectedRow.value.fname,
      lname: selectedRow.value.lname,
      email: selectedRow.value.email,
      phone: selectedRow.value.phone,
      gender: selectedRow.value.gender,
      date_of_birth: selectedRow.value.dob,
      address: selectedRow.value.address
    })

    if (response) {
      localStorage.setItem('token', response.data)
      store.tokem = 'jkhfdsjk2kdhkahdka'
      toast.success('User Updated Sucessfully..', {
        autoClose: 1000,
        onClose: () => {
      router.push("/userDash")
  }
      })

    } else {
      toast.error('Update Failed.', {
        autoClose: 10000
      })
    }
  } catch (error) {
    const errorData = error.response.data;

    Object.entries(errorData).forEach(([fieldName, errors]) => {
      const filteredErrors = errors.filter((error) => error !== undefined);

      const errorMessage = filteredErrors.join(', ');

      if (errorMessage.trim() !== '') {
        errorMessages.value[fieldName] = errorMessage || "";
      }
    });

  }
}
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 5px;
  font-size: 14px;
}
</style>