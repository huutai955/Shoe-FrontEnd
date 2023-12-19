import api from "../index"

const loginFaceBookAccount = async (code: string) => {
    const response = await api.post('/auth/login', {
        code: code
    })
    return response.data
}

export const authServices = {
    loginFaceBookAccount
}