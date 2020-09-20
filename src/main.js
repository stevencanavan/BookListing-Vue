import Vue from 'vue';

Vue.config.productionTip = false;

const bookComp = Vue.extend({
  props: ['book'],
  template: `<div>
    <ul class="book">
      <li class="book-detail">
      <em>{{ book.title }}</em>
      </li>
      <li class="book-detail">
      <img class="cover" v-bind:src="book.imageUrl" />
      </li>
      <li class="book-detail">by {{ book.authorName }}</li>
    </ul>
  </div>`
});

Vue.component('app', {
  data() {
    return {
      input: '',
      results: [],
      fetching: false,
      fetchFailure: false,
      fetchSuccess: false
    };
  },
  props: ['books'],
  components: {
    book: bookComp
  },
  methods: {
    handleSubmit() {
      let term = this.input;
      fetch(`https://goodreads-server-express--dotdash.repl.co/search/${term}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          console.log('data', data);
          this.results = data.list;
          this.fetchSuccess = true;
          this.fetchFailure = false;
          this.fetching = false;
        })
        .catch(() => {
          this.fetchSuccess = false;
          this.fetchFailure = true;
          this.fetching = false;
          this.input = '';
        });
    }
  },
  template: `<template>
    <div class="results">
      <template v-if="fetchSuccess">
        <div v-bind:key="book.title" v-for="book in results">
          <book v-bind:book="book"><book/>
        </div>
      </template>
    </div>
  </template>`
});

new Vue({
  el: '#app'
});
