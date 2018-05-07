<template>
	<div class="container-fluid">
		<Menu-Bar></Menu-Bar>
		<div id="PageContainer" v-bind:class="PageContainerTransition" style="visibility: visible;">
			<div class="Dashboard">
				<span style="font-weight:bold; font-size:20pt; padding-right:10px;">
					<i class= "glyphicon glyphicon-user" style="font-size:18px; margin:0px 20px;"></i>User Table
				</span>
				<span style="font-weight:600;">Admin Panel</span>
			</div>
			<div class="ContentBox">
				<div class="table-area w3-container w3-center w3-animate-opacity">
					<table>
					  <tr>
					  	<th>SN</th>
					  	<th>Username</th>
					  	<th>Full Name</th>
					  	<th>Status</th>
					  	<th>Delete</th>
					  </tr>
					  <tr>
					  	<td>1</th>
					  	<td>Ram</td>
					  	<td>Ram Bhandari</td>
					  	<td>
					  		<label class="switch">
					  		  <input type="checkbox" checked/>
					  		  <span class="slider round"></span>
					  		</label>
					  	</td>
					  	<td>
					  		<i v-on:click="show_delete_food_popup" class="button-glyphicons glyphicon glyphicon-trash"></i>
					  	</td>
					  </tr>
					</table>
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
				SideBarOpened : false,
				bool_show_delete_popup: false
			}
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


	
	.btn{
		border-radius: 0px;
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
	body{
		background-color: #ffe5ec;
		align-items: stretch;
	}
	.container-fluid{
		margin: 0px;
		padding: 0px;
		background-color: #ffe5ec;
		height: inherit;
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
	  margin: 0px;
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