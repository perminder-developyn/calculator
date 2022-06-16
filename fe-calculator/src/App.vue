<template>
	<input type="number" v-model="num" :placeholder="placeholder"/>
	<button class="calculator" v-on:click="operator='add', next()">+</button>
	<button class="calculator" v-on:click="operator='minus', next()">-</button>
	<button class="calculator" v-on:click="operator='times', next()">x</button>
	<button class="calculator" v-on:click="operator='over', next()">/</button>
	<button v-on:click="updateUrl()">=</button>
	<div v-if="history.length > 0">
		<h3>{{answer}}</h3>
		<button @click="clear()">Clear History</button>
	</div>
	<div class="history" v-for="(list, i) in history" :key="i" >
		({{i+1}}) {{history[i][0]}} {{history[i][1]}} {{history[i][2]}} 
		is equal to {{history[i][3]}}
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "App",
	methods: {
		updateUrl() {
			this.numbers[1] = this.num;
			let url = this.operator + '/' + this.numbers[0] + '/' + this.numbers[1];
			axios.get(`http://localhost:3000/${url}`).then(res => {
				this.answer = res.data;
				this.history.push([
					this.numbers[0], 
					this.operator, 
					this.numbers[1], 
					this.answer
				]);
				this.operator = null;
				this.num = null;
				this.numbers = [];
				this.placeholder = "Enter The First Number";
			})
		},
		next() {
			this.numbers[0] = this.num;
			this.num = null;
			this.placeholder = "Now the second number";
		},
		clear() {
			this.history = [];
		}
	},
	data() {
		return {
			operator: null,
			answer: null,
			numbers: [null, null],
			num : null,
			history: [],
			placeholder: "Enter The First Number"
		};
	}
}
</script>

<style>
.calculator:focus {
  color: aliceblue;
  background-color: black;
}
</style>
