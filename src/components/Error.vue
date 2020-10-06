<template>
  <div class="error">
    <h1 class="oops">Sorry!</h1>
    <p class="no-books">
      GoodReads doesn't have any books that match that search criteria.
    </p>
  </div>
</template>
<script>
export default { name: 'Error' };
</script>
<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.oops {
  font-family: 'Cabin';
  margin-bottom: 0;
  color: #00b0ff;
}
.no-books {
  font-family: 'Cabin';
  font-size: 1.2em;
}
</style>
