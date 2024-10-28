import React, { lazy, Suspense } from 'react'
import Loader from '~/components/loader'

const ProductListing = lazy(() => import('productApp/ProductListPage'))
const ShoppingCart = lazy(() => import('shoppingCartApp/ShoppingCart'))

const HomePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="flex min-h-screen pr-4 max-lg:pr-0 gap-4 max-xl:flex-col-reverse">
        <main className="flex-1 min-lg:pr-4">
          <ProductListing />
        </main>
        <aside className="w-3/12 max-xl:w-full h-fit sticky top-6 max-xl:top-0 mt-4 max-xl:mt-0">
          <ShoppingCart />
        </aside>
      </div>
    </Suspense>
  )
}

export default HomePage
