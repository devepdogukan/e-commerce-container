import api from '~/utils/api'

class ProductService {
  async getAll() {
    const response = await api.get('products')
    return response.data
  }
}

export default new ProductService()
