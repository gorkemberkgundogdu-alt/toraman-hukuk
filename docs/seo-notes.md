# SEO ve içerik uygulama notları

## Yayın ayarları

- `PUBLIC_SITE_URL`: varsayılan `https://toramanhukuk.com`. **Bu alan adı, yayın adresi olarak henüz doğrulanmadı.** E-posta adresinden hareketle seçilmiş bir üretim varsayımıdır; mülkiyet, DNS veya yayın ortamı teyidi değildir. Yayın sahibi doğru kök adresi build öncesinde ayarlamalıdır. Değer HTTP(S) origin olmalıdır; alt dizin barındırma bu sürümün kapsamında değildir.
- `PUBLIC_INDEXABLE`: yalnızca tam olarak `true` ve üretim build'i olduğunda indeksleme açılır. Varsayılan kapalıdır. Önizleme build'lerinde `false` kullanın; dev sunucusu her zaman noindex üretir. Üretim adresi ve içerik onaylandığında `PUBLIC_SITE_URL=https://dogrulanan-alan-adi` ve `PUBLIC_INDEXABLE=true` ile yeniden build alın. Parent `.env.example` dosyasına bu iki değişkeni eklemelidir. Müşteri önizlemesi Vercel'e kullanıcı tarafından aktarılacaktır; bu çalışma kapsamında Vercel dağıtımı yapılmaz.
- Canonical, Open Graph URL, JSON-LD kimlikleri, sitemap ve robots sitemap adresi aynı kaynaktan üretilir. Ayarlar statik build anında uygulanır; yayın ortamındaki değişiklikler yeniden build gerektirir. Canonical URL'ler sorgu parametrelerini çıkarır ve son eğik çizgiyi tutarlı kullanır. Parent Astro config/site ve trailingSlash ayarlarını bu seçimle eşleştirmelidir.
- Kapalı indeksleme: sayfalarda `noindex, nofollow`, robots.txt içinde `Disallow: /`; sitemap dosyası yine 13 adresi üretir ancak robots dosyasında duyurulmaz. robots.txt erişim kontrolü değildir. Önizlemenin gizli olması gerekiyorsa barındırma erişim kontrolü kullanılır. Daha önce indekslenmiş bir sayfanın kaldırılması için taramayı engellemek tek başına yeterli değildir; tarayıcının noindex görebilmesi gerekir.

## İçerik ve yapısal veri

- `src/data/content.ts` tek kaynaktır. PROJECT.md içindeki 12 kısa açıklama aynen korundu. Her alanın iki özgün kapsam paragrafı, dört konu başlığı ve iki FAQ yanıtı vardır. Sayfalar HTML olarak statik üretilir; içerik için istemci JavaScript'i gerekmez.
- Beş ekip üyesinin isimleri ve eğitimleri PROJECT.md ile eşleştirildi. Fotoğraf yolları parent tarafından üretilmiş `/images/tugrul.webp`, `efe.webp`, `dogukan.webp`, `senay.webp`, `sevilay.webp` dosyalarını kullanır. Senay Kılıç yazımı korunur. Asistan için eğitim veya baro kaydı üretilmez.
- Büro bilgileri: 2004 kuruluşu, Tuğrul Toraman, doğrulanmış açık adres, telefon, e-posta ve hafta içi saatleri. `LegalService` verisi bu bilgilerle sınırlıdır. Koordinat, puan, yorum, ücret, başarı oranı, ödül, yabancı dil veya doğrulanmamış hizmet iddiası yoktur. Adres metniyle oluşturulan yol tarifi bağlantısı kesin koordinat iddiası taşımaz.
- Detaylarda `WebPage`/`Service` ve gerçek sayfa yollarına dayalı `BreadcrumbList` bulunur. Büro varlığı her sayfada aynı `@id` ile tanımlanır. JSON-LD, HTML script kapanış enjeksiyonuna karşı `<` karakterlerini Unicode olarak serileştirir.
- FAQ kullanıcıya yararlı ve görünür içeriktir; `FAQPage` schema eklenmedi. Arama sıralaması, rich result veya yapay zekâ yanıtlarında yer alma garantisi verilmez. llms.txt, analitik, sahte yorum ve kariyer sayfası eklenmedi.
- Parasal eşik, yasal süre, zorunlu işlem veya kesin sonuç belirtilmez. Ayrıntılı süreç paragrafları ve kapsam taslakları yayın öncesi büro tarafından gözden geçirilmelidir; bunlar büro adına özel iş akışı veya uzmanlık sertifikası iddiası değildir.

## Yerleşim entegrasyonu

- Layout, local Manrope 400/500/600/700, global.css, ortak Header/Footer ve tek experience script'ini içerir. Loader ve Scene yalnızca ana sayfada parent tarafından eklenir.
- Layout içeriği slot'tur; ana sayfa da detaylar gibi `main#main-content` sağlamalıdır. Böylece ortak içeriğe geç bağlantısı çalışır ve iç içe main oluşmaz.
- Detay sınıfları TEAM.md sözleşmesine uyar. Detay FAQ ortak bileşeni kullanır ve varsayılan `sorular` kimliğini alır. Header ana sayfa bölümlerine `/#id` ile bağlanmalıdır.
- Tüm içerik Türkçedir; sayfa dili `tr`, Open Graph dili `tr_TR`. Hero başlığı parent kapsamındadır.

## Doğrulama ve resmi kaynaklar

Statik rotalar `getStaticPaths` ile, robots ve sitemap Astro statik endpoint'leriyle üretilir. Kontrol kaynakları (6 Ekim 2026):

- [Astro statik dinamik rotalar](https://docs.astro.build/en/guides/routing/)
- [Astro ortam değişkenleri](https://docs.astro.build/en/guides/environment-variables/)
- [Schema.org LegalService](https://schema.org/LegalService)
- [Google Search Central güncellemeleri](https://developers.google.com/search/updates) — eski FAQPage rehber adresi bu güncelleme sayfasına yönlendi; FAQ görünürlüğü hakkında ürün vaadi çıkarılmadı.

Son doğrulama: `npm run check` 16 dosyada 0 hata, 0 uyarı, 0 ipucu ile geçti. Bellek içinde çalıştırılan içerik kontrolü 12 açıklamanın PROJECT ile birebir eşleşmesini, 24 kapsam paragrafını, 24 alana özel FAQ'yu, 48 konu başlığını, beş mevcut portre yolunu, varsayılan önizleme noindex davranışını, üretim opt-in ve dev noindex davranışlarını, domain override'ını ve hatalı origin reddini doğruladı. Favicon `/favicon.svg` olarak Layout head bölümüne eklendi. Son yerleşim değişikliğinde detay iletişim bölümü mevcut açık zeminli `.detail-body` içine taşındı; ortak stil kontratı korunur.

Build ve tarayıcı doğrulaması parent/QA koordinasyonundadır. Parent ilk check/build'in geçtiğini bildirdi; bu rol ayrıca build veya tarayıcı çalıştırmadı. Son kaynak değişiklikleri için parent yeniden build almalıdır. Bu role ait değişiklikler dışında dosya düzenlenmedi, kurulum/commit/push yapılmadı.
