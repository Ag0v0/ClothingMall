<template>
  <div class="profile-data">
    <div class="data-item">
      <div class="balance">
        <p>0.00</p>
        <span>元</span>
      </div>
      <span>我的余额</span>
    </div>
    <div class="data-item">
      <div class="discount">
        <p>0</p>
        <span>个</span>
      </div>
      <span>我的优惠</span>
    </div>
    <div class="data-item">
      <div class="integral">
        <p>0</p>
        <span>分</span>
      </div>
      <span>我的积分</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileData",
};
</script>

<style scoped>
.profile-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: var(--font-size);
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
}

.data-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: .5px solid #ddd;
}
.data-item:last-child {
  border: none;
}

.balance,
.discount,
.integral {
  display: flex;
  align-items: flex-end;
  margin-bottom: 8px;
}

.data-item p {
  margin-right: 5px;
  font-size: 24px;
  font-weight: 700;
  color: #f9766a;
}

.balance span,
.discount span,
.integral span {
  margin-bottom: 2px;
  color: #888;
}
</style>