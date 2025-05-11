<template>
    <ContentBase>
        <div class="row">
          <div class="col-3">
            <UserProfileInfo @follow="follow" @unfollow="unfollow" :user="user" /> 
            <UserProfileWrite v-if="is_me" @post_a_post="post_a_post"/>
          </div>
          <div class="col-9"><UserProfilePosts :user="user" :posts="posts" @delete_a_post="delete_a_post" /></div>
        </div>
    </ContentBase>
</template>
  
<script>
  import ContentBase from '../components/ContentBase';
  import UserProfileInfo from '../components/UserProfileInfo';
  import UserProfilePosts from '../components/UserProfilePosts';
  import UserProfileWrite from '../components/UserProfileWrite';
  import { reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import $ from 'jquery';
  import { useStore } from 'vuex';
  import { computed } from 'vue';

  export default {
    name: 'UserProfile',
    components: {
        ContentBase,
        UserProfileInfo,
        UserProfilePosts,
        UserProfileWrite,
    },

    setup() {
      const route = useRoute();
      const userId = parseInt(route.params.userId);
      const store = useStore();
      // console.log(userId);

      // 云端动态拉取
      // const user = reactive({
      //   id: 1,
      //   username: "zhangxiaoxi",
      //   lastName: "zhang",
      //   firstName: "xiaoxi",
      //   followerCount: 0,
      //   is_followed: false,
      // });

      // const posts = reactive({
      //   count: 3,
      //   posts: [
      //     {
      //       id: 1,
      //       userId:1,
      //       content: "今天学了web课真开心！"
      //     },
      //     {
      //       id: 2,
      //       userId:1,
      //       content: "今天上午睡到十一点！"
      //     },
      //     {
      //       id: 3,
      //       userId:1,
      //       content: "今天晚饭吃什么呢?"
      //     }
      //   ]
      // })

      const user = reactive({

      });
      const posts = reactive({

      });

      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
        type: 'GET',
        data: {
          user_id: userId,
        },
        headers: {
          'Authorization': 'Bearer ' + store.state.user.access,
        },
        success(resp) {
          
          user.id = resp.id;
          user.username = resp.username;
          user.followerCount = resp.followerCount;
          user.is_followed = resp.is_followed;
          user.photo = resp.photo;
        }
      })

      $.ajax ({
        url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
        type: 'GET',
        data: {
          user_id: userId,
        },
        headers: {
          'Authorization': 'Bearer ' + store.state.user.access,
        },
        success(resp) {
          // console.log(resp);
          posts.posts = resp;
          posts.count = resp.length;
        }
      })

      const follow = () => {
        if(user.is_followed) return;
        user.is_followed = true; 
        user.followerCount++;
      }
      const unfollow = () => {
        if(!user.is_followed) return;
        user.is_followed = false;
        user.followerCount--; 
      }

      const post_a_post = (content) => {
        // if(!content || content.trim() === '') {
        //   console.log(posts.count,"无内容");
        //   return;
        // }

          posts.count++;
          posts.posts.unshift({
            id: posts.count,
            userId: 1,
            content: content,
          })
        
      }

      const delete_a_post = (post_id) => {
        posts.posts = posts.posts.filter(post => post.id !== post_id);
        posts.count = posts.posts.length;
      }

      // console.log(typeof(userId), typeof(store.state.user.id))
      const is_me = computed(() => 
        userId === store.state.user.id
      )

      return {
        user,
        follow,
        unfollow,
        posts,
        post_a_post,
        delete_a_post,
        is_me,
      }
    }
  }
</script>
  
<style>
</style>
  