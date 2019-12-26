<template>
  <div class="error-page">
    <div class="error-container">
      <h1 class="error-title">اوپس...</h1>
      <br />
      <div class="error-subtitle">
        خطایی رخ داده است
        <br />ما در حال بررسی آن هستیم
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  height: calc(100vh - 70px);
  background: Url("./550.jpg") center/cover no-repeat border-box;
}

.error-container {
  padding-top: 6rem;
  color: white;
  text-align: center;
  width: 100%;
}

.tr1-enter {
  opacity: 0;
}
.tr1-enter-active {
  transition: opacity 2s;
}

.error-title {
  font-size: 3rem;
  text-align: center;
  font-weight: 400;
  margin: 0;
}

.error-subtitle {
  font-size: 2.5rem;
  text-align: center;
  font-weight: 500;
}
</style>

