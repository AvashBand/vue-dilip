<template>
	<div class="container-fluid">
		<div>
			<Menu-Bar></Menu-Bar>
			<div id="PageContainer" style="visibility: visible;">
				<div>
					<div class="Dashboard">
						<span style="font-weight:bold; font-size:20pt; padding-right:10px;">
							<i class= "glyphicon glyphicon-glass" style="font-size:18px; margin:0px 20px;"></i>Food Table
						</span>		
						<span style="font-weight:600;">Admin Panel</span>
						<span style="float:right;">
							<button v-on:click="show_add_food_popup" class="btn btn-success" style="border-radius: 0px;">Add New Food</button>
						</span>	
					</div>
					<div class="ContentBox">
						<div class="table-area w3-container w3-center w3-animate-opacity">
							<table>
							    <tr>
							  		<th scope="col">SN</th>
							  	   	<th scope="col">Food Name</th>
							  	    <th scope="col">Price</th>
							  		<th scope="col">Update</th>
							  		<th scope="col">Delete</th>
							    </tr>
							    <tr>
							    	<td>1</td>
							    	<td>Momo</td>
							    	<td>Rs. 80</td>
							    	<td>
							    		<i v-on:click="show_update_food_popup" class="button-glyphicons glyphicon glyphicon-edit"></i>
							    	</td>
							    	<td>
							    		<i v-on:click="show_delete_food_popup" class="button-glyphicons glyphicon glyphicon-trash"></i>
							    	</td>
							    </tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>;
		<div style="position:static;">
			<div class="popup-div-wrapper"  v-bind:class="{showBoxAndBoxAnimation:bool_show_add_popup}">
				<div class="popup-div">
					<!-- v-bind:class="BoxAnimation" v-bind:class="BoxAnimation" v-if="showthebox" -->
					<p class="div-header">
						<span> Add a new food item </span>
						<span style="float: right;">
							<i v-on:click="hide_add_food_popup" class="glyphicon glyphicon-remove button-glyphicons" style="transition:0s; position: relative; top: -3px; left: 0px; color: #ff2d2d;"></i>
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

							<button type="button" class="btn-submit" v-on:click="validate_and_add_new_food">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>

		<div style="position:static;">
			<div class="popup-div-wrapper"  v-bind:class="{showBoxAndBoxAnimation:bool_show_update_popup}">
				<div class="popup-div">
					<!-- v-bind:class="BoxAnimation" v-bind:class="BoxAnimation" v-if="showthebox" -->
					<p class="div-header">
						<span> Update existing food item </span>
						<span style="float: right;">
							<i v-on:click="hide_update_food_popup" class="glyphicon glyphicon-remove button-glyphicons" style="transition:0s; position: relative; top: -3px; left: 0px; color: #ff2d2d;"></i>
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

							<button type="button" class="btn-submit" v-on:click="validate_and_update_food">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>

		<div class="popup-div-wrapper"  v-bind:class="{showBoxAndBoxAnimation:bool_show_delete_popup}">
			<div class="delete-box">
				<div class="delete-message">
					<p style="text-align: center; margin-bottom: 20px; font-size: 18px; font-weight: 600;">Are you sure you want to delete user?</p>
				</div>
				<div style="display: flex; align-items: center; justify-content: center;">
					<button v-on:click="delete_food" class="btn btn-primary btn-lg" style="margin-right: 10px; width: 100px;">Confirm</button>
					<button v-on:click="hide_delete_food_popup" class="btn btn-danger btn-lg" style="width: 100px;">Cancel</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				bool_show_add_popup: false,
				bool_show_update_popup: false,
				bool_show_delete_popup: false,
				food_name: '',
				food_price: '',
				name_error: '',
				price_error: ''
			}
		},
		methods: {
			//ADD
			show_add_food_popup: function(){
				this.bool_show_add_popup = true;
			},
			hide_add_food_popup: function(){
				this.bool_show_add_popup = false;
			},
			validate_and_add_new_food: function(){
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
				this.bool_show_add_popup = false;
			},

			//Update
			show_update_food_popup: function(){
				this.bool_show_update_popup = true;
			},
			hide_update_food_popup: function(){
				this.bool_show_update_popup = false;
			},
			validate_and_update_food: function(){
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

			//Delete
			show_delete_food_popup: function(){
				this.bool_show_delete_popup = true;
			},
			hide_delete_food_popup: function(){
				this.bool_show_delete_popup = false;
			},
			delete_food: function(){
				//Delete Query goes here
			},

			hide_errors: function(){
				this.name_error= '';
				this.price_error= '';
			},
			clear_text_box: function(){
				this.food_name= '';
				this.food_price= '';
				this.hide_errors();
			}
		}
	}
</script>


<style scoped>
	body{
		background-color: #ffe5ec !important;
	}
	.button-glyphicons{
		font-size: 20px;
		color: #9a9a9a;
		transition: 0.5s;
		cursor: pointer;
	}
	.glyphicon-edit:hover{
		color: blue;
	}
	.glyphicon-trash:hover{
		color: red;
	}
	.glyphicon-remove:hover{
		color: rgb(206, 6, 124) !important;
	}
	.container-fluid{
		margin: 0px;
		padding: 0px;
		background-color: #ffe5ec;
	}
	#PageContainer{
		background-color: white;
		/*left: calc(238px);*/
		padding: 15px;
		width: 98%;
		margin: 60px 10px -11px 10px;
		/*background-color: green;*/
		/*width: calc(100% - 250px);*/
	}
	.ContentBox{
		min-height: 520px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		/*background-color: #f4f4f4;*/
		padding: 10px;
		height: 100%;
		margin-bottom: 0px;
		/*background-color: rgba(222, 222, 222, 1);*/
	}

	/*Switch*/
	.switch {
	  position: relative;
	  display: inline-block;
	  width: 50px;
	  height: 26px;
	}

	/* Hide default HTML checkbox */
	.switch input {display:none;}

	/* The slider */
	.slider {
	  position: absolute;
	  cursor: pointer;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  background-color: #ccc;
	  -webkit-transition: .4s;
	  transition: .4s;
	}

	.slider:before {
	  position: absolute;
	  content: "";
	  height: 20px;
	  width: 20px;
	  left: 2px;
	  bottom: 3px;
	  background-color: white;
	  -webkit-transition: .4s;
	  transition: .4s;
	}

	input:checked + .slider {
	  background-color: #2196F3;
	}

	input:focus + .slider {
	  box-shadow: 0 0 1px #2196F3;
	}

	input:checked + .slider:before {
	  -webkit-transform: translateX(26px);
	  -ms-transform: translateX(26px);
	  transform: translateX(26px);
	}

	.btn{
		border-radius: 0px;
	}
	td, th{
		text-align: center;
	}
	/* Rounded sliders */
	.slider.round {
	  border-radius: 34px;
	}

	.slider.round:before {
	  border-radius: 50%;
	}

/*	//
	//Show Popup div styles
	//
	//*/
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
	label{
		font-weight: normal;
	}
	.popup-div{
		z-index: 11;
		background-color:rgb(62, 0, 111);
		color: white;
		position: fixed;
		top:20%;
		/*border: 4px solid #5100af;*/
		box-shadow: 3px 6px 8px #888888;
		padding: 10px;
		border-radius: 10px;
		left:39%;
		width: 320px;
	}
	.div-header{
		font-size:20px; 
		font-weight:600; 
		padding:5px; 
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


	.w3-container, .w3-panel {
	    padding: 0px;
	}
	table {
		border: 3px solid #e6e6e6; 
	    border-collapse: collapse;
	    border-spacing: 0;
	    width: 100%;
	}

	th, td {
	    text-align: center;
	    padding: 10px;
	}

	th {
		background-color: black;
	    color: white;
	}
	tr:nth-child(even) {
	    background-color: #f2f2f2
	}
	td{
		padding: 5px; 
	}
</style>