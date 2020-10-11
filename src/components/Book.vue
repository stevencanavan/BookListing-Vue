<template>
  <div>
    <ul class="book">
      <li class="book-detail">
        <em>{{ book.title }}</em>
      </li>
      <li class="book-detail">
        <img class="cover" v-bind:src="book.image_url" />
      </li>
      <li class="book-detail">by {{ book.author }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Book',
  props: ['book'],
};
</script>
<style>
.book .book-detail {
  list-style: none;
  padding: 8px;
  text-align: center;
  font-family: 'Cabin';
  margin: 8px;
}
.results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 2%;
  align-items: center;
  margin: 12px;
}
.book {
  margin: 8px;
  padding: 4px;
  box-shadow: 6px 8px 8px 2px rgba(0, 0, 0, 0.1);
  background-color: white;
}
.cover {
  box-shadow: 10px 10px 10px -12px black;
}
</style>
