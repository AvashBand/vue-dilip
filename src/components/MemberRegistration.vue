<template>
	<div>
		<div class="splash-container">
			<div class="home-splash">
				<img class="home-splash" src="../assets/HomeSplash.gif">
			</div>
		</div>
	
	<!-- Info -->
		<div class="SignUpBox">
			<div class="SignUpInfo">
				<h2>Member Registration</h2>
			</div>
			<div class="FormElements">

				<p class="FormLabel">Full Name</p>
				<input v-model="Fullname" v-on:click="hideErrors" type="text"  id="txtFullName" placeholder="Type your full name" required/>
				<p id="EmailError" class="errorMsg">&nbsp{{ FullNameErrorMessage }}</p>

				<p class="FormLabel">Username</p>	
				<input v-model="Username" v-on:click="hideErrors" type="text" id="txtUsername" placeholder="Type your Username" required/>
				<p id="UsernameError" class="errorMsg">&nbsp{{ UserNameErrorMessage }}</p>

				<p class="FormLabel">Password</p>
				<input v-model="NewPassword" v-on:click="hideErrors" type="password" id="txtPassword" placeholder="Enter a new Password" style="margin-bottom:20px;" required/>

				<input v-model="ConfirmPassword" v-on:click="hideErrors" type="password" id="txtPassword" placeholder="Confirm Password" required/>
				<p style="margin-bottom:0px;" id="PasswordError" class="errorMsg">&nbsp{{ PasswordErrorMessage }}</p>

				<div>
					<button type="button" class="btnRefresh" v-on:click="ClearTextBox">
						<img src="../assets/reload.png" width="30px;">
					</button>
				</div>
				<div>
					<p class="Policy" style="margin-left:5px; margin-top:40px;">
						By creating an account you agree to our 
						<a href="#">Terms</a> 
						& 
						<a href="#">Privacy Policy.</a>
					</p>
				</div>

				<button class="btnSubmit" style="width:100%;" v-on:click="Registration"> Create Account</button>

				<p class="Policy" style="color: #666; text-align: center;">
					<br/>
					Already a Member? 
					<router-link to="/" exact>
					 	<a style="color: #00b5e2; font-size: 16px">Log In</a>
					 </router-link>
					
				</p>

			</div>
		</div>

		<div class="popup-div-wrapper" v-bind:class="{showBoxAndBoxAnimation:bool_show_registration_successful_popup}">
			<div class="registration-successful-box" v-bind:class="RegistrationBoxAnimation">
				<div class="w3-center">
					<p style="font-size:30px; font-weight:600; padding:5px 0; margin:0;">Registration Successful <i style="margin-left:10px;" class="glyphicon glyphicon-thumbs-up"></i></p>
					<div style="background-color: rgb(210, 3, 98); padding:10px; width:500px; margin: 0 auto; border-radius:10px;">
						<p style="font-weight:600; font-size:13px; margin-bottom:8px;">But first</p>
						<p style="font-weight:600;">Your account has to be approved by admin in order to login.</p>
						<router-link to="/" exact > <button  class="btn btn-light"> Go to Login </button> </router-link>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	export default{
		data(){
			return{
				Fullname: "",
				Username: "",
				NewPassword: "",
				ConfirmPassword: "",

				FullNameErrorMessage : '',
				UserNameErrorMessage : '',
				PasswordErrorMessage : '',

				bool_show_registration_successful_popup: false,
				RegistrationBoxAnimation: ''
			}
		},
			methods:{
				Registration : function(){
					if(this.Fullname == "" || this.Username == "" || this.NewPassword == "" || this.ConfirmPassword == ""){
						if(this.Fullname == "")
							this.FullNameErrorMessage = 'Full name cannot be empty.';			
						if(this.Username == "")
							this.UserNameErrorMessage = 'Username cannot be empty.';
						if(this.NewPassword == "" || this.ConfirmPassword == "")
							this.PasswordErrorMessage ='Passwords fields cannot be empty.';
					}
					else{
						if(this.Username.length < 5){
							this.FullNameErrorMessage = 'Fullname too short.';
						}
						if(this.Username.length < 5){
							this.UserNameErrorMessage = 'Username cannot be less than 5 characters.';
						}
						if(this.NewPassword != this.ConfirmPassword){
							this.PasswordErrorMessage ='The passwords did not match.'
							return;
						}
						if(this.NewPassword < 6 && this.ConfirmPassword < 6){
							this.PasswordErrorMessage ='Password must be at least 6 characters.'
						}
						else{
							axios({
								method: 'get',
								url: 'http://localhost:3000/members/' + this.Username,
								headers:{
									'Content-Type' : 'application/json',
									'Accept' : 'application/json',
								}
							}).then((response) => {	
								if(!response.data){
									const data = {
										"name": this.Fullname,
										"username" : this.Username,
										"password" : this.ConfirmPassword
									}
									axios({
										method: 'post',
										url: 'http://localhost:3000/members',
										data : data,
										headers: {
											'Content-Type': 'application/json',
											'Accept': 'application/json',
										},

									}).then(
										respose => {
											this.ShowRegistrationBox();
										}
									);
								}
								else {
									this.UserNameErrorMessage = 'Username already exists.';
								}
							}).catch((error) => {
								console.log(error);
							});
						}
					}
				},
				hideErrors: function(){
					this.FullNameErrorMessage = '';
					this.UserNameErrorMessage = '';
					this.PasswordErrorMessage = '';
				},
				GetChar : function(e){

				},
				ClearTextBox : function(){
					this.Fullname = "";
					this.Username = "";
					this.Password = "";
					this.NewPassword = "";
					this.ConfirmPassword = "";
					this.hideErrors();
				},
				ShowRegistrationBox :function(){
					this.bool_show_registration_successful_popup = true;
					this.RegistrationBoxAnimation = 'w3-animate-zoom';
				}
			}
		}
</script>

<style scoped>
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
	label{
		font-weight: normal;
	}
	.delete-box{
		z-index: 7;
		position: absolute;
		width: 250px;
		height: 140px;
		background-color: rgb(0, 0, 0, 0.9);
		color: white;
		border: 2px solid #e6e6e6;
		border-radius: 10px;
		padding: 10px;
		top:  37%;
		left: 41%;
	}
	p{
		margin-bottom: 5px;
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
	.SignUpBox{
		height: auto;
		width: 350px;
		border: 1px solid #e6e6e6;
		border-radius: 20px;
		background-color: #fff;
		top: 50%;
		left: 17%;
		position: absolute;
		transform: translate(-50%, -50%);
		box-shadow: 3px 6px 8px #888888;	
		padding-bottom: 20px;		
	}
	.SignUpInfo{
		margin: 20px 0px 10px 0px;
		
		padding: 15px;
	}
	.SignUpInfo h2{
		color: rgb(179, 0, 89);
		margin: 0;
		font-size: 18pt;
		font-weight: 600;
		text-align: center;
	}
	.FormElements{
		padding: 30px 30px 0px 30px;
		padding-top: 20px;
	}
	.FormLabel{
		/*padding-top: 20px;*/
		font-weight: bold;
		line-height: 10px;

	}
	.FormElements input[type="text"], input[type="password"]{
		border: none;
		width: 100%;
		border-bottom: 1px solid #000;
		background : transparent;
		outline: none;
		height: 30px;
		color: #000;
		font-size: 14px;
	}
	.FormElements p a{
		color: green;;
		font-weight: 600;
		text-decoration: none;
	}
	.Policy{
		font-weight: 600;
		text-align: justify;
		font-size: 16px;
		padding-bottom: 10px; 
		/*padding: 0px 20px 0px 20px;*/
	}
	.FormElements p a:hover{
		color: #ffc107;;
	}
	.btnSubmit{
		border: none;
		outline: none;
		height: 40px;
		background-color: #149632;
		color: #fff;
		border-radius: 30px;
		font-weight: 600;
		font-size: 16px;
	}
	.btnSubmit:hover{
		cursor: pointer;
		background: #ff0cb2;
		color: white;
	}
	.AccessLine{
		display: block;
		text-align: center;
		border-bottom: 1px solid #e3e3e3;
		height: 10px;
		margin-top: 1em;
		margin-bottom: 1.5em;
	}
	.AccessLine span {
	    display: inline-block;
	    padding-left: 0.5em;
	    padding-right: 0.5em;
	    background: #fff;
	}
	.errorMsg{
		/*text-align: right;*/
		color: red;
		font-size: 12px;
		line-height: 20px;
		margin: 0px;
		/*visibility: hidden;*/
		/*visibility: hidden;*/
	}
	.registration-successful-box{
		background-color:/* #da2459;*/ rgb(255, 26, 117, 0.8); 
		color: white;
		height: 190px;
		width: 530px;
		position: absolute;
		top:25%;
		left:30%;
		border-radius: 20px;
		border: 4px solid white;
		box-shadow: 3px 6px 8px #888888;
		/*visibility: hidden;*/
	}
	/*p{
		margin: 3px;
	}*/
</style>
