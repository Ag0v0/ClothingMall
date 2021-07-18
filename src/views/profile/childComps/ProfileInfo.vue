<template>
  <div class="profile-info" >
    <div class="left" @click="infoClick()">
      <div class="profile-pic">
        <img src="~assets/images/user/user.jpeg" alt="">
      </div>
      <div class="user-info">
        <span class="login">登录/注册</span>
        <div class="phone-number">
          <i class="iconfont icon-phone"></i>
          <span>暂未绑定手机号</span>
        </div>
      </div>
    </div>
    <div class="right" @click="infoClick()">
      <span class="iconfont icon-right"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProfileInfo',
    methods: {
      infoClick() {
        this.$toast.show('抱歉，暂未开放！', 2000)
      }
    },
  };
</script>

<style scoped>
.profile-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 120px;
  padding: 20px;
  font-size: var(--font-size);
  background-color: var(--color-tint);
  color: #fff;
}

.left {
  flex: 1;
  display: flex;
  align-items: center;
}
.user-info {
  margin-left: 20px;
}
.user-info .login {
  font-size: 18px;
}
.user-info .phone-number {
  margin-top: 10px;
}
.icon-phone {
  margin-right: 2px;
}

.right .icon-right {
  font-size: 18px;
}

.profile-pic {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}
</style>