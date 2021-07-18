<template>
  <div class="toast" v-if="isShow">
    <transition name="toast">
      <span>{{ message }}</span>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(toastMessage = "Toast Message", duration = 1000) {
      this.isShow = true;
      this.message = toastMessage;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);
  width: 100%;
  font-size: 16px;
}
.toast span {

  text-align: center;
  padding: 10px 15px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  background-color: rgba(0, 0, 0, 0.7);
}
.toast-enter-active {
  animation: toast-show 0.5s;
}
.toast-leave-active {
  animation: toast-show 0.3s reverse;
}
@keyframes toast-show {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>