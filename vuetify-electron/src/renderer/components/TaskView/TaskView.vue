<template>
    <v-layout row fill-height>
        <v-flex xs5 fill-height style="border-right: 1px solid rgba(0,0,0,0.12)">
            <v-layout row>
                <v-flex elevation-2 layout
                        justify-end
                        align-center
                        grey lighten-4
                        style="height: 64px;"
                >
                    <div style="width: 20%;height: 100%;display: flex;
    align-items: center;">
                        <v-divider vertical class="primary" style="max-width: 6px;width: 6px;"></v-divider>
                        <v-icon x-large style="padding-left: 15px;">assignment_returned</v-icon>
                    </div>
                    <div style="width: 80%;">
                        <v-select
                                style="width: 80%;"
                                :items="itemsProject"
                                label="Project"
                        ></v-select>
                    </div>

                </v-flex>
            </v-layout>
            <v-list tow-line style="overflow-y: auto;border-top: 1px solid rgba(0, 0, 0, 0.12);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);" :style="{ height: taskListHeight + 'px' }">
                <template v-for="(item, index) in items">
                    <v-list-tile
                            :key="index"
                            avatar
                            @click=""
                    >
                        <v-btn flat icon color="primary" v-if="index%2 === 0">
                            <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                        </v-btn>
                        <v-btn flat icon color="primary" v-else>
                            <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                        </v-btn>
                        <v-list-tile-content>
                            <v-list-tile-title class="font-weight-black">{{ item.title }}</v-list-tile-title>
                            <v-list-tile-sub-title class="caption">
                                <v-icon class="pr-2">alarm</v-icon>
                                {{ item.subtitle }}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn icon ripple v-if="item.level === 'high'">
                                <v-icon color="red">turned_in</v-icon>
                                <!--<v-icon color="yellow" v-if="item.level === 'medium'">turned_in</v-icon>-->
                                <!--<v-icon color="green" v-if="item.level === 'low'">turned_in</v-icon>-->
                            </v-btn>
                            <v-btn icon ripple v-else-if="item.level === 'medium'">
                                <!--<v-icon color="red" v-if="item.level === 'high'">turned_in</v-icon>-->
                                <v-icon color="yellow" >turned_in</v-icon>
                                <!--<v-icon color="green" v-if="item.level === 'low'">turned_in</v-icon>-->
                            </v-btn>
                            <!--<v-btn icon ripple v-else>-->
                            <!--<v-icon color="yellow">turned_in</v-icon>-->
                            <!--</v-btn>-->
                        </v-list-tile-action>
                        <!--<v-list-tile-action style="padding: 0px;-->
                        <!--flex-direction: row-reverse;-->
                        <!--min-width: 20px;-->
                        <!--right: 0px;-->
                        <!--position: absolute;">-->
                        <!--&lt;!&ndash;<v-icon color="red" v-if="item.level === 'high'">turned_in</v-icon>&ndash;&gt;-->
                        <!--&lt;!&ndash;<v-icon color="yellow" v-if="item.level === 'medium'">turned_in</v-icon>&ndash;&gt;-->
                        <!--&lt;!&ndash;<v-icon color="green" v-if="item.level === 'low'">turned_in</v-icon>&ndash;&gt;-->
                        <!--<v-divider vertical class="red" v-if="item.level === 'high'" style="max-width: 2px"></v-divider>-->
                        <!--<v-divider vertical class="yellow" v-if="item.level === 'medium'" style="max-width: 2px"></v-divider>-->
                        <!--&lt;!&ndash;<v-divider vertical class="green" v-if="item.level === 'low'" style="max-width: 2px"></v-divider>&ndash;&gt;-->
                        <!--&lt;!&ndash;<v-btn icon ripple v-else>&ndash;&gt;-->
                        <!--&lt;!&ndash;<v-icon color="yellow">turned_in</v-icon>&ndash;&gt;-->
                        <!--&lt;!&ndash;</v-btn>&ndash;&gt;-->
                        <!--</v-list-tile-action>-->
                    </v-list-tile>
                    <v-divider inset v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
            <v-layout row>
                <v-flex layout
                        justify-center
                        align-center
                        grey lighten-4
                        style="height: 64px;"
                >
                    <v-btn round color="primary" dark>Add Task</v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs7 fill-height style="background-color: #fff;border-right: 1px solid rgba(0,0,0,0.12)">
            <v-layout row>
                <v-flex layout
                        justify-center
                        align-center xs2>

                    <v-avatar>
                        <img
                                src="https://avatars2.githubusercontent.com/u/27052900?s=400&u=70a84e4917cdbd8d34e332de94e3bd52894380c1&v=4"
                                alt="John"
                        >
                    </v-avatar>
                </v-flex>
                <v-flex layout
                        row-reverse
                        justify-end
                        align-center
                        style="height: 64px;border-bottom: 1px solid rgba(0, 0, 0, 0.12);"
                >
                    <v-btn flat icon color="primary">
                        <v-icon>create</v-icon>
                    </v-btn>
                    <v-btn flat icon color="primary">
                        <v-icon>restore</v-icon>
                    </v-btn>
                    <v-btn flat icon color="primary">
                        <v-icon>delete_forever</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout row :style="{ height: taskListHeight + 'px' }" style="overflow-y: auto;border-top: 1px solid rgba(0, 0, 0, 0.12);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                <v-flex
                        pt-2
                        xs2
                        layout
                        justify-center
                >
                    <v-btn x-large flat icon color="primary">
                        <v-icon>check_circle</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs8
                        pt-3
                        pb-3
                        comlumn
                >
                    <v-layout column style="width: 100%;">
                        <div class="title font-weight-black">
                            simple description of task
                        </div>
                        <div class="caption pt-2">
                            <v-icon class="pr-2">alarm</v-icon>
                            2018-09-01
                        </div>
                    </v-layout>
                    <v-layout row pt-2 pb-5>
                        <v-flex layout>
                            <div>
                                Please describe the task in detail.Please describe the task in detail.Please describe
                                the task in detail.Please describe the task in detail.Please describe the task in
                                detail.Please describe the task in detail.Please describe the task in detail.Please
                                describe the task in detail.Please describe the task in detail.Please describe the task
                                in detail.Please describe the task in detail
                            </div>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row pt-3 pb-3>
                        <v-flex row>
                            <v-layout>
                                <div class="pl-3 pr-3">
                                    <v-icon small class="pr-1">event_note</v-icon>
                                    2018-09-01
                                </div>
                                <div>
                                    I would like to add, ....
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="pl-3 pr-3">
                                    <v-icon small class="pr-1">event_note</v-icon>
                                    2018-09-01
                                </div>
                                <div>
                                    I would like to add, ....
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="pl-3 pr-3">
                                    <v-icon small class="pr-1">event_note</v-icon>
                                    2018-09-01
                                </div>
                                <div>
                                    I would like to add, ....
                                </div>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row pt-3 pb-3>
                        <v-flex>
                            <v-layout align-center>
                                <v-flex xs2>
                                    <v-icon x-large>attach_file</v-icon>
                                </v-flex>
                                <v-flex>
                                    <div class="subheading font-weight-black">
                                        create.psd
                                    </div>
                                    <div class="caption">2018-09-01</div>
                                </v-flex>
                                <v-flex xs3 layout align-center justify-center>
                                    <v-btn flat icon color="blue">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                    <v-btn flat icon color="blue">
                                        <v-icon>cloud_download</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <v-layout align-center>
                                <v-flex xs2>
                                    <v-icon x-large>attach_file</v-icon>
                                </v-flex>
                                <v-flex>
                                    <div class="subheading font-weight-black">
                                        create.psd
                                    </div>
                                    <div class="caption">2018-09-01</div>
                                </v-flex>
                                <v-flex xs3 layout align-center justify-center>
                                    <v-btn flat icon color="blue">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                    <v-btn flat icon color="blue">
                                        <v-icon>cloud_download</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs2></v-flex>
            </v-layout>
            <v-layout row style="height: 64px;">
                <v-flex layout
                >
                    <!--<v-text-field-->
                            <!--style="width: 100%;height: 64px;"-->
                            <!--solo-->
                            <!--value="The Woodman set to work at."-->
                    <!--&gt;</v-text-field>-->
                    <v-text-field
                            style="padding: 10px 10px 0px 10px;"
                            value="will be displayed as a list"
                            label="supplementary information"
                            clearable
                    ></v-text-field>
                    <v-btn fab color="yellow lighten-1" style="border-radius: 0;margin: 0;width: 64px;height: 64px;">
                        <v-icon dark>attach_file</v-icon>
                    </v-btn>
                    <v-btn fab color="primary" style="border-radius: 0;margin: 0;width: 64px;height: 64px;">
                        <v-icon dark>send</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: 'task',
        data() {
            return {
                taskListHeight: document.documentElement.clientHeight - 64 - 64 - 64,
                items: [
                    {
                        icon: 'check_circle',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'high'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'medium'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'low'
                    },
                    {
                        icon: 'check_circle',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'high'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'medium'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'low'
                    },
                    {
                        icon: 'check_circle',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'high'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'medium'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'low'
                    },
                    {
                        icon: 'check_circle',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'high'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'medium'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'low'
                    },
                    {
                        icon: 'check_circle',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'high'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'medium'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'low'
                    },
                    {
                        icon: 'check_circle',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'high'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'medium'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'low'
                    },
                    {
                        icon: 'check_circle',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'high'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'medium'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'low'
                    },
                    {
                        icon: 'check_circle',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'high'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'medium'
                    },
                    {
                        icon: 'done',
                        iconClass: '',
                        title: 'simple description of task',
                        subtitle: '2018-08-09',
                        level: 'low'
                    }
                ],
                itemsProject: ['project1', 'project2', 'project3']
            }
        },
        mounted() {
            window.onresize = () => {
                return (() => {
                    this.taskListHeight = document.documentElement.clientHeight - 64 - 64 - 64
                })()
            }
        }
    }
</script>

<style>

</style>