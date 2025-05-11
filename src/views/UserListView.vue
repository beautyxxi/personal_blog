<template>
    <ContentBase>
        <div class="card" v-for="user in users" :key="user.id" @click="open_user_profile(user.id)">
          <div class="card-body">
            <div class="row">
              <div class="col-1 img-field">
                <img class="img-fluid" :src="user.photo" alt="">
              </div>
              <div class="col-11">
                <div class="username">{{ user.username }}</div>
                <div class="follower-count">{{ user.followerCount }}</div>
              </div>
            </div>
          </div>
        </div>
    </ContentBase>
</template>
  
<script>
  import ContentBase from '../components/ContentBase';
  import $ from 'jquery';
  import { ref } from 'vue'; 
  import router from '@/router/index';
  import { useStore } from 'vuex';
  
  export default {
    name: 'UserList',
    components: {
        ContentBase,
    },
    setup() {
      let users = ref([]);
      const store = useStore();

      //使用了 jQuery 的 $.ajax 方法来发送一个 AJAX 请求，目的是从指定的 URL 获取数据，并将返回的数据存储在一个变量中。
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',
        type: 'get',
        //success 是一个回调函数，当请求成功（服务器返回状态码 200）时会被调用
        success(resp) {
          users.value = resp;
        }
      });

      const open_user_profile = userId => {
        if(store.state.user.is_login) {
          router.push({
            name: 'userprofile', 
            params: {
              userId
            } 
          });
        }
        else {
          router.push({
            name: 'login',
          });
        }
      }

      return {
        users,
        open_user_profile,
      };
    }
  }
</script>
  
<style scoped>
  img {
    border-radius: 50%;
  }

  .username {
    font-weight: bold;
    height: 50%;
  }
  .follower-count {
    font-size: 12px;
    color: grey;
    height: 50%;
  }

  .card {
    margin-bottom: 10px;
    cursor: pointer;
  }

  .card:hover {
    box-shadow: 2px 2px 10px lightgrey;
    transition: 100ms;
  }

  .img-field {
    display:flex;
    flex-direction: column;
    justify-content: center;
  }

</style>
  