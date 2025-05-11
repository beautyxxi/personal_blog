import $ from 'jquery'
import { jwtDecode } from 'jwt-decode';

const ModuleUser = {
    state: {
        id: "",
        username: "",
        photo: "",
        followerCount: 0,
        access: "", // jwt token令牌
        refresh: "", // jwt token刷新令牌
        is_login: false, // 是否登录
    },
    getters: {},
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.followerCount = user.followerCount;
            state.access = user.access;
            state.refresh = user.refresh;
            state.is_login = user.is_login;
        },

        updateAccess(state, access) {
            state.access = access;
        },

        logout(state) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.followerCount = 0;
            state.access = "";
            state.refresh = "";
            state.is_login = false;
        },
    },
    actions: {
        login(context, data) {
            // console.log(data);
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/api/token/",
                type: "POST",
                data: {
                    username: data.username,
                    password: data.password,
                },

                success(resp) {
                    // console.log(resp);
                    // data.success();

                    const {access, refresh} = resp;
                    const access_obj = jwtDecode(access);
                    // console.log(access_obj,refresh);

                    //周期函数，每隔五(4.5)分钟获取一次access
                    setInterval(() => {
                        $.ajax({
                            url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                            type: "POST",
                            data: {
                                refresh,
                            },
                            success(resp) {
                                // console.log(resp);
                                context.commit("updateAccess", resp.access);

                            }
                        })
                    }, 4.5 * 60 * 1000);

                    $.ajax({
                        url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                        type: "GET",
                        data: {
                            user_id:access_obj.user_id,
                        },
                        // jwt验证（背）
                        headers: {  
                            'Authorization': 'Bearer ' + access,
                        },
                        success(resp) {
                            context.commit("updateUser", {
                                ...resp,
                                access : access,
                                refresh : refresh,
                                is_login: true,
                            })
                            data.success();
                        }
                    })
                },
                error() {
                    data.error();
                }
            });
        },

    },
    modules: {},
}

export default ModuleUser;