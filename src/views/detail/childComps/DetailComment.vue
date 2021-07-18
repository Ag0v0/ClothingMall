<template>
  <div class="detail-comment" v-if="comment">
    <div class="head">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class="content">
      <div class="user">
        <div class="avatar">
          <img :src="comment.uAvatar" alt="" />
        </div>
        <span class="name">{{ comment.uName }}</span>
      </div>
      <p class="comment-text">{{ comment.content }}</p>
      <div class="purchase">
        <span>{{ comment.date | createdDate }}</span>
        <span>{{ comment.style }}</span>
      </div>
      <div class="comment-img" v-if="comment.images">
        <img v-for="(item, index) in comment.images" :key="index" :src="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/common/utils";

export default {
  name: "DetailComment",
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    // 评论创建时间
    createdDate(value) {
      // 时间戳 转 Date对象
      const date = new Date(value * 1000);
      // 格式化日期并返回
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style scoped>
.detail-comment {
  margin: 6px 0;
  padding: 10px;
  font-size: var(--font-size);
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.1);
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  font-weight: 700;
  border-bottom: 1px solid #ddd;
}

.content {
  padding: 5px 0;
}
.content .user {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
}
.content .user .avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
}
.content .user .name {
  font-weight: 700;
  margin-left: 10px;
}

.content .comment-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 10px;
  line-height: 30px;
}
.content .purchase {
  color: #888;
  line-height: 26px;
}
.content .purchase span {
  margin-right: 10px;
}
.content .comment-img {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 80px;
}

.content .comment-img img {
  width: 65px;
  height: 65px;
  margin-right: 5px;
}
</style>