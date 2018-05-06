<template>
	<div class="container">
		<div class="row">
			<div class="add-foods-popup">
				<!-- v-bind:class="BoxAnimation" v-bind:class="BoxAnimation" v-if="showthebox" -->
				<div class="w3-center">
					<p style="font-size:30px; font-weight:600; padding:5px 0; margin:0;">
						Add New Food Products
					</p>
					<div class="form-div">
						<form>
							<div class="form-controls-div">
								<label for="text_food_name">Food Name</label>
								<input type="text" class="form-control" id="text_food_name">
							</div>
							<div class="form-controls-div">
								<label for="text_food_name">Price</label>
								<input type="text" class="form-control" id="text_food_price">
							</div>
							<div class="form-controls-div">
								<label for="text_food_name">Upload a Picture</label>
								<input type="file" class="form-control" id="image_food">
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style type="text/css">
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