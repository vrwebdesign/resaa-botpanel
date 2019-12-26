<template>
  <div class="error-page">
    <div class="error-container">
      <h1 class="error-title">اوووه!</h1>
      <div class="error-subtitle">این صفحه در سامانه وجود ندارد</div>
      <v-btn to="/" color="white" outline>بازگشت به خانه</v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  height: calc(100vh - 70px);
  background: Url('./404.jpg') center/cover no-repeat border-box;
  display: flex;
  align-items: center;
}

.error-container {
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
  font-weight: 500;
  margin: 0;
}

.error-subtitle {
  font-size: 2.3rem;
  text-align: center;
  font-weight: 400;
  margin: 16px 0;
}
</style>

