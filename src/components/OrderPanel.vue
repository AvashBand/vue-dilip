<template>
	<div class="container-fluid">
		<Menu-Bar></Menu-Bar>
		<button id="logo" class="success-div" v-bind:class="{ShowBox:ShowLogoutBox}" v-on:click="CancelLogout">
			 <i class= "glyphicon glyphicon-ok"></i>
		</button>	
		<div id="PageContainer">
			<div>
				<span>
					Welcome
					<span style="font-size: 18px; font-weight:normal;">{{ full_name }}!</span>
				</span>
			</div>
			<div class="table-area w3-container w3-center w3-animate-opacity" v-if="!ShowOrderPanel">
				<div style="margin:50px;">
					<div class="order-completed">
						Please Select a food item that you prefer.
						<i class= "glyphicon glyphicon-ice-lolly"></i>
					</div>
				</div>
				<table>
				  <tr>
				    <th>SN</th>
				    <th>Food Name</th>
				    <th>Price</th>
				    <th>Order</th>
				  </tr>
				  <tr v-for="(food, index) in Foods">
				    <td>{{ index + 1 }}</td>
				    <td>{{ food.name }}</td>
				    <td>{{ food.price }}</td>
				    <td>
				    	<button class="btn btn-primary" style="border-radius:0px;" v-bind:id="food._id" v-on:click="create_order">Order</button>
				    </td>
				  </tr>
				</table>
			</div>
			<div class="table-area w3-container w3-center w3-animate-opacity" v-if="ShowOrderPanel">
				<div>
					<div class="order-completed">
						You've already ordered your lunch for today.	
						<i class= "glyphicon glyphicon-ice-lolly-tasted"></i>
						<br/>
						<img class="ordered-image" src="../assets/EmptyPlate.png">
					</div>
					<div class="ordered-item">
						<span style="font-weight:600; padding-right:20px;">Ordered Item:</span>{{ food_name }}
						<div>
							<span style="font-weight:600; font-size:20px; padding-right:20px;">Ordered Time:</span>
							<span style="font-size:20px; padding-right:20px;"> {{ order_time }}</span>
						</div>
						<div class="button-area" style="padding-top: 50px;">
							<span class="margin-right:30px; font-size:20px">Want to cancel your order?</span>
							<button class="btn btn-success btn-lg" v-on:click="cancel_order">Click Here</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'

	export default{
		data(){
			return{
				ShowLogoutBox : false,
				ShowOrderPanel : false,
				UserName : '',
				full_name : '',
				Foods: [],
				food_id: '',

				order_id: '',
				order_time : '',
				food_name : ''
			}
		},
		created(){
			this.UserName = localStorage.getItem('username');
			this.full_name = localStorage.getItem('full_name');
			this.populate_food_table();
		},
		mounted(){
			this.check_for_order();	
			// alert(this.food_name);
			// alert(this.ShowOrderPanel);

			if(localStorage.getItem('is_admin') == 'true') {
				this.MenuButton = 'glyphicon-tasks';
				document.getElementById("MySideNav").style.width = "inherit";
				document.getElementById("PageContainer").style.marginLeft = "260px";
				document.getElementById("PageContainer").style.width = "calc(100% - 20.3%)";
				this.SideBarOpened = true;
			}
			else{
				document.getElementById("menu-show-button").style.visibility = "hidden";
				document.getElementById("MySideNav").style.visibility = "hidden";	
				document.getElementById("PageContainer").style.marginLeft = "10px";
				document.getElementById("PageContainer").style.width = "98%";
				this.SideBarOpened = false;
			}
		},
		methods:{
			populate_food_table: function(){
				axios({
					method: 'get',
					url: 'http://localhost:3000/foods',
					headers:{
						'Content-Type' : 'application/json',
						'Accept' : 'application/json',
						'x-auth': localStorage.getItem('token')
					}
				}).then((response) => { this.Foods = response.data; });
			},
			check_for_order: function(){
				axios({
					method: 'get',
					url: 'http://localhost:3000/orders/check/',
					headers:{
						'Content-Type' : 'application/json',
						'Accept' : 'application/json',
						'x-auth': localStorage.getItem('token')
					}
				}).then((response) => {
					if(response.data.order[0]){
						console.log(response.data.order[0]);
						this.order_id = response.data.order[0].id;
						this.food_name = response.data.order[0].food_name;
						this.order_time = response.data.order[0].time;
						this.ShowOrderPanel = true;
					} else {
						this.ShowOrderPanel = false;
					}	
				}).catch((error) => {
					console.log(error);
				});
			},
			create_order : function(e){
				const data = {
					food_id : e.target.id
				}
				axios({
					method: 'post',
					url: 'http://localhost:3000/orders/',
					data : data,
					headers:{
						'Content-Type' : 'application/json',
						'Accept' : 'application/json',
						'x-auth': localStorage.getItem('token')
					}
				}).then((response) => {
					if(response.data.order[0]){
						console.log(response.data.order[0]);
						this.food_name = response.data.order[0].food_name;
						this.order_time = response.data.order[0].time;
						this.ShowOrderPanel = true;
					} else {
						this.ShowOrderPanel = false;
					}	
				}).catch((error) => {
					console.log(error);
				});
				this.ShowLogoutBox = true;
				var self = this;
				setTimeout(function(){
					self.ShowLogoutBox = false;	
					self.ShowOrderPanel = true;	
				}, 830);
			},
			cancel_order: function(){
				axios({
					method: 'patch',
					url: 'http://localhost:3000/orders/',
					headers:{
						'Content-Type' : 'application/json',
						'Accept' : 'application/json',
						'x-auth': localStorage.getItem('token')
					}
				}).then((response) => {
					if(response.data.order[0].id){
						console.log(response.data.order[0]);
						this.food_name = response.data.order[0].food_name;
						this.order_time = response.data.order[0].time;
						this.ShowOrderPanel = true;
						alert('order cancelled.');
					} else {
						this.ShowOrderPanel = false;
					}	
				}).catch((error) => {
					console.log(error);
				});
			},
			CancelLogout : function(){
				this.ShowLogoutBox = false;
			},
			Navigate : function(){
				this.$router.push('/');
			}
		}
	}
</script>
<style>
	.success-div{
		outline: none;
		visibility: hidden;
		height: 100px;
		position: absolute;
		z-index: 3;
		top:35%;
		left: 45%;
		border-radius: 50%;
		font-size: 40px;
		font-weight: bold;
		padding: 20px 29px;
		background-color: #39e600;
		color: white;
		border: 2px solid #e6e6e6;
		/*opacity: 0;*/
	}
	.LogoutMessage{
		text-align: center;
		margin-bottom: 20px;
		font-size: 18px;
		font-weight: 600;
	}
	.button-area{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.ShowBox{
		visibility: visible;
		animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;
	}
	@keyframes shake {
	  0% { opacity: 0 }
	  30% {opacity : 1}
	  10%, 90% { transform: translate3d(-1px, 0, 0); }
	  20%, 80% { transform: translate3d(2px, 0, 0); }
	  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
	  40%, 60% { transform: translate3d(4px, 0, 0); }
	  70% {opacity : 1}
	  100% { opacity: 0; visibility: hidden;}
	}
/*	.menu-show-button{
		visibility: hidden;
	}
	.side-bar{
		visibility: hidden;
	}*/
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
		min-height: 590px;
		max-height: 590px;
/*		background-color: white;
		position:static;
		padding: 15px;
		transition: 0.2s;
		width: auto;
		margin: 60px 10px -11px 10px;*/
	}
	.user-addressing{
		font-size: 25px; 
		font-weight:600; 
		padding-right:10px; 
		/*float:right;*/
	}
	.order-completed{
		margin-top:20px;
		font-size: 38px;
		padding: 10px;
		text-align: center;
		font-weight: 600;
		transition: 0.3s;
	}
	.ordered-item{
		padding: 20px;
		font-size:30px;
		text-align:center;
		transition: 0.3s;
	}
	.ordered-image{
		margin-top:40px;
		height: 150px;
		transition: 0.3s;
	}
	.btn-lg{
		font-size: 16px;
		margin-left: 20px;
		transition: 0.3px;
	}
	@media screen and (max-width: 1000px){
		.order-completed{
			margin-top:20px;
			font-size: 25px;
			transition: 0.3s;

		}
		.ordered-item{
			font-size:20px;
			transition: 0.3s;
		}
		.ordered-image{
			margin-top:10px;
			height: 100px;
			transition: 0.3s;
		}
		.btn-lg{
			font-size: 10px;
			transition: 0.3px;
		}
	}
	table {
	    border-collapse: collapse;
	    border-spacing: 0;
	    width: 90%;
	    border: 1px solid #ddd;
	    margin: 0 auto;
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