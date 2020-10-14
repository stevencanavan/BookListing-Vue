<!--
this component conditionally renders
either load, error, or book component
based on fetch states
if fetchSuccess is true, it
loops through 'results' state and render
'book' component with each individual book element from 'results'
in its props and a unique key to id it on the
-->

<template>
  <div>
    <div class="search">
      <form @submit.prevent="handleSubmit">
        <input v-model="input" class="search-input" />
        <button class="search-button" type="submit">Search</button>
      </form>
    </div>
    <div class="results">
      <template v-if="fetchSuccess">
        <div v-bind:key="book.id" v-for="book in results">
          <Book v-bind:book="book" />
        </div>
      </template>
      <template v-if="fetching">
        <Loading />
      </template>
      <template v-else-if="fetchFailure">
        <Error />
      </template>
    </div>
  </div>
</template>

<script>
import Book from './Book.vue';
import Error from './Error.vue';
import Loading from './Load.vue';
export default {
  name: 'app',
  components: {
    Book,
    Error,
    Loading,
  },
  props: ['books'],
  data() {
    return {
      input: '',
      results: [],
      fetching: false,
      fetchFailure: false,
      fetchSuccess: false,
    };
  },
  methods: {
    // on click of the search button
    // input state is assigned to 'term' var
    // if response.ok 'results' state is set to fetch results
    // else it hits .catch statement
    // 'input' state is cleared
    // if !response.ok all fetch states are set to false
    // fetchFailure is set to true
    handleSubmit() {
      this.fetchSuccess = false;
      this.fetching = true;
      this.fetchFailure = false;
      let term = this.input;
      console.log('term', term);
      fetch(`http://localhost:3000/${term}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log('data', data);
          this.results = data;
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
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.search {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.search-button:focus {
  outline: none;
}
.search-button:hover {
  filter: brightness(110%);
}
.search-button {
  margin: 12px;
  border-radius: 12px;
  border: 1px solid #00b0ff;
  padding: 8px 12px;
  background-color: #00b0ff;
  color: white;
  font-family: 'Cabin';
  font-size: 1.2em;
}
.search-input {
  border-radius: 12px;
  border: 1px solid black;
  outline: none;
  font-size: 1.2em;
  font-family: 'Cabin';
  padding: 8px 12px;
}
</style>
