# Toraman Hukuk — Proje planı ve içerik kaynağı

Güncelleme: 6 Ekim 2026

## Durum ve çalışma sınırı

Bu belge konuşmada kararlaştırılan yönü, içerikleri ve v1 kapsamını toplar. Kullanıcının sonraki onayıyla v1 geliştirildi: Astro + React, GSAP, özgün Three.js portal sahnesi, ana sayfa ve 12 çalışma alanı sayfası. Beş uzman rol aynı çalışma dizininde katkı verdi. Son kontrol ve GitHub teslimi yapılır; Vercel yayını kullanıcı tarafından gerçekleştirilecek.

Sıra: araştırma → proje belgesi → v1 geliştirme → görsel/işlevsel kontrol → GitHub'a push → yerel önizleme. GitHub hesabı gorkemberkgundogdu-alt; müşteri önizlemesi için özel depo tercih edilir. Önizleme indekslemeye kapalıdır; gerçek üretim alan adına geçerken PUBLIC_INDEXABLE=true ile yeniden build alınır.

## Amaç

İstanbul merkezli Toraman Hukuk için cesur, güven veren ve kolay kullanılan bir website. Eski hukuk sitesi kalıplarından uzak; güçlü tipografi, özgün mimari 3D obje ve scroll boyunca değişen ışıkla devamlı bir sahne. Gösterişli görsel dil, gerçek büro bilgisi ve okunabilir içerikle dengelenecek.

## Kabul edilen kararlar

- Ana deneyim referansı: https://grlicalaw.com/ — sahne sürekliliği, atmosfer/renk değişimi ve düzenli bir sistem içindeki asimetri.
- Referansın kodu, objesi, logosu, kompozisyonları veya içerikleri kopyalanmayacak.
- Figüratif adalet heykeli yerine özgün mimari/soyut bir metal form.
- Formun başlangıç noktası mevcut logonun yükselen eğrisi. Logonun ucundan sürekli bağlı bir çizgi **kararlaştırılmadı**; kısa açılış hareketi yalnızca aday.
- Siyah/beyaz taban ve göz alıcı üçüncü renk. Elektrik kobalt şu an birinci aday; kesin renk görsel prova sonrası seçilecek. Yeşil kullanılmayacak.
- Renkler sert bölüm sıçramaları yerine scroll boyunca ışığın ve atmosferin dönüşmesiyle değişecek.
- Testimonials ve kariyer v1 kapsamında yok.
- Her çalışma alanı için ayrı içerik sayfası ve ilgili FAQ bölümü planlanacak.
- İsim yazımı **Senay Kılıç**.
- Hero alt açıklamasında Kadıköy ifadesi olmayacak. Kadıköy, büro hakkında ve iletişim bilgisinde yer alacak.
- Ana sayfa asimetrik akacak; mobil metin sütunları daraltılarak aynı düzenin küçültülmesi yapılmayacak.

## Tasarım yönü

### Özgün obje

İki veya üç parçanın birlikte dengede durduğu, logodaki eğriyi yeniden yorumlayan kemer/portal formu. Açık merkez, farklı açılardan değişen siluet ve birleşim detayları temel araştırma alanları. Mat koyu metal ve seçili parlak yüzeylerde kobalt ışık önerisi. Objenin kesin geometrisi henüz seçilmedi.

Referanslar yalnızca biçim/malzeme araştırması:

- https://nomudesign.com/products/arch-skulptura — birbirine geçen metal kemerler.
- https://blanconegrobarcelona.com/collection/p/composition-001-pablo-leonardo — katmanlı metal düzlemler.
- https://uk.pinterest.com/pin/501658846001048378/ — geçmeli taş hacimler.
- https://uk.pinterest.com/artstedwards/interlocking-forms/ — form araştırması panosu.

Obje v1'de kodla oluşturulabilen özgün geometriyle denenebilir. Bir raster render kullanılırsa buna gerçek zamanlı 3D denmeyecek. WebGL başarısız olduğunda veya hareket azaltma tercihi açık olduğunda okunabilir statik alternatif bulunmalı.

### Akış ve hareket

- Hero: büyük tipografi, kısa büro tanımı, iki açık bağlantı, objenin güçlü ama kontrollü kadrajı.
- Çalışma alanları: 12 numaralı öğe; başlık ve açıklamalar farklı konumlarda, okunabilir genişlikte. Her biri ayrı sayfaya bağlantı verir.
- Yaklaşım: büro hakkında metinden ayrı, kısa çalışma ilkeleri. İçerik büroyla teyit edilecek.
- Ekip: aynı çekim serisinden dikdörtgen portreler; farklı yükseklikler ve tutarlı metin hizaları.
- Sık sorulan sorular: iletişim, randevu ve hizmet sürecine ilişkin kısa, gerçek yanıtlar.
- İletişim: telefon, e-posta, çalışma saatleri, açık adres ve yol tarifi.
- Footer: logo, temel gezinme ve doğrulanmış iletişim bilgileri.

Bu bölüm sırası bir uygulama önerisi; kullanıcı eklemesi sonrasında netleştirilecek. Büro hakkında içeriği, yaklaşım veya ekip girişine yerleştirilebilir; aynı metin tekrar edilmeyecek.

Scroll, kullanıcı kontrolünü korur. Bölüm atlama bağlantıları, klavye ile gezinme ve doğrudan URL erişimi çalışır. Objektif bilgiye erişim animasyonun tamamlanmasına bağlı olmaz. Metinler yalnızca JavaScript ile görünür hâle getirilmez.

### Mobil incelemeden çıkan gereksinimler

Grlica, 390 × 844 tarayıcı görünümünde incelendi; gerçek iPhone/Safari donanım testi yapılmadı. Hero, uzmanlıklar, atmosfer geçişi ve mobil menü gözlemlendi.

- Parlak objenin metin ve CTA arkasına gelmesi önlenecek.
- Mobil için ayrı kamera/kadraj. Masaüstü sahnesinin kimliği korunur; her öğeyi tek ekrana sıkıştırmak zorunlu değil.
- Uzmanlık açıklamaları dar sağ/sol sütunlara bölünmez. Öncelikli metin tek okunabilir sütunda; görsel asimetri boşluk ve obje konumuyla sağlanır.
- Sabit logo/navigasyonun altından geçen metinlerle çakışma olmaz.
- Küçük, metin etiketli Menü kontrolü aday. Grlica'nın büyük dairesel hamburgeri alınmaz.
- Menüde Escape ile kapatma, odak yönetimi, görünür odak ve bölüm seçimi sonrası kapanma.
- Telefon/e-posta/yol tarifi dokunmayla kullanılabilir.
- Hareket azaltma tercihi, WebGL alternatifi, taşma kontrolü ve tarayıcı çubuğuyla değişen ekran yüksekliği dikkate alınır.

## Teknik mimari önerisi

**Astro + TypeScript + gerektiği yerlerde React adaları.** Kullanıcı Astro ve React/Next.js ifade etmişti. Aynı v1'de Astro ile ikinci bir Next.js uygulaması kurmak için şu anda bir ihtiyaç yok; öneri Astro + React. Bu bir teknik seçim önerisidir, kullanıcı eklemesi sonrasında kesinleştirilecek.

- Sayfa içeriği Astro tarafından HTML olarak üretilir.
- Three.js, özgün 3D sahne için aday; React ada sınırı içinde yüklenebilir.
- GSAP/ScrollTrigger, ışık/sahne ve bölüm hareketlerini eşlemek için aday. Zorunlu scroll hijacking veya ek smooth-scroll bağımlılığı yok.
- Tek içerik kaynağı: büro, ekip, iletişim, çalışma alanları ve FAQ verileri; ana sayfa ve detay sayfaları aynı kaynağı kullanır.
- Küçük etkileşimlerde native HTML tercih edilir. FAQ için details/summary yeterli olabilir; React yalnızca gerekirse.
- Semantik HTML, görünür odak, başlık hiyerarşisi, uygun bağlantı ve butonlar.
- Fotoğraflar farklı ekran boyutlarına uygun optimize edilir; boyutları belirtilir. Ekran altındaki görseller ertelenebilir.
- WebGL cihaz kapasitesine göre sınırlanır; görünmezken render durdurulur, kaynaklar temizlenir. Mobilde daha düşük piksel oranı ve sade sahne.
- Fontlar ve görseller mümkün olduğunca yerel sunulur. Ağır açılış preloader'ı içerik erişimini engellemez.

Component kütüphanesi bağlantısı build için önkoşul değildir. Özgün sahne ve sayfa kompozisyonu hazır bloklardan kurulmayacak. Erişilebilir dialog/menü gerekirse Radix veya shadcn/ui değerlendirilebilir. Kullanıcının mevcut ücretli blok kütüphanesi varsa yalnızca işe yarayan etkileşimler seçilir, görsel dili otomatik devralınmaz.

Teknik kaynaklar:

- https://docs.astro.build/en/guides/integrations-guide/react/
- https://docs.astro.build/en/guides/framework-components/
- https://threejs.org/manual/pages/how-to-dispose-of-objects.html
- https://github.com/greensock/GSAP — tüm eski bonus pluginler artık ücretsiz; Club GSAP erişimi istenmesi gerekmiyor.
- https://www.radix-ui.com/primitives/docs/overview/introduction

## İçerik — büro ve hero

### Doğrulanmış büro bilgisi

Toraman Hukuk, 2004 yılında İstanbul Barosu'na kayıtlı Arabulucu Avukat Tuğrul Toraman tarafından Kadıköy'de kurulmuştur.

### Hero başlığı — henüz nihai değil

Önceki aday: “İstanbul’da, hukukun her aşamasında.” Kullanıcı bu yönü beğendi ancak daha özgüvenli/cesur bir ifade istedi; İstanbul korunabilir.

Yeni aday: **“İstanbul’da. Kararlı bir hukuki duruş.”** Bu ifade henüz kullanıcı tarafından seçilmedi; uygulanmadan önce ekleme ile birlikte değerlendirilir. Abartılı başarı garantisi veya doğrulanmamış liderlik iddiası kullanılmaz.

### Hero alt açıklaması — Kadıköy çıkarıldı

Toraman Hukuk, 2004 yılından bu yana hukuki danışmanlık, dava takibi ve uyuşmazlık çözümü hizmetleri sunmaktadır.

CTA adayları: Çalışma Alanlarımız / İletişime Geçin.

### Büro hakkında — kullanıcı tarafından beğenildi

Toraman Hukuk, 2004 yılında İstanbul Barosu’na kayıtlı Arabulucu Avukat Tuğrul Toraman tarafından Kadıköy’de kurulmuştur.

Bireylerin ve şirketlerin hukuki ihtiyaçlarını, konunun özelliklerini ve olası sonuçlarını birlikte değerlendirerek ele alır. Danışmanlıktan dava takibine ve uyuşmazlıkların çözümüne uzanan süreçlerde; açık iletişimi, dikkatli hazırlığı ve düzenli bilgilendirmeyi esas alır.

İkinci paragraf önerilen marka metnidir; büronun gerçek çalışma biçimiyle son içerik onayında eşleştirilir.

## İçerik — çalışma alanları

Kısa açıklamalar özgün ilk taslaklardır ve kullanıcı genel olarak beğenmiştir. Özel hizmet/iş türleri büroyla teyit edilir. Başka sitedeki vergi metni kopyalanmaz.

### 01 — İdare & Vergi Hukuku

İdari işlemler ve vergilendirmeden doğan hukuki meselelerde danışmanlık ve temsil hizmeti sunuyoruz. Başvuru, itiraz ve dava süreçlerini konunun özelliklerine göre birlikte değerlendiriyoruz.

### 02 — Bankacılık & Finans Hukuku

Kredi ilişkileri, finansman sözleşmeleri ve bankacılık işlemlerinin hukuki boyutunu ele alıyoruz. Sözleşmelerin incelenmesinden ortaya çıkan uyuşmazlıkların takibine kadar hukuki destek sağlıyoruz.

### 03 — Tüketici Hukuku

Mal ve hizmet alımlarında tüketiciler ile işletmeler arasında doğan uyuşmazlıklara yönelik hukuki destek sunuyoruz. Ayıplı ürün ve hizmetler, sözleşmeler ve tüketici başvuruları kapsamında süreçleri takip ediyoruz.

### 04 — Şirketler Hukuku

Şirketlerin kuruluşu, günlük faaliyetleri ve ortaklık ilişkilerinde hukuki danışmanlık sağlıyoruz. Ticari sözleşmeleri, şirket kararlarını ve ortaklar arasında doğan uyuşmazlıkları bütünlüklü bir yaklaşımla ele alıyoruz.

### 05 — Ceza Hukuku

Soruşturma ve kovuşturma aşamalarında savunma ve hukuki temsil hizmeti sunuyoruz. Dosyanın koşullarını, delilleri ve usule ilişkin hakları değerlendirerek süreci takip ediyoruz.

### 06 — Enerji & Maden Hukuku

Enerji ve madencilik faaliyetlerinin izin, sözleşme ve mevzuat boyutlarında hukuki destek sağlıyoruz. Yatırım ve işletme süreçlerinde ortaya çıkan idari ve ticari uyuşmazlıkları ele alıyoruz.

### 07 — İcra & İflas Hukuku

Alacakların tahsili, icra takipleri ve borç ilişkilerinden doğan uyuşmazlıklarda hukuki destek sunuyoruz. Alacaklı ve borçlu tarafların durumunu değerlendirerek takip, itiraz ve dava süreçlerini yürütüyoruz.

### 08 — Sağlık & İlaç Hukuku

Sağlık hizmetleri ve ilaç sektöründeki faaliyetlerin hukuki boyutunu değerlendiriyoruz. Hasta hakları, mesleki sorumluluk, sözleşmeler ve ilgili düzenlemelerden doğan meselelerde danışmanlık ve temsil sağlıyoruz.

### 09 — İş & Sosyal Güvenlik Hukuku

İşçi ve işveren ilişkilerinde sözleşme, çalışma koşulları ve iş ilişkisinin sona ermesine ilişkin hukuki destek sunuyoruz. İşçilik alacakları ve sosyal güvenlik uyuşmazlıklarında başvuru ve dava süreçlerini takip ediyoruz.

### 10 — Uyuşmazlık Çözümü

Uyuşmazlıkları, tarafların ihtiyaçları ve çözüm seçenekleri doğrultusunda değerlendiriyoruz. Müzakere, arabuluculuk ve yargısal süreçlerde konunun niteliğine uygun bir yol belirlenmesine destek oluyoruz.

### 11 — Basın & Medya Hukuku

Basılı yayınlar, dijital medya ve sosyal medya faaliyetlerinden doğan hukuki meseleleri ele alıyoruz. Kişilik hakları, yayın içerikleri ve medya sözleşmeleri kapsamında danışmanlık ve temsil hizmeti sağlıyoruz.

### 12 — Gayrimenkul Hukuku

Taşınmazların alım satımı, kiralanması ve kullanımına ilişkin hukuki destek sunuyoruz. Tapu işlemleri, kira ilişkileri ve mülkiyetten doğan uyuşmazlıklarda sözleşme ve dava süreçlerini takip ediyoruz.

## Ekip ve görsel eşleştirmesi

Eşleştirmeler kullanıcı tarafından verilmiştir; yüzlerden kimlik çıkarımı yapılmadı.

| Kişi | Görev / eğitim | Kaynak dosya |
| --- | --- | --- |
| Tuğrul Toraman | Arb. Av.; kurucu; Dokuz Eylül Üniversitesi Hukuk Fakültesi | `C:\Users\HP\Downloads\IMG_8306.PNG` |
| Efe Cem Toraman | Av.; Bahçeşehir Üniversitesi Hukuk Fakültesi | `C:\Users\HP\Downloads\WhatsApp Image 2026-10-05 at 16.12.32.jpeg` |
| Doğukan Petek | Av.; İstanbul Ticaret Üniversitesi Hukuk Fakültesi | `C:\Users\HP\Downloads\IMG_8307.PNG` |
| Senay Kılıç | Av.; Marmara Üniversitesi Hukuk Fakültesi | `C:\Users\HP\Downloads\IMG_8308.PNG` |
| Sevilay Lektemur | Asistan | `C:\Users\HP\Downloads\IMG_8310.PNG` |

Avukatlar İstanbul Barosu'na kayıtlı; asistan için baro kaydı ifade edilmeyecek. Baro sicil numarası, biyografi, yabancı dil veya kıdem bilgisi uydurulmayacak.

Logo: `C:\Users\HP\Downloads\WhatsApp Image 2026-10-05 at 16.20.17.jpeg`

Ekip bilgisi ekran görüntüsü: `C:\Users\HP\Pictures\Screenshots\Ekran görüntüsü 2026-10-06 155654.png`

Bu yazışma ekran görüntüsü website veya halka açık Git deposuna asset olarak konmayacak. Fotoğraflarda yüz/kimlik değişikliği yapılmayacak. Orijinal fotoğraflar korunur, site için optimize edilmiş kopyalar üretilebilir. Mevcut logo korunacak; vektör orijinal dosya varsa ileride alınabilir.

## İletişim

- Adres: Bahariye Caddesi, Sakızgülü Sokak, Fevzi Çakmak Apartmanı No: 31/9, Kadıköy / İstanbul.
- Telefon: 0216 414 04 04.
- Telefon bağlantısı: `tel:+902164140404`.
- E-posta: tugrul@toramanhukuk.com.
- E-posta bağlantısı: `mailto:tugrul@toramanhukuk.com`.
- Çalışma saatleri: hafta içi 09.00–18.00.
- Bölüm başlığı adayı: “Kadıköy’de buluşalım.” Kullanıcı bu yönü beğendi.
- Yol tarifi bağlantısı adres üzerinden verilebilir. Haritada konum doğrulanmadan koordinat veya kesin pin uydurulmayacak.
- V1'de iletişim bağlantıları gerçek çalışır. Backend olmadan başarılı gönderilmiş gibi davranan bir iletişim formu olmaz. Form istenirse servis, alıcı ve gizlilik içeriği ayrıca belirlenir.

## SEO ve yapay zekâ görünürlüğü

Kullanıcı her çalışma alanı için ayrı sayfa ve FAQ fikrini kabul etti. Amaç, arama motorları ve yanıt sistemlerinin içeriği kolay anlamasıdır; sıralama veya AI yanıtında gösterilme garantisi verilmez.

- Türkçe dil tanımı, tek anlamlı H1, hiyerarşik başlıklar ve taranabilir gerçek HTML.
- Özgün sayfa başlığı/açıklaması, üretim domaini doğrulandığında canonical URL.
- Açık büro adı, 2004 kuruluş bilgisi, kurucu, adres, telefon ve saatlerin tutarlılığı.
- Çalışma alanı sayfaları: kısa giriş, kapsam, ele alınan konular, hizmet sürecinin açıklaması, ilgili FAQ ve iletişim bağlantısı.
- Ana sayfa ve detay sayfaları arasında açıklayıcı iç bağlantılar.
- Sitemap ve robots.txt gerçek yayın domainine göre oluşturulur.
- Yapısal veri gerçek ve görünür içerikle tutarlı olur; uygun LegalService/Organization ve BreadcrumbList değerlendirilir. Puan, yorum veya koordinat uydurulmaz.
- FAQ görünür içeriği yararlı olduğu için bulunur. FAQ schema veya rich-result görünürlüğü ayrıca güncel resmi kaynakla kontrol edilir; otomatik SEO kazanımı sayılmaz.
- Yeni mevzuat, süreler, parasal eşikler veya belirli hukuki sonuçlara ilişkin içerik üretilecekse güncel resmi kaynak ve büro değerlendirmesi gerekir. V1 hizmet tanımları bunları ileri sürmez.
- Analytics, blog, randevu sistemi, İngilizce site ve llms.txt şu anda kararlaştırılmış gereksinimler değildir.

FAQ konu adayları: Büroya nasıl ulaşabilirim? Çalışma saatleri nedir? İlk görüşme için nasıl iletişime geçebilirim? Hangi alanlarda hizmet veriliyor? Görüşmeye hangi belgeleri getirmeliyim? Son sorunun yanıtı büronun gerçek sürecine göre netleştirilir. Online görüşme, ücretsiz danışmanlık veya 7/24 destek iddiası eklenmez.

## Planın değerlendirmesi

Güçlü taraflar: tek net görsel referans; logo kaynaklı özgün form; tutarlı gerçek ekip fotoğrafları; 12 alan ve doğrulanmış iletişim bilgisi; mobil hataların önceden görülmesi.

Çözülmesi gerekenler:

1. Hero daha cesur olacak ancak slogan hâlâ aday; kullanıcı eklemesiyle kesinleşmeli.
2. 12 alanın tamamını dramatik tam ekran sahnelere yaymak ana sayfayı gereksiz uzatabilir. Kısa açıklamalar ve detay sayfalarıyla derinlik sağlanmalı.
3. 3D görsel ana unsur, metin erişiminin önünde engel olmamalı. Statik alternatif ve düşük hareket modu baştan tasarlanmalı.
4. Mobil ayrı kompozisyon ister; yalnızca breakpoint'te küçültme yeterli değil.
5. Fotoğraflar iyi bir temel ancak logo JPEG. Vektörleştirme yapılırsa şekil doğruluğu kontrol edilmeli; özgün logo değiştirilmeyecek.
6. V1'de 12 detay sayfası ortak bir şablonla gerçek içerik taşımalı. Derin mevzuat yazıları ve kapsamlı yayın arşivi sonraki içerik aşamasına kalabilir.
7. Teknik SEO temeli v1'e dahil; kapsamlı içerik revizyonu ve ölçümlü performans optimizasyonu sonraki rötuşlara yayılabilir.

## V1 kabul kontrolleri

- Ana sayfa, 12 alan bağlantısı/detay sayfası, ekip, FAQ ve iletişim.
- Masaüstü ve mobilde özgün mimari sahne, okunabilir metinler ve kontrollü atmosfer geçişleri.
- Klavye ile menü ve FAQ kullanımı; mobil yatay taşma yok.
- Reduced motion ve WebGL yüklenmeme durumunda içerik kullanılabilir.
- Telefon, e-posta, bölüm bağlantıları ve yol tarifi çalışır.
- Gerçek olmayan form gönderimi, başarı iddiası veya placeholder ekip verisi yok.
- Build ve typecheck; uygun işlevsel kontroller; masaüstü/mobil görsel doğrulama; console hatalarının incelenmesi.
- Fotoğraf isim eşleştirmeleri ve Türkçe karakterler kontrol edilir.
- Git'e sırlar, özel yazışma ekran görüntüleri, node_modules veya geçici test profilleri eklenmez.
- Son doğrulanmış durum bu belgeye işlenir; ardından kullanıcı talebi doğrultusunda GitHub push yapılır.

## Loading — kullanıcı tarafından kabul edilen yön

Siyah zemin; ortada aynı çizgi kalınlığıyla denge, çerçeve, bağ ve logo eğrisi motifleri sırayla görünür. Küçük Toraman Hukuk yazısı ve kobalt ilerleme çizgisi. Yanıp sönme ve uzun zorunlu bekleme yok. Progress gerçek hazırlık aşamalarını izler; ağ indirme yüzdesi olarak sunulmaz. Son motifin eğrisi, ana sahnedeki mimari formun diliyle eşleşir. Reduced motion'da tek sabit motif. Yükleme hatası ve JavaScript yokluğunda içerik erişilebilir kalır.

## Sonraki adım

Kullanıcı loading yönünü kabul etti ve build'e başlamayı istedi. **V1 geliştirme artık yetkilidir.** Astro + React temelinde ilerle; ardından kontroller ve GitHub push. Teknik altyapı ve hero metni, yukarıdaki adaylar üzerinden ilk görsel sürümde değerlendirilir.
