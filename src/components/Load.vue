<template>
  <div class="fetching">
    Loading
    <span class="dot1">.</span>
    <span class="dot2">.</span>
    <span class="dot3">.</span>
  </div>
</template>
<script>
export default { name: 'Load' };
</script>
<style scoped>
.fetching {
  font-family: 'Cabin';
  text-align: center;
  font-size: 1.2em;
}
.dot1 {
  animation: hide1 0.5s linear infinite;
}
@keyframes hide1 {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.dot2 {
  animation: hide2 0.5s linear infinite;
}
@keyframes hide2 {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.dot3 {
  animation: hide3 0.5s linear infinite;
}
@keyframes hide3 {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
