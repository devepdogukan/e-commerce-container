import { actions as productActions } from '~/store/reducers/product-reducer'
import { actions as basketActions } from '~/store/reducers/basket-reducer'
import { actions as authActions } from '~/store/reducers/auth-reducer'
import { actions as orderActions } from '~/store/reducers/order-reducer'

const actions = {
  auth: authActions,
  product: productActions,
  basket: basketActions,
  order: orderActions,
}

export default actions
