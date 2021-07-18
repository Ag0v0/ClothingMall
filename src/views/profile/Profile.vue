<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">我的</div>
    </nav-bar>
    <profile-info/>
    <profile-data/>
    <profile-function/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

import ProfileInfo from './childComps/ProfileInfo';
import ProfileData from './childComps/ProfileData';
import ProfileFunction from './childComps/ProfileFunction';

export default {
  name: "Profile",
  components: {
    NavBar,
    ProfileInfo,
    ProfileData,
    ProfileFunction,
  },
  
    NavBardata() {
    return {};
  },
};
</script>

<style>
#profile {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 49px);
}
.nav-bar {
  height: 44px;
  text-align: center;
  line-height: 44px;
  background-color: var(--color-tint);
  color: #fff;
}
</style>