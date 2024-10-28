import api from '~/utils/api'

type UserData = {
  email: string
  password: string
}

class AuthService {
  async login({ email, password }: UserData) {
    const response = await api.post('https://reqres.in/api/login', {
      email,
      password,
    })

    return response.data
  }

  async register({ email, password }: UserData) {
    const response = await api.post('https://reqres.in/api/register', {
      email,
      password,
    })

    return response.data
  }
}

export default new AuthService()
