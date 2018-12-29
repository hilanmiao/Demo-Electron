<template>
    <v-app>
        <v-content>
            <v-container style="width:368px;height: 324px;padding: 0;">
                <v-layout align-center justify-center>
                    <v-flex>
                        <v-card>
                            <!-- TODO: 因为会自动计算高度，会闪动，比较难受，所以这里直接用生成好的 -->
                            <!--<v-toolbar dark color="primary pt-3 pb-4"-->
                            <!--style="border-radius:0;-webkit-app-region: drag;">-->
                            <!--<v-toolbar-title class="display-1">Login</v-toolbar-title>-->
                            <!--<v-spacer></v-spacer>-->
                            <!--<v-tooltip bottom>-->
                            <!--<v-btn style="-webkit-app-region: no-drag"-->
                            <!--icon-->
                            <!--large-->
                            <!--slot="activator"-->
                            <!--@click.native.stop="winControl('close')"-->
                            <!--&gt;-->
                            <!--<v-icon large>close</v-icon>-->
                            <!--</v-btn>-->
                            <!--<span>Close</span>-->
                            <!--</v-tooltip>-->
                            <!--<v-btn-->
                            <!--style="-webkit-app-region: no-drag"-->
                            <!--fab-->
                            <!--color="white"-->
                            <!--dark-->
                            <!--small-->
                            <!--absolute-->
                            <!--bottom-->
                            <!--left-->
                            <!--@click="login"-->
                            <!--&gt;-->
                            <!--<v-icon color="orange">add</v-icon>-->
                            <!--</v-btn>-->
                            <!--</v-toolbar>-->
                            <nav class="v-toolbar theme--dark primary pt-3 pb-4" data-booted="true"
                                 style="margin-top: 0px; padding-right: 0px; padding-left: 0px; transform: translateY(0px); border-radius: 0px; -webkit-app-region: drag;">
                                <div class="v-toolbar__content" style="height: 48px;">
                                    <div class="v-toolbar__title display-1">Login</div>
                                    <div class="spacer"></div>
                                    <span class="v-tooltip v-tooltip--bottom"><span>
                                            <button type="button"
                                                    class="v-btn v-btn--icon v-btn--large theme--dark"
                                                    style="-webkit-app-region: no-drag;" @click="winControl('close')">
                                                <div
                                                        class="v-btn__content"><i aria-hidden="true"
                                                                                  class="v-icon material-icons theme--dark"
                                                                                  style="font-size: 36px;">close</i></div></button></span></span>
                                    <button type="button"
                                            class="v-btn v-btn--absolute v-btn--bottom v-btn--floating v-btn--left v-btn--small theme--dark white"
                                            style="-webkit-app-region: no-drag;" @click="login">
                                        <div class="v-btn__content"><i aria-hidden="true"
                                                                       class="v-icon material-icons theme--dark orange--text">add</i>
                                        </div>
                                    </button>
                                </div>
                            </nav>
                            <v-card-text>
                                <v-form class="pt-3">
                                    <v-text-field prepend-icon="person" name="login" label="Login"
                                                  type="text"></v-text-field>
                                    <v-text-field prepend-icon="lock" name="password" label="Password" id="password"
                                                  type="password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn flat small class="caption">Forgot your password?</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="login">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import {ipcRenderer} from 'electron'

    export default {
        name: 'login',
        data: () => ({
            loginForm: {
                username: 'admin',
                password: 'admin'
            }
        }),
        mounted() {
        },
        methods: {
            login() {
                this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
                    ipcRenderer.send('loggedIn')
                }).catch(() => {
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped type="text/css" lang="scss">
    .login-wrapper {
        .theme--light.application {
            background: transparent;
        }
    }
</style>
