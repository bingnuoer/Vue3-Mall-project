import request from '@/utils/http.js'

export const getDetailAPI = (id) => {
    return request({
        url: '/goods',
        params: {
            id
        }
    })
}
