<template>
  <div class="login">
    <form>
      <div class="group-inputs">
        <label for="">Email</label>
        <input type="text">
      </div>
      <div class="group-inputs">
        <label for="">Password</label>
        <input type="password">
      </div>
      <button @click="login">Login</button>
      <button @click="logoutBtn">Logout</button>

      {{ user }}
    </form>
  </div>
</template>
  
<script setup>
// @ is an alias to /src
import { onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
const { loginWithRedirect, user, logout, isAuthenticated } = useAuth0();

const { getAccessTokenSilently } = useAuth0();
const login = () => {
  const token = getAccessTokenSilently();
  window.localStorage.setItem('token', token);
  loginWithRedirect();
  user,
    isAuthenticated
};
onMounted(()=>{
  doSomethingWithToken()
})


function doSomethingWithToken() {
  const token = getAccessTokenSilently();
  // const response = await fetch('https://api.example.com/posts', {
  //           headers: {
  //             Authorization: 'Bearer ' + token
  //           }
  //         });
  //         const data = await response.json();
  console.log(token, 'token')
}

const logoutBtn = () => {
  localStorage.removeItem("token");
  logout({ logoutParams: { returnTo: window.location.origin } });
}








</script>
  