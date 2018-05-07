<template>
	<div class="container">
		<div class="row">
			<div class="popup-div add-food">
				<!-- v-bind:class="BoxAnimation" v-bind:class="BoxAnimation" v-if="showthebox" -->
				<div class="w3-center">
					<p class="div-header">
						Add New Food Products
					</p>
					<div class="form-div">
						<form>
							<div class="form-controls-div">
								<label>Food Name</label>
								<input type="text" v-bind="food_name" class="form-control">
								<p v-bind:class="" class="error-msg">{{name_error}}&nbsp</p>
							</div>
							<div class="form-controls-div">
								<label>Price</label>
								<input type="text" v-bind="food_price" class="form-control">
								<p v-bind:class="" class="error-msg">{{price_error}}&nbsp</p>
							</div>
							<span class="form-controls-div">
								<label>Upload a Picture</label>
								<input type="file" v-bind="food_imageUrl" id="image_food">
								<p v-bind:class="" class="error-msg">{{file_error}}&nbsp</p>
								<!-- <img class="image-box"/> -->
							</span>
							<button type="button" class="btnRefresh " v-on:click="">
								<img src="../assets/reload.png" width="30px;">
							</button>
							<button class="btn-submit" v-on:click="">Submit</button>
						</form>
					</div>
				</div>
			</div>

			<div class="popup-div update-password">
				<!-- v-bind:class="BoxAnimation" v-bind:class="BoxAnimation" v-if="showthebox" -->
				<div class="w3-center">
					<p class="div-header">
						Change Password
					</p>
					<div class="form-div">
						<form>
							<div class="form-controls-div">
								<label>New Password</label>
								<input type="password" class="form-control" id="text_new_password">
							</div>
							<div class="form-controls-div">
								<label>Confirm Password</label>
								<input type="password" class="form-control" id="text_confirm_password">
							</div>
							<div width="100%">
								<p v-bind:class="" class="error-msg" style="float:left;">Username or Password Error</p>

								<button type="button" class="btnRefresh " v-on:click="">
									<img src="../assets/reload.png" width="30px;">
								</button>
							</div>
							<button class="btn-submit" v-on:click="">Submit</button>
						</form>
					</div>
				</div>
			</div>

			<div class="logout-box">
				<div class="logout-message">
					<p style="text-align: center; margin-bottom: 20px; font-size: 18px; font-weight: 600;">Are you sure you want to delete user?</p>
				</div>
				<div style="display: flex; align-items: center; justify-content: center;">
					<button class="btn btn-primary btn-lg" style="margin-right: 10px; width: 100px;" v-on:click="navigate">Confirm</button>
					<button class="btn btn-danger btn-lg" style="width: 100px;" v-on:click="">Cancel</button>
				</div>
			</div>	
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				//Error Texts
				name_error: 'Food name error',
				price_error: 'Food price error',
				file_error: 'file size too large'

				//Food Input button Bind Controls
				food_name: '',
				food_price: '',
				food_imageUrl: ''
			}
		}
		methods: {
			validate_food_data: function(){
				if(this.food_name == '' || this.food_price == '' || this.food_imageUrl == ''){
					if(this.food_name == '')
						this.name_error = 'Please enter full name.'
					if(this.food_price == '')
						this.name_price = 'Please enter price.'
					if(this.food_imageUrl == '')
						
				}
			},
			store_food_data: function(){

			}
		}
	}
</script>

<style type="text/css">
	body{
		font-family: Arial;
	}
	.logout-box{
		z-index: 1;
		position: absolute;
		width: 250px;
		height: 140px;
		background-color: rgb(0, 0, 0, 0.9);
		color: white;
		border: 2px solid #e6e6e6;
		border-radius: 10px;
		padding: 10px;
		top: 2%;
		left: 60%;
		/*visibility: hidden;*/
	}
	.image-box{
		height: 100px;
		width:100px;
		background-color: green;
		float: right;
	}
	.popup-div{
		background-color:rgb(62, 0, 111);
		color: white;
		position: absolute;
		width: 360px;
		top:2%;
		/*border: 4px solid #5100af;*/
		box-shadow: 3px 6px 8px #888888;
		padding: 10px;
		border-radius: 10px;
	}
	.add-food{
		left:1%;
	}
	.update-password{
		left: 30%;
	}
	.div-header{
		font-size:25px; 
		font-weight:600; 
		padding:5px 0; 
		margin:0;
	}	
	.form-div{
		padding: 10px 20px 20px 20px;
		border-radius: 7px;
		background-color: rgb(45, 1, 80);
	}
	.form-controls-div{
		margin-top: 5px;
	}
	.form-control{
		border-radius: 0px;
		background-color: transparent;
		font-size: 16px;
		outline: none;
	}
	.form-control:focus, .form-control:active{
	     color: white; 
	     background-color: transparent; 
	     /*border-color: #80bdff; */
	     outline: 0; 
	     box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25); 
	}
	.btn-submit{
		border: none;
		outline: none;
		height: 40px;
		background-color: #e6005c;
		color: #fff;
		font-size: 17px;
		border-radius: 30px;
		width: 100%;
	}

	.btn-submit:hover{
		cursor: pointer;
		background: #ffc107;
		color: #000;
	}
	.btnRefresh{
		margin-top: 10px;
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
	.error-msg{
		text-align: right;
		color: red;
		font-size: 12px;
		line-height: 15px;
		margin-top: 5px;
		margin-bottom: 0px; 
		/*visibility: hidden;*/
	}
</style>






<!-- <template>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<h2>Test Form</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">ID</div>
			<div class="col-md-8"></div>
		</div>
		<div class="row">
			<div class="col-md-4">Name</div>
			<div class="col-md-8"></div>
		</div>
		<div class="row">
			<div class="col-md-4">Post</div>
			<div class="col-md-8"></div>
		</div>
		<div class="row">
			<div class="col-md-4">Salary</div>
			<div class="col-md-8"></div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				showthebox : false,
				BoxAnimation : ''
			}
		},
		methods: {
			Show :function(){
				this.showthebox = true;
				this.BoxAnimation = 'w3-animate-zoom';
			}
		}
	}
</script>
<style>
	body{
		background-color: grey;
	}
	.container{
		background-color: #e6e6e6;
	}
</style> -->