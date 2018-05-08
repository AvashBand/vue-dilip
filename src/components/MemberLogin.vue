<template>
	<div>
		<div class="splash-container">
			<div class="home-splash">
				<img class="home-splash" src="../assets/HomeSplash.gif">
			</div>
		</div>
		<div id="loginbox">
			<img src="../assets/loginAvatar.png" class="avatar">
			<h1 style="font-weight:600; margin-bottom:20px; color:#b30059;">Login Here</h1>
			<div>
				<p>Username</p>
				<input type="text" id="txtUsername" value="" autocomplete="off" placeholder="Enter Username" v-on:click="hideErrors" v-on:keyup.enter="GetChar(event)"  v-model="Username">
				<br>
				<p class="errorMsg">{{ username_error }}</p>
				<p>Password</p>

				<input type="password" id="txtPassword" placeholder="Enter Password" v-on:click="hideErrors" v-on:keyup.enter="GetChar(event)" v-model="Password">
				<p class="errorMsg">{{ password_error }}</p>

				<div width="100%" style="margin-top: 20px; margin-bottom: 30px;">
					<p class="errorMsg" style="float:left;">{{ username_and_password_Error }}</p>

					<button type="button" class="btnRefresh " v-on:click="ClearTextBox">
						<img src="../assets/reload.png" width="30px;">
					</button>
				</div>
				<br>
				<button class="btnSubmit" v-on:click="LoginValidation">Log In</button>
				<br/>
				<br/>
				<a href="#">Forgot your Password?</a><br>
				 <router-link to="/reg" exact>
				 	<a>Create a new Account</a>
				 </router-link>
				
				<br>
			</div>	
		</div>

		<div class="popup-div-wrapper"  v-bind:class="{showBoxAndBoxAnimation:bool_show_login_error_popup}">
			<div class="delete-box">
				<div class="delete-message">
					<p style="margin-bottom: 10px; font-size: 18px; font-weight: 600;"> {{ login_error_message }} </p>
				</div>
				<div style="display: flex; align-items: center; justify-content: center;">
					<button v-on:click="hide_login_error_popup" class="btn btn-danger" style="margin-right: 10px; width: 100px;">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">

import axios from 'axios'
import qs from 'qs'

	export default{
		components: {

		},
		data(){
			return{
				Username: "",
				Password: "",
				token : "",

				username_error: '',
				password_error : '',
				username_and_password_Error : '',

				login_error_message : '',
				bool_show_login_error_popup: false

			}
		},
		
		methods:{
			LoginValidation : function(){
				var Uname = this.Username;
				var Pword = this.Password;
				if(Uname == "" || Pword == ""){
					if(Uname == "")
						this.username_error = 'Please Enter Username';
					if(Pword == "")
						this.password_error = 'Please Enter Password';
				}
				else{
					const data = {
						username: Uname,
						password : Pword
					}
					axios({
						method: 'post',
						url: 'http://localhost:3000/members/login',
						data: data,
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json'
						}
					}).then((response) => {
						console.log(response.data);
						if(!response.data){
							this.show_login_error_popup("Username or password error");
							return;
						} 
						//Normal User access
						if(response.data.member_data.is_active == true){
							localStorage.setItem('token', response.data.x_auth);
							localStorage.setItem('username', response.data.member_data.username);
							localStorage.setItem('full_name', response.data.member_data.name);
							localStorage.setItem('is_active', response.data.member_data.is_active);
							localStorage.setItem('is_admin', response.data.member_data.is_admin);
							//Admin Access
							if(response.data.member_data.is_admin == true){
								this.$router.push('/usertable');
								return;
							} 
							this.$router.push('/order');
						} else{
							this.show_login_error_popup("Your ID hasn't been approved by admin yet. Sorry for the inconvenience.");
						}

					}).catch((e) => {
						this.show_login_error_popup("Server error. Please try again later.");
					});
				}
			},	
			show_login_error_popup: function(error_msg){
				this.login_error_message = error_msg;
				this.bool_show_login_error_popup = true;
			},
			hide_login_error_popup: function(){
				this.bool_show_login_error_popup = false;
			},

			afterValidated: function(){
				alert('sample');
				
			},

			hideErrors: function(){
				this.username_error = '';
				this.password_error = '';
				this.username_and_password_Error = '';
			},
			GetChar : function(e){

			},
			ClearTextBox : function(){
				this.User.Username = "";
				this.User.Password = "";
				this.hideErrors();
			}
		}
	}
</script>

<style scoped>
	.splash-container{
		background-color: rgb(255, 0, 64, 0.1);
		float: right;
		width: 65%;
		height: 662px;
		z-index: 5;
	}
	.home-splash{
		position: fixed;
		top:-50px;
		left: 35%;
		min-width: 80%;
		z-index: -1;
	}
	#loginbox{
		width: 320px;
		height: 500px;	
		background: rgba(255, 255, 255, 0.8);	
		color: #000;
		top: 50%;
		left: 17%;
		position: absolute;
		transform: translate(-50%, -50%);
		padding: 90px 20px;
		border-radius: 10px;
		box-shadow: 3px 6px 8px #888888;
	}

	.avatar{
		width: 120px;
		height: 120px;
		border-radius: 50%;
		position: absolute;
		top: -60px;
		left: calc(50% - 50px);
	}

	h1{
		margin: 0px;
		padding: 0px;
		text-align: center;
		font-size: 22px;
		margin-bottom: 10px;
	}

	#loginbox p{
		margin: 0px;
		padding: 0px;
		font-weight: bold;
	}
	#loginbox input{
		width: 100%;
		margin-bottom: 20px;
	}

	#loginbox input[type="text"], input[type="password"]{
		border: none;
		border-bottom: 1px solid #000;
		background : transparent;
		outline: none;
		height: 40px;
		color: #000;
		font-size: 16px;
	}
	.btnSubmit{
		border: none;
		outline: none;
		height: 40px;
		background-color: #e6005c;
		color: #fff;
		font-size: 17px;
		border-radius: 30px;
		width: 100%;
	}

	.btnSubmit:hover{
		cursor: pointer;
		background: #ffc107;
		color: #000;
	}

	#loginbox a{
		text-decoration: none;
		font-size: 12px;
		line-height: 25px;
		color: green;
		font-weight:600;
	}
	#loginbox a:hover{
		color: #ffc107;
	}

	.errorMsg{
		text-align: right;
		color: red;
		font-size: 12px;
		line-height: 0px;
	}

	.UsernameError{
		visibility: visible;
	}
	.PasswordError{
		visibility: visible;
	}
	.UsernameAndPasswordError{
		text-align: left;
		line-height: 20px;
		visibility: visible;
	}

	.btnRefresh{
	    background-color: transparent;
	    border: none;
	    color: white;
	    padding: 5px;
	    font-size:18px;
	    cursor: pointer;
	    background-repeat: no-repeat;
	    float: right;
	    margin-bottom: 10px;
	}
	.btnRefresh:hover {
	    background-color: rgb(199, 191, 191, 0.3);
	    border-radius: 50%;
	}

	.popup-div-wrapper{
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		background-color: #0000008c;
		height: 100%;
		width: 100%;
		visibility: hidden;
	}
	.delete-box{
		text-align: center;
		z-index: 7;
		position: absolute;
		width: 290px;
		/*height: 140px;*/
		background-color: rgb(0, 0, 0, 0.9);
		color: white;
		border: 2px solid #e6e6e6;
		border-radius: 10px;
		padding: 15px;
		top:  37%;
		left: 41%;
	}
	.showBoxAndBoxAnimation{
		visibility: visible;
		animation: shake 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;
	}
	@keyframes shake {
		0% { opacity: 0 }
		100% {opacity : 1}
	}
</style>

<!-- 
.then( (response) => {
						console.log(response);
						localStorage.setItem('token', response.data.access_token);
						localStorage.setItem('expiration', response.data.expires_in + Date.now());
						axios({
							method: 'get',
							url: 'http://foods.test/api/user',
							data: data,
							headers: {
								'Content-Type' : 'application/json',
								'Accept' : 'application/json',
								'Authorization' : 'Bearer ' + response.data.access_token,
							}
						}).then((response) => {
							if(!response.data){
								alert('User not found');
								return;
							}
							localStorage.setItem('name', response.data.name);
							localStorage.setItem('username', response.data.username);
							localStorage.setItem('is_active', response.data.is_active);
							localStorage.setItem('is_admin', response.data.is_admin);

							if (localStorage.getItem('is_active') != null && localStorage.getItem('is_active') == 0){
								this.show_login_error_popup();
								return;
							}									
							if (localStorage.getItem('is_admin') != null && localStorage.getItem('is_admin') != 0){
								this.$router.push('/usertable');
								return;
							}

							this.$router.push('/fullui');
						}
					).catch((e) => { }) -->