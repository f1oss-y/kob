<template>
  <NavBar></NavBar>
  <router-view></router-view>
</template>

<script>
import NavBar from './components/NavBar.vue';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"

export default{
  components:{
    NavBar
  },
  setup(){
/*    
    $.ajax({
      url:"http://127.0.0.1:3000/user/account/token/",
      type:"post",
      data:{
        username:"a",
        password:"pa",
      },
      success(resp){
        console.log(resp);
      },
      error(resp){
        console.log(resp);
      }
    });
    $.ajax({
      url:"http://127.0.0.1:3000/user/account/info/",
      type:"get",
      headers:{
        Authorization:"Bearer "+"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhNGMxNzg3MTVhNWU0MmRkYTEyOWY0M2M2MGRiZjNlOCIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTcwMjAzOTI1NiwiZXhwIjoxNzAzMjQ4ODU2fQ.TLRMc4kUzQ6rkv54kbGLL9rdpVELV9dVYbVxYqJbha4",
      },
      success(resp){
        console.log(resp);
      },
      error(resp){
        console.log(resp);
      }
    });
    $.ajax({
      url:"http://127.0.0.1:3000/user/account/register/",
      type:"post",
      data:{
        username:"a",
        password:"pa",
        confirmedPassword:"pa",
      },
      success(resp){
        console.log(resp);
      },
      error(resp){
        console.log(resp);
      }
    })
*/
  }
}
</script>

<style>
body{
  background-image:url("@/assets/images/background.png");
  background-size:cover;
}
</style>
