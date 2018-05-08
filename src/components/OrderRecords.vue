<template>
	<div class="container-fluid">
		<Menu-Bar></Menu-Bar>
		<div id="PageContainer" style="visibility: visible;">
			<div class="Dashboard">
				<span style="font-weight:bold; font-size:20pt; padding-right:10px;">
					<i class= "glyphicon glyphicon-list-alt" style="font-size:18px; margin:0px 20px;"></i>Order Records Table
				</span>
				<span style="font-weight:600;">Admin Panel</span>
			</div>
			<div class="ContentBox">
				<div class="table-area w3-container w3-center w3-animate-opacity">
					<table>
					    <tr>
					    	<th scope="col">SN</th>
					    	<th scope="col">Username</th>
					    	<th scope="col">Food Name</th>
					    	<th scope="col">Order Status</th>
					    	<th scope="col">Date</th>
					    	<th scope="col">Time</th>
					    </tr>
					    <tr v-for="(order, index) in Orders">
					    	<td>{{ index + 1 }}</td>
					    	<td>{{ order.username }}</td>
					    	<td>{{ order.food_name }}</td>
					    	<td>{{ order.is_cancelled }}</td>
					    	<td>{{ order.updated_at }}</td>
					    	<!-- <td>{{ order._id }}</td> -->
					    </tr>
					</table>
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
				SideBarOpened : false,
				Orders: []
			}
		},
		created(){
			axios( {
				method: 'get',
				url: 'http://localhost:3000/orders/',
				headers:{
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
					// 'x-auth' : 'Bearer ' + localStorage.getItem('token'),
					'x-auth': localStorage.getItem('token')
				}
			}).then((response) => { 
				this.Orders = response.data; 
			});
		},
		methods:{
			ToggleSideBar : function(){
				if(document.getElementById("PageContainer").style.marginLeft == "260px"){
					this.SideBarOpened = true;
					console.log(this.SideBarOpened);
				}
				else{
					this.SideBarOpened = false;
					console.log(this.SideBarOpened);
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
		},
		mounted(){
			
		}
	}
</script>
<style scoped>
	.btn{
		border-radius: 0px;
	}
	td, th{
		text-align: center;
	}
	.container-fluid{
		margin: 0px;
		padding: 0px;
		background-color: #ffe5ec;
	}
	#PageContainer{
		background-color: white;
		position:static;
		/*left: calc(238px);*/
		padding: 15px;
		width: 98%;
		margin: 60px 10px 10px -10px;
		/*width: calc(100% - 250px);*/
	}
	.ContentBox{
		min-height: 520px;
		max-height: 520px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		/*background-color: #f4f4f4;*/
		padding: 10px;
		height: auto;
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

	/* Rounded sliders */
	.slider.round {
	  border-radius: 34px;
	}

	.slider.round:before {
	  border-radius: 50%;
	}

	.w3-container, .w3-panel {
	    padding: 0px;
	}
	table {
		border: 3px solid #e6e6e6; 
	    border-collapse: collapse;
	    border-spacing: 0;
	    width: 100%;
	    margin: 0px;
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