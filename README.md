# Container Projesi

Bu proje, **micro-frontend mimarisi** kullanarak farklı e-ticaret modüllerini birleştirir. Container uygulaması, diğer bağımsız micro-frontend projelerle birlikte çalışmakta olup her bir micro-frontend kendi deposunda bulunur. Micro-frontend projelerini aşağıdaki bağlantılardan erişebilirsiniz:

- [Kullanıcı Kimlik Doğrulama (e-commerce-authentication)](https://github.com/devepdogukan/e-commerce-authentication)
- [Ürün Yönetimi (e-commerce-product)](https://github.com/devepdogukan/e-commerce-product)
- [Siparişler (e-commerce-orders)](https://github.com/devepdogukan/e-commerce-orders)
- [Alışveriş Sepeti (e-commerce-shopping-cart)](https://github.com/devepdogukan/e-commerce-shopping-cart)


## Komutlar

### Tüm Bağımlılıkları Kurma

Projeyi çalıştırmadan önce tüm bağımlılıkları kurmak için:

```bash
pnpm run setup-all
``` 



### Projeyi Çalıştırma

Tüm micro-frontend uygulamalarını ve container uygulamasını başlatmak için:

```bash
pnpm run start-all
``` 

Bu komut ile her micro-frontend modülü kendi portunda çalışır ve container uygulamasıyla iletişim kurar.


Container Projesini Geliştirme Modunda Çalıştırma
Sadece container projesini geliştirme modunda çalıştırmak için:

```bash
pnpm run start
``` 

# Port Bilgileri

Her bir micro-frontend projesini tekil olarak çalıştırmak için aşağıdaki portları kullanabilirsiniz:

- **e-commerce-authentication**: `http://localhost:3002`
- **e-commerce-orders**: `http://localhost:3004`
- **e-commerce-container**: `http://localhost:8081`
- **e-commerce-product**: `http://localhost:3001`
- **e-commerce-shopping-cart**: `http://localhost:3003`

Her micro-frontend modülü, yukarıdaki portlarda çalışarak bağımsız olarak test ve geliştirme yapılmasına olanak sağlar.