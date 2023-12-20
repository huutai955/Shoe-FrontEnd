import api from "../index"

const loginFaceBookAccount = async (code: string) => {
    const response = await api.post('/auth/facebook/login', {
        code: code
    })
    return response.data
}

const getFacebookInfoAccount = async () => {
    const response = await api.get('auth/me/facebook')
    return response.data
}

export const authServices = {
    loginFaceBookAccount,
    getFacebookInfoAccount
}