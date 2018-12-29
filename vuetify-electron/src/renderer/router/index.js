import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/login', component: require('@/components/LoginView/Login').default, hidden: true},
        // {
        //   path: '/',
        //   name: 'welcome-view',
        //   component: require('@/components/WelcomeView').default
        // },
        // {
        //   path: '/inspire',
        //   name: 'inspire',
        //   component: require('@/components/InspireView').default
        // },
        {
            path: '/',
            name: 'task',
            redirect: '/task',
            component: require('@/components/Layout/Layout').default,
            children: [{
                path: 'task',
                component: require('@/components/Taskview/TaskView').default
            }]
        },
        {
            path: '/settings',
            name: 'settings',
            redirect: '/settings/settings',
            component: require('@/components/Layout/Layout').default,
            children: [{
                path: 'settings',
                component: require('@/components/SettingsView/SettingsView').default
            }]
        },
        {
            path: '/notes',
            name: 'notes',
            redirect: '/notes/notes',
            component: require('@/components/Layout/Layout').default,
            children: [{
                path: 'notes',
                component: require('@/components/NotesView/NotesView').default
            }]
        },
        {
            path: '/help',
            name: 'help',
            redirect: '/help/help',
            component: require('@/components/Layout/Layout').default,
            children: [{
                path: 'help',
                component: require('@/components/HelpView/HelpView').default
            }]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
