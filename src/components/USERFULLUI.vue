<template>
	<div class="container">
		<div class="row">
			<div class="popup-div add-food">
				<!-- v-bind:class="BoxAnimation" v-bind:class="BoxAnimation" v-if="showthebox" -->
				<p class="div-header">
					<span> Add a new food item </span>
					<span style="float: right;">
						<button type="button" class="btn btn-sm btn-danger" style="border-radius: 50%; position: relative; top: -7px; left: 10px;">
							<i class="glyphicon glyphicon-remove" style="font-size:15px; margin: 5px 1px 3px 0;"></i>
						</button>
					</span>
				</p>
				<div class="form-div">
					<form>
						<div class="form-controls-div">
							<label>Food Name</label>
							<input type="text" v-model="food_name" v-on:click="hide_errors" class="form-control">
							<p class="error-msg">{{name_error}}&nbsp</p>
						</div>
						<div class="form-controls-div">
							<label>Price</label>
							<input type="number" v-model="food_price" v-on:click="hide_errors" class="form-control">
							<p class="error-msg">{{price_error}}&nbsp</p>
						</div>
						<button type="button" class="btnRefresh " v-on:click="clear_text_box">
							<img src="../assets/reload.png" width="30px;">
						</button>

						<button type="button" class="btn-submit" v-on:click="validate_food_data">Submit</button>
					</form>
				</div>
			</div>

			<!-- <div class="popup-div update-password">
				<div>
					<p class="div-header">
						Change Password
					</p>
					<div class="form-div">
						<form>
							<div class="form-controls-div">
								<label>New Password</label>
								<input type="password" v-model="new_password" class="form-control" v-on:click="hide_error_password">
							</div>
							<div class="form-controls-div">
								<label>Confirm Password</label>
								<input type="password" v-model="confirm_password" class="form-control" v-on:click="hide_error_password">
							</div>
							<div width="100%">
								<p v-bind:class="" class="error-msg" style="float:left;">{{password_error}}</p>

								<button type="button" class="btnRefresh " v-on:click="">
									<img src="../assets/reload.png" width="30px;">
								</button>
							</div>
							<button class="btn-submit" v-on:click="">Submit</button>
						</form>
					</div>
				</div>
			</div> -->

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
				//Food Input button Bind Controls & Error Texts
				food_name: '',
				food_price: '',
				name_error: '',
				price_error: '',

				new_password: '',
				confirm_password: '',
				password_error: 'Password error'
			}
		},
		methods: {
			validate_food_data: function(){
				if(this.food_name == '' || this.food_price == ''){
					if(this.food_name == '')
						this.name_error = 'Please enter full name.'
					if(this.food_price == '')
						this.price_error = 'Please enter price.'
				}
				else if(this.food_name == 'momo'){
					return this.name_error= 'Food already exists.';
				}
				else {
					this.store_food_data();
				}
			},
			store_food_data: function(){
				//Store query goes here.
				alert('jdsakldjsakldjas');
			},
			hide_errors: function(){
				this.name_error= '';
				this.price_error= '';
			},
			clear_text_box: function(){
				this.food_name= '';
				this.food_price= '';
				this.hide_errors();
			},

			//For Password Box 
			hide_error_password: function(){
				this.password_error = '';
			}
		}
	}
</script>

<style type="text/css">
	body{
		font-family: Arial;
	}
	.logout-box{
		z-index: 7;
		position: absolute;
		width: 250px;
		height: 140px;
		background-color: rgb(0, 0, 0, 0.9);
		color: white;
		border: 2px solid #e6e6e6;
		border-radius: 10px;
		padding: 10px;
		top: 15%;
		left: 40%;
	}
	.popup-div{
		z-index: 5;
		background-color:rgb(62, 0, 111);
		color: white;
		position: absolute;
		width: 360px;
		top:15%;
		/*border: 4px solid #5100af;*/
		box-shadow: 3px 6px 8px #888888;
		padding: 10px;
		border-radius: 10px;
	}
	.add-food{
		left:37%;
	}
	.update-password{
		left: 30%;
	}
	.div-header{
		font-size:25px; 
		font-weight:600; 
		padding:5px 10px; 
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
		color: white;
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


<!-- 							<span class="form-controls-div">
								<label>Upload a Picture</label>
								<input type="file" v-bind="food_imageUrl" id="image_food">
								<p v-bind:class="" class="error-msg">{{file_error}}&nbsp</p>
							</span> -->



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