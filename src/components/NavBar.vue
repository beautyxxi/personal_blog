<!-- 导航栏组件 -->
 
<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <router-link class="navbar-brand" :to="{name: 'home'}">MySpace</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'home'}">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'userlist'}">好友列表</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'userprofile', params: {userId:2}}">用户动态</router-link>
        </li> -->
      </ul>

      <!-- 没登陆显示登陆注册 -->
      <ul class="navbar-nav" v-if="!$store.state.user.is_login">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'login'}">登录</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'register'}">注册</router-link>
        </li>
      </ul>
      <!-- 已登录显示用户信息 -->
      <ul class="navbar-nav" v-else>
        <li class="nav-item">
          <router-link class="nav-link" 
          :to="{name: 'userprofile', params: {userId: $store.state.user.id}}"
          >
          {{$store.state.user.username}}
        </router-link>
        </li>
        <li class="nav-item">
          <a style="cursor:pointer" class="nav-link" @click="logout">退出</a>
        </li>
      </ul>
    
    </div>
  </div>
</nav>

<!-- <p>当前登录状态：{{$store.state.user.is_login ? '已登录' : '未登录'}}</p>
<p>用户名：{{$store.state.user.username}}</p> -->

</template>

<script>
import { useStore } from 'vuex';

export default {
  name: "NavBar",
  setup() {
    const store = useStore();
    const logout = () => {
      // console.log("logout")
      store.commit('logout');
    };

    return {
      logout,
    };
  },

}

</script>

<style scoped>

</style>