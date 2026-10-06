# Toraman Hukuk — İlk inceleme

Tarih: 6 Ekim 2026. Rol: Review. Yazma kapsamı yalnızca `docs/review.md`.

## İncelenen kanıt ve durum

`PROJECT.md`, `TEAM.md` ve mevcut `package.json` okundu. İlk dosya envanterinde yalnızca bu üç dosya vardı; `src/`, stil, sahne, bileşenler ve çıktı henüz mevcut değildi. Bu belge plan/sözleşme incelemesidir; uygulanmış kodun doğru çalıştığını veya build'in geçtiğini iddia etmez. Tarayıcı testi, bağımlılık kurulumu, commit veya push yapılmadı.

PROJECT'in başlangıcındaki eski bekleme notunun ardından son bölümde geliştirme yetkisi açıkça verilmiş. TEAM ortak uygulama sözleşmesidir; mevcut görev talimatı gereği bu rol kurulum, commit, push veya başka dosyalarda düzeltme yapmaz.

## Parent için erken risk kontrol listesi

1. **Loading / erişilebilir içerik:** İçerik SSR HTML olarak görünür başlamalı. Fonts veya sahne hatası, kaçırılmış readiness eventi ve JS yüklenememesi tam ekran perdesini kalıcı bırakmamalı. Dört saniyelik sahne fallback'i font beklemesini de sonsuz hâle getirmemeli. Progress üç gerçek hazırlık aşamasını göstermeli; indirme yüzdesi olmamalı. Reduced motion tek sabit motif kullanmalı. CSS fail-open perdenin pointer olaylarını da serbest bırakmalı; görünmez perde odak/etkileşim engeli olmamalı.
2. **Menü / odak:** Native dialog `showModal()` ile açılmalı; erişilebilir adı, gerçek kapatma düğmesi, Escape ve görünür odak bulunmalı. Açılışta odak içeride, normal kapanışta tetikleyicide olmalı. Bölüm seçimiyle kapanırken hedef içerik odağı ve scroll konumu uyumlu olmalı. Desktop breakpoint'e geçerken açık mobil dialog body kilidini veya modal durumunu bırakmamalı. JS yokken mobil gezinme için kullanılabilir alternatif gerekli.
3. **Responsive sözleşme:** `.scene-wrap` mobilde hero ile sınırlanmalı; sadece desktop fixed sahneyi küçültmek yeterli değil. Canvas/parlak yüzeyler hero metnini, CTA'yı veya sabit başlığı örtmemeli. Çalışma alanları okunabilir tek metin sütununa dönüşmeli. 320/390 px genişlik, uzun Türkçe başlık, %200 zoom ve değişen mobil viewport yüksekliği kontrol edilmeli; yatay taşmayı gizlemek tek başına düzeltme sayılmamalı. Anchor hedeflerinde sabit başlık payı olmalı.
4. **3D yaşam döngüsü:** React effect temizliği RAF/render loop, scroll/resize/context listener'ları, observer'lar, geometry/material/texture ve renderer kaynaklarını kapsamalı. Paylaşılan kaynaklar bir kez temizlenmeli. Unmount sonrasında async yükleme sahneyi yeniden başlatmamalı. Sekme gizliyken ve mobil hero görünmüyorken render durmalı. WebGL oluşturma hatası veya context loss statik alternatifi ve readiness'i korumalı; reduced motion sürekli render gerektirmemeli. DPR mobilde sınırlandırılmalı.
5. **SEO doğruluğu / tek kaynak:** TEAM'deki varsayılan domain uygulama kolaylığı sağlar, üretim domaininin doğrulandığını kanıtlamaz. Canonical, schema URL, sitemap ve robots aynı doğrulanmış `PUBLIC_SITE_URL` ile üretilmeli; yayın öncesi parent doğrulamalı. 12 benzersiz slug/detail sayfası, gerçek FAQ, `lang="tr"`, tek H1 ve görünür içerikle tutarlı schema gerekli. Yorum, puan, koordinat ve arama/AI görünürlük garantisi eklenmemeli.
6. **İçerik / kullanıcı kapsamı:** Senay Kılıç yazımı, Sevilay Lektemur'un Asistan rolü, beş fotoğraf eşleştirmesi, 2004 kuruluşu, telefon/e-posta/adres/saatler PROJECT ile aynı olmalı. Hero alt açıklaması Kadıköy içermemeli. Mesleki sonuç garantisi, ücretsiz/7/24/online hizmet, sicil veya biyografi uydurulmamalı. Kullanıcı yazışma ekran görüntüsü public asset olmamalı. Testimonials, kariyer, analytics, blog, randevu, İngilizce site ve sahte form başarısı kapsam dışı.

## Plan düzeyinde entegrasyon notları

- **Readiness yarış riski:** Scene eventi experience listener'ından önce gelebilir. Kalıcı readiness durumu veya güvenli sorgulanabilir işaret ile birlikte süre sınırı gerekir; event tek başına yeterli olmayabilir. Son kodda olay sırası incelenecek.
- **Font bekleme riski:** `document.fonts.ready` beklemesi fail-open süresinin dışında bırakılmamalı. Asıl içerik erişimi font/sahne başarısına bağlı olmamalı.
- **Reduced motion riski:** Loader, GSAP reveal, smooth-scroll CSS ve Three sahnesi aynı tercihi tutarlı uygulamalı. CSS ile azaltılıp JS'de tekrar başlayan hareket olmamalı.
- **İçerik onayı:** Hero başlığı ve yaklaşım metni PROJECT'te aday/öneri, TEAM'de ilk sürüm sözleşmesi. V1'de kullanılabilir; parent son içerik onayında bunları doğrulanmış büro bilgisiyle karıştırmamalı.
- **Manifest:** Mevcut package.json bağımlılık listesini içeriyor; scripts/config henüz görülmedi. Buradan çalışabilir kurulum, sürüm uyumu veya typecheck/build sonucu çıkarılamaz. Parent kurulum ve QA kanıtı tamamlayacak.

## Uygulama sinyali sonrası inceleme

Parent kaynakların hazır olduğunu bildirdiğinde Layout/index, Header/Loader/FAQ/Footer, experience, Scene, global CSS, content, detay şablonu, robots/sitemap ve mevcut QA sonuçları okunacak. Gerçek bulgular önem derecesi, dosya/satır, somut hata yolu ve önerilen düzeltmeyle bu belgeye eklenecek. Statik incelemeyle kanıtlanamayan odak, görünürlük, kontrast, mobil kompozisyon ve context-loss davranışları parent tarayıcı doğrulamasına açıkça bırakılacak.

İlk geçiş tamamlandı. Kod hazır sinyali beklenirken döngüsel kontrol yapılmıyor.

## Uygulama incelemesi — kaynak hazır sinyali sonrası

Ana sayfa, Scene, experience, dört Astro bileşeni, Layout, global CSS, content, detay rotası, robots/sitemap, config/manifest/tsconfig, iki script ve README okundu. PROJECT/TEAM sözleşmeleri yeniden karşılaştırıldı. Parent check/build'in geçtiğini bildirdi; bu rol build'i tekrar çalıştırmadı. Mevcut `dist/index.html`, robots ve sitemap yalnızca SEO önizleme kanıtı için okundu. Tarayıcı açılmadı. Parent'ın üzerinde çalıştığı asset yolları ve dev JSX uyumsuzluğu tekrar bulgu olarak yazılmadı.

### Gerçek bulgular

**R1 — P2 — Reduced motion sahneyi statik yapmıyor.** `src/components/Scene.tsx:128–138`.

Tercih açıkken yalnızca drift ve pointer hareketi kesiliyor. Scroll hâlâ targetProgress'i değiştiriyor; currentProgress yumuşatılarak her karede rotasyon/pozisyon/ışık değişiyor ve fark 0.002 altına düşene kadar RAF devam ediyor. Ayrıca reduced motion açık başlangıçta WebGL renderer ve yüksek ayrıntılı geometri yine oluşturuluyor, ardından statik SVG gizleniyor. PROJECT'in statik alternatif yönüyle uyuşmuyor. Öneri: reduced motion'da SVG'yi koruyup WebGL başlatmayın veya sabit tek pozlu sahne kullanın; tercih çalışma sırasında değişirse döngüyü durdurup pointer değerlerini sıfırlayın. Parent kontrolü: tercih açıkken alanlara kaydırınca model dönüşü/ara kareler olmamalı.

**R2 — P2 — Duran render sonrası resize boş canvas bırakabiliyor.** `src/components/Scene.tsx:103–110`, `:138–142`.

Reduced motion'da ilk kare sonrası RAF duruyor. Resize handler setSize/setPixelRatio ve kamera güncellemesi yapıyor fakat render veya render planlama yapmıyor. Three'nin yerel kaynağı `node_modules/three/src/renderers/WebGLRenderer.js:683` canvas width'i yeniden atıyor; çizim tamponu yenileniyor. SVG de scene-ready nedeniyle gizli. Kullanıcı pencere boyutunu/orientation'ı değiştirdiğinde yeni bir scroll/motion eventi gelene kadar obje kaybolabilir. Öneri: resize sonrası görünürlük/scroll değerlerini tekrar hesaplayıp en az bir kare çizin; breakpoint geçişini de burada güncelleyin. R1 SVG çözümü bu yolu da ortadan kaldırabilir.

**R3 — P2 — Context kaybında statik alternatif geri açılmıyor.** `src/components/Scene.tsx:150`, `src/styles/global.css:45`.

Scene-ready sınıfı SVG'yi kalıcı gizliyor; bileşende webglcontextlost/restored dinleyicisi bulunmuyor. Başarılı başlangıçtan sonra GPU context kaybında Three render çağrısını sessizce atlıyor (yerel WebGLRenderer kaynağı `:1646`); effect catch'i bu durumu yakalamıyor. Context geri gelmezse kullanıcı boş görsel alan görüyor. Öneri: context loss'ta scene-ready sınıfını kaldırın ve döngüyü durdurun; ancak başarılı yeni çizimden sonra fallback'i yeniden gizleyin. Dinleyicileri effect cleanup'ına dahil edin.

**R4 — P2 — İletişim bölümünde klavye odağı görünmüyor.** `src/styles/global.css:34`, `:167`.

Global focus-visible outline `var(--blue)`; iletişim bölümü arka planı da aynı `var(--blue)`. Telefon, e-posta ve yol tarifi bağlantılarında odak halkası çevresiyle aynı renkte, ek klavye odak stili yok. Öneri: `.contact-section :focus-visible` için beyaz veya koyu, görünür kontrastlı outline tanımlayın. Parent telefon/e-posta/yol tarifi arasında Tab ile kontrol etmeli.

**R5 — P2 — Bölüm seçimi de odağı menü düğmesine geri zorluyor.** `src/scripts/experience.ts:18–26`.

Menüde anchor seçimi close() çağırıyor; close eventi bütün kapanışlarda previousFocus.focus çalıştırıyor. Aynı sayfa bölümüne klavye ile gitmek isteyen kullanıcı için odak/sonraki Tab başlangıcı header'a dönüyor. Öneri: kapatma nedenini ayırın; Escape/Kapat için opener'a dönün, aynı sayfa bölüm seçimi için hedefe programatik odak verin (`tabindex=-1` gerekiyorsa geçici eklenebilir). Farklı sayfa/tel/mail bağlantılarının normal navigasyonunu koruyun. Parent Enter ile ekip/FAQ seçip ardından Tab yaptığında odak seçilen içerikte ilerlemeli; bu sıra tarayıcıda ayrıca doğrulanmalı.

**R6 — P2 — Mobil menü JavaScript yüklenmezse ölü kontrol olarak kalıyor.** `src/components/Header.astro:29`, `src/styles/global.css:247–250`.

800 px altında header-links gizli, dialog kapalı, Menü düğmesi görünür; onu açan tek yol experience script'i. JS kapalı veya modül yüklemesi başarısızken düğme hiçbir şey yapmıyor. Ana sayfa içeriği ve footer bağlantıları korunuyor; bütün sayfanın erişilemez olduğu iddia edilmiyor. Ancak header gezinmesi çalışmıyor ve yaklaşım bağlantısı footer'da da yok. Öneri: başlangıçta çalışan native gezinme sunup sadece script hazırken dialog/menu moduna geçin; en azından noscript gezinmesi ve bozuk modül için progressive enhancement uygulayın.

**R7 — P2 — Başlangıç hatası dalı kısmen oluşturulmuş kaynakları temizlemiyor.** `src/components/Scene.tsx:165–168`.

Normal unmount yolu geometry, iki material, env render target, renderer, RAF ve event listener'larını temizliyor. Ancak bu kaynaklar try bloğunda yerel; sahne kurulumunun veya ilk render'ın ortasında bir exception olduğunda catch yalnızca renderer'ı dispose/remove ediyor. Kurulmuş geometry/material/env ve varsa dinleyiciler erişilemez kalıyor; scroll/resize handler'ları dispose edilmiş renderer'a çağrı yapabilir. Öneri: bütün kaynakları ve takılı listener'ları izleyen tek idempotent cleanup fonksiyonu oluşturup hem catch hem effect dönüşünde kullanın; hata halinde disposed=true, RAF iptali ve scene-ready sınıfının kaldırılması dahil olsun. Bu hata yolu gözlenmiş GPU arızası değil, kaynak kontrol akışındaki eksikliktir.

**R8 — P3 — Yayın README'si indeksleme opt-in ayarını eksik anlatıyor.** `README.md:17`, `src/data/content.ts:30`.

README yayın için sadece PUBLIC_SITE_URL ister. Bu adımla yapılan production build hâlâ noindex/nofollow ve Disallow:/ üretir; allowIndexing için PUBLIC_INDEXABLE tam olarak 'true' olmalı. Ayrıntı docs/seo-notes.md'de var ancak README Hosting bunu belirtmiyor. Öneri: önizleme varsayılanını ve doğrulanmış üretim yayını için PUBLIC_INDEXABLE=true + yeniden build adımını ana kurulum belgesine ekleyin. İndekslemeyi bu inceleme kapsamında açmayın.

### Doğrulanan noktalar ve sınırlar

- Loader gizli SSR başlangıcı, noscript hide, inline 4 saniyelik çıkış, CSS fail-open ve readiness dataset'i ile ilk plandaki kalıcı bekleme/race risklerini ele alıyor. Üç aşama gerçekten DOM görseli/font/sahne hazırlığı; sahte download yüzdesi yok. Reduced motion motif döngüsünü kapatıyor. Gerçek yavaş ağ/bozuk modül davranışı parent tarayıcı testinde kalıyor.
- Native dialog erişilebilir ad ve autofocus Kapat düğmesi içeriyor; native modal Tab/Escape davranışı kullanılabilir. Body overflow close eventinde geri alınıyor. R5 navigasyon odağı ve R6 no-JS kontrolü ayrı açık sorunlar.
- GSAP reveal metin opacity'sini sıfırlamıyor; import hatası için görünürlüğü koruyan catch var. CSS ve GSAP reduced motion kontrolü mevcut.
- Mevcut önizleme HTML'sinde `noindex, nofollow`, canonical ve og:url `https://toramanhukuk.com/`; robots `Disallow: /`; sitemap 13 URL. Bu domain PROJECT/TEAM'de önerilen varsayılan, doğrulanmış dağıtım adresi değil. Preview noindex varsayılanı doğru; robots erişim koruması sayılmıyor. Canlı domain ve preview/production build ayarları parent sorumluluğu.
- Schema yalnızca büro bilgileri, hizmet ve breadcrumb içeriyor; puan/yorum/geo/FAQ görünürlük garantisi yok. Canonical/query temizliği, JSON-LD `<` kaçışı, sitemap XML kaçışı ve 12 statik slug mevcut. Bir ana sayfa + 12 alan ortak SSR şablonu kullanıyor.
- Ekip adı/eğitim/rol metinleri PROJECT ile eşleşiyor; Senay yazımı doğru, asistan baro kaydı iddiası yok. Hero açıklamasında Kadıköy yok. Kontaktlar doğrulanmış tel/mail/address yönüne bağlı; form/testimonial/kariyer/analytics eklenmemiş. Fotoğrafların görsel isim eşleşmesi bu rol tarafından tarayıcıda doğrulanmadı. Yeni alan kapsamı paragrafları ve önerilen marka metinleri büro içerik onayında kalıyor; süre/eşik/sonuç garantisi eklenmemiş.
- Mobil CSS tek alan sütunu ve hero altına ayrı sahne yerleşimi sunuyor; 480 px altında ekip tek sütun. `overflow-x: clip` gerçek taşma olmadığını kanıtlamaz. Zoom/320 px, font büyütme, mobil kısa viewport, menü yüksekliği ve parlak obje-metnin ayrımı parent görsel kontrolünde kalıyor.
- `Layout` dark prop'unu Header'a aktarmıyor (`Layout.astro:50`); mevcut bütün sayfalar dark varsayılanında olduğu için bugün kullanıcı hatası oluşturmuyor. Light sayfa eklenirse sözleşme aktarımı düzeltilmeli; aktif bulgu olarak sayılmadı.

Sonuç: Kaynak incelemesi tamamlandı; R1–R7 v1 etkileşim/fallback düzeltmeleri, R8 yayın dokümantasyonu düzeltmesi önerilir. Değişen tek dosya `docs/review.md`. Uygulama düzeltmesi yapılmadı; sonradan parent değişiklikleri için bu bulgular yeniden doğrulanmalıdır.

## Güncel tam site — son kaynak geçişi

Parent'ın son isteği üzerine bütün `src` dosyaları, README ve Vercel yapılandırması yeniden okundu. Tarayıcı kullanılmadı, uygulama kaynakları değiştirilmedi. Önceki bulguların güncel durumu:

| Bulgu | Güncel durum / düzeltme |
| --- | --- |
| R1 / P2 | Açık. `Scene.tsx:129–139`: reduced motion'da scroll yumuşatması ve RAF sürüyor; statik alternatif veya sabit poz kullanılmalı. |
| R2 / P2 | Açık. `Scene.tsx:103–111`: resize kamera/ölçek güncelliyor fakat durmuş döngüye yeni çizim planlamıyor; resize sonrası bir kare ve visibility hesabı gerekli. |
| R3 / P2 | Açık. `Scene.tsx:151`, `global.css:45`: context loss fallback'i geri göstermiyor; loss/restored yaşam döngüsü eklenmeli. |
| R4 / P2 | Açık. `global.css:34,167`: iletişim odak halkası zeminle aynı kobalt; bu bölüm için kontrastlı outline gerekli. |
| R5 / P2 | Açık. `experience.ts:38–46`: menü anchor seçiminden sonra close handler hâlâ opener'a zorla dönüyor; bölüm navigasyonu için hedef odak yönetimi gerekli. |
| R6 / P2 | Açık. `Header.astro:25`, `global.css:249–250`: JS'siz/bozuk modül durumunda görünür Menü düğmesi çalışmıyor; çalışan native başlangıç gezinmesi gerekli. |
| R7 / P2 | Açık. `Scene.tsx:166–169`: catch yalnızca renderer'ı temizliyor; kısmi geometri/material/env/listener kurulumunu da temizleyen ortak cleanup gerekli. |
| R8 / P3 | **Düzeltildi.** README:19 artık preview false / üretim PUBLIC_INDEXABLE=true ve redeploy adımlarını açıklıyor. |

Menüye açık Tab/Shift+Tab wrap eklendi; R5 bölüm odağı veya R6 progressive enhancement sorunlarını çözmüyor. Logo boyutları güncellenmiş; önceki bilinen asset/JSX konuları bu inceleme kapsamındaki bulgulara eklenmedi. Sahnenin mobil kamera/ölçeği güncellenmiş; görünüşün iyileşmesi statik incelemeyle doğrulanamaz, R1–R3 kontrol akışları aynı kalıyor.

Loader'ın bounded fail-open ve reduced motion motif davranışında yeni bir kaynak hatası bulunmadı. Güncel SEO kodu hâlâ varsayılan preview noindex, ortak origin ile canonical/schema/sitemap ve 12 özgün detay rotası sağlıyor; yeni SEO veya Türkçe içerik kusuru bulunmadı. Domain doğrulaması ve büro metin onayı yayın önkoşulu olarak kalıyor. Yukarıdaki açık bulgular, mevcut kaynaklardan çıkarılan hata yollarıdır; tarayıcıda yeniden üretilmiş bulgular olarak sunulmaz.

Son geçiş tamamlandı. Yalnızca `docs/review.md` güncellendi.

## Düzeltmelerin doğrulanması — son durum

Parent'ın düzeltme sinyali üzerine güncel Scene.tsx, experience.ts, Header.astro ve ilgili global.css kuralları okundu. Bu bölüm önceki açık durum tablolarını geçersiz kılan güncel sonuçtur. İnceleme kaynak düzeyindedir; tarayıcı/context kaybı simülasyonu veya yeni build çalıştırılmadı.

| Bulgu | Çözüm kanıtı | Durum |
| --- | --- | --- |
| R1 | Reduced motion açık başlangıçta ready() sonrası WebGL kurulumuna girmeden çıkılıyor; SVG korunuyor. Çalışma sırasında tercih açılırsa scene-ready kaldırılıyor, pointer sıfırlanıyor ve scroll() visible=false hesaplıyor; planlı kare render guard'ında duruyor. | Kaynakta çözüldü |
| R2 | resize() kamera/ölçek güncellemesi ardından scroll() ile görünürlüğü tekrar hesaplıyor; görünür normal-motion sahne için renderer.render çağrısı var. Reduced başlangıçta canvas oluşturulmadığından statik resize boşluğu yolu da kalktı. | Kaynakta çözüldü |
| R3 | webglcontextlost preventDefault/contextLost=true, RAF iptali ve scene-ready kaldırılması yapıyor. restored contextLost=false, resize/çizim ve reduced kapalıysa scene-ready geri eklenmesini sağlıyor. İki listener cleanup listesine dahil. | Kaynakta çözüldü |
| R4 | `.contact-section :focus-visible` beyaz 2px outline ve 6px offset kullanıyor; kobalt zeminle aynı renk sorunu kalktı. | Kaynakta çözüldü |
| R5 | Aynı origin/path/query hash bağlantısında sectionTarget belirleniyor. close eventinde hedefe preventScroll ile odak veriliyor; gerekli geçici tabindex blur'da kaldırılıyor. Escape/Kapat opener dönüşünü koruyor. | Kaynakta çözüldü |
| R6 | Header native details/summary ve beş bölüm bağlantısı sunuyor; dialog düğmesi SSR'da hidden. setupMenu ancak showModal ve handler kurulumu sonrasında fallback'i gizleyip düğmeyi açıyor. Scoped hidden kuralı mobil display override'ını engelliyor. | Kaynakta çözüldü |
| R7 | İdempotent ortak cleanup disposed işaretini, RAF iptalini, scene-ready kaldırılmasını, ters sırada release listesini ve renderer dispose/remove'u kapsıyor. PMREM, RoomEnvironment, env, iki material, geometriler ve listener'lar listeye alınmış; geometriler oluşturuldukça ayrı kaydediliyor. catch ve unmount aynı cleanup'ı kullanıyor. | Kaynakta çözüldü |
| R8 | README üretim PUBLIC_INDEXABLE=true, PUBLIC_SITE_URL ve redeploy gereksinimini açıklıyor; önceki geçişte doğrulandı. | Çözüldü |

Bu sınırlı düzeltme incelemesinde yeni bir actionable kaynak bulgusu bulunmadı. Reduced motion açık başlangıçtan daha sonra kapatılırsa SVG ile devam edilmesi mevcut erişilebilir statik yaklaşımı koruyor; WebGL'nin mutlaka yeniden açılması gereksinimi yok. Normal render kaynaklarının dispose yolu ve context loss fallback'i artık açıkça uygulanmış.

Parent'ın tarayıcı kabulünde kalan kontroller: gerçek GPU context loss/restoration, runtime reduced-motion geçişinde durma, resize/orientation kadrajı, Enter ile bölüm seçimi sonrası Tab sırası, Escape opener dönüşü ve JS kapalı native gezinme. Bunların kaynakta ele alınması, tarayıcıda test edildiği iddiası değildir.

Güncel sonuç: **R1–R8 kaynak incelemesinde kapatıldı; açık review bulgusu yok.** Değişen tek yol `docs/review.md`; uygulama kaynakları değiştirilmedi.
