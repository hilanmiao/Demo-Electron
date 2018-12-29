<template>
    <v-app>
        <v-navigation-drawer
                fixed
                clipped
                class="grey lighten-4"
                app
                v-model="drawer"
        >
            <v-container fluid style="padding-bottom: 0">
                <v-layout column>
                    <v-flex
                            layout
                            justify-center
                            align-center
                    >
                        <!--<v-avatar-->
                        <!--size="140"-->
                        <!--&gt;-->
                        <!--<img src="https://avatars2.githubusercontent.com/u/27052900?s=400&u=70a84e4917cdbd8d34e332de94e3bd52894380c1&v=4"-->
                        <!--alt="avatar">-->
                        <!--</v-avatar>-->
                        <progress-circle></progress-circle>
                    </v-flex>

                    <v-flex pa-3 layout align-center justify-space-between>
                        <v-layout>
                            <v-flex
                                    column
                                    justify-center
                                    align-center>
                                <div class="text-xs-center font-weight-black headline">123</div>
                                <div class="text-xs-center font-weight-medium caption grey--text">Archive</div>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex
                                    column
                                    justify-center
                                    align-center>
                                <div class="text-xs-center font-weight-black headline">123</div>
                                <div class="text-xs-center font-weight-medium caption grey--text">Todo</div>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex
                                    column
                                    justify-center
                                    align-center>
                                <div class="text-xs-center font-weight-black headline">123</div>
                                <div class="text-xs-center font-weight-medium caption grey--text">All</div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-list
                    dense
            >
                <template v-for="(item, i) in items">
                    <v-layout
                            row
                            v-if="item.heading"
                            align-center
                            :key="i"
                    >
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-right" v-if="item.heading === 'Task'">
                            <v-btn small flat>Add</v-btn>
                        </v-flex>
                    </v-layout>
                    <v-divider
                            dark
                            v-else-if="item.divider"
                            class="my-3"
                            :key="i"
                    ></v-divider>
                    <v-list-tile
                            :to="item.to"
                            :key="i"
                            v-else-if="item.isSingle"
                            @click=""
                    >
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-group
                            v-else-if="item.isGroup"
                            :prepend-icon="item.icon"
                            no-action
                    >
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile
                                v-for="subItem in item.items"
                                :key="subItem.text"
                                @click=""
                        >
                            <v-list-tile-content>
                                <v-list-tile-title>{{ subItem.text }}</v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-icon>{{ subItem.icon }}</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list-group>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed app clipped-left style="-webkit-app-region: drag;">
            <v-toolbar-side-icon @click.native.stop="drawer = !drawer"
                                 style="-webkit-app-region: no-drag">
            </v-toolbar-side-icon>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn style="-webkit-app-region: no-drag"
                   icon
                   @click.native.stop="winControl('minimize')"
            >
                <v-icon>remove</v-icon>
            </v-btn>
            <v-btn style="-webkit-app-region: no-drag"
                   icon
                   @click.native.stop="winControl('unmaximize')"
                   v-show="isMaximized"
            >
                <v-icon style="font-size: 20px;">filter_none</v-icon>
            </v-btn>
            <v-btn style="-webkit-app-region: no-drag"
                   icon
                   @click.native.stop="winControl('maximize')"
                   v-show="!isMaximized"
            >
                <v-icon>crop_square</v-icon>
            </v-btn>
            <v-btn style="-webkit-app-region: no-drag"
                   icon
                   @click.native.stop="winControl('close')"
            >
                <v-icon>clear</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container pa-0 fluid>
                <v-slide-y-transition mode="out-in">
                    <router-view></router-view>
                </v-slide-y-transition>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import ProgressCircle from '@/components/ProgressCircle/Index'
    import {ipcRenderer} from 'electron'
    import {getToken} from '@/utils/auth'

    export default {
        name: 'layout',
        components: {
            ProgressCircle
        },
        data: () => ({
            token: getToken(),
            loginForm: {
                username: '',
                password: ''
            },
            clipped: false,
            drawer: null,
            fixed: false,
            items: [
                {heading: 'Task'},
                {isSingle: true, icon: 'list', text: 'Task List', to: '/task'},
                {heading: 'Manager'},
                {
                    isGroup: true,
                    icon: 'list',
                    text: 'Task Manager',
                    items: [
                        {icon: '', text: 'Week Statistics'},
                        {icon: '', text: 'Month Statistics'},
                        {icon: '', text: 'Year Statistics'},
                        {icon: '', text: 'File Manager'}
                    ]
                },
                {divider: true},
                {heading: 'System'},
                {isSingle: true, icon: 'settings', text: 'Settings', to: '/settings'},
                {isSingle: true, icon: 'lightbulb_outline', text: 'Notes', to: '/notes'},
                {isSingle: true, icon: 'help', text: 'Help', to: '/help'}
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Task Manager',
            // 是最大化
            isMaximized: false,
            showApp: false
        }),
        mounted() {
            // ipcRenderer.on('resize', (event, isMaximized) => {
            //     this.isMaximized = isMaximized
            // })
            // 如果已经登录，播放登录动画并跳转到主页面
            if (this.token) {
                this.loginNoLoadUrl()
            }
        },
        methods: {
            winControl(action) {
                if (action === 'maximize' || action === 'unmaximize') {
                    this.isMaximized = !this.isMaximized
                }
                ipcRenderer.send(action)
            },
            loginNoLoadUrl() {
                // 已经登陆了，主页面已经显示，所以直接改变窗口大小即可
                ipcRenderer.send('loggedInNoLoadUrl')
            },
            login() {
                // this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
                //     this.loading = false
                //     // 重新loadUrl
                //     ipcRenderer.send('loggedIn')
                // }).catch(() => {
                //     this.loading = false
                // })
                this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
                    this.loading = false
                    ipcRenderer.send('loggedIn')
                    // this.$router.push({ path: '/' })
                }).catch(() => {
                    this.loading = false
                })
            },
            logout() {
                this.$store.dispatch('FedLogOut').then(() => {
                    // 为了重新实例化vue-router对象 避免bug
                    ipcRenderer.send('loggedOut')
                    location.reload()
                })
            }
        }
    }
</script>

<style type="text/css" lang="scss">

</style>
