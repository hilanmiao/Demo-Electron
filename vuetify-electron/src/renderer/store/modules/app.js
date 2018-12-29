import {getToken, setToken, removeToken} from '@/utils/auth'

const app = {
    state: {
        token: getToken()
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        }
    },
    actions: {
        // 用户名登录
        LoginByUsername({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                const tempToken = '123456'
                commit('SET_TOKEN', tempToken)
                setToken(tempToken)
                resolve()
            })
        },
        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default app
