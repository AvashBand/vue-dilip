<template>
  <div class="container-fluid">
    <router-view></router-view>
  </div>
</template>

<script>
  import MemberLogin from './components/MemberLogin.vue'
  import MemberReg from './components/MemberRegistration.vue'
  import OrderPanel from './components/OrderPanel.vue'
 
  export default {
    components: {
      // 'Menu-Bar': MenuBar
    },
    name: 'app',
    data(){
      return{

      }
    }
  }
</script>

<style type="text/css">
  body{
    /*background-color: #f1f2f4;*/
    margin: 0;
    font-family: 'Raleway';
    font-size: 16px;
    padding : 0px;
    font-family : Raleway;
    /*background: url("./assets/background.jpg") no-repeat center center fixed; 
      background-size: cover; */
  }
  .container-fluid{
    margin : 0px;
    padding: 0px;
  }
  .row{
    margin:0px;
    padding:0px;
  }
  .btn{
    font-size: 13px;
  }
</style>