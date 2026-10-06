# Akış revizyonu

İlk teslim kullanıcı tarafından görsel yön ve akış açısından reddedildi. Önceki test başarısı tasarım uyumunu kanıtlamıyordu.

Grlica canlı hero, alanlar, açık vizyon ve ekip kadrajları ile eski yerel sürüm karşılaştırıldı. Kaynak model, font veya kod kopyalanmadı. Toraman için özgün terazi geometri, logo eğrisini yorumlayan kiriş, zincirler, kefeler ve kaide geliştirildi. İki kolonlu alan düzeni, KPI/yıl vurgusu, prensip kutuları ve bağımsız renk panelleri kaldırıldı. Tek sahnede yakın kadrajlar ve aydınlık geçişler kullanıldı. Boşta RAF durur; scroll, resize, giriş veya görünürlük değişimi yeni çizim başlatır.

Üretim önizlemesinde 390px açılış ve loading, mobil menü focus wrap/Escape ve aşağı akış gözlendi. 360/430/768/1440 genişliklerinde document overflow ve ana metin/CTA taşması bulunmadı. Desktop 1920 ve 1440 sahneleri, alan geçişi ve büro açık yüzeyi canlı kontrol edildi. Gerçek telefon donanımı ve GPU context loss simülasyonu yapılmadı. Eski QA/review belgeleri önceki sürüme aittir; bu kayıt yeni görsel akışı ayırır.

Başlıca dosyalar: Scene.tsx, scene-flow.css, index.astro, Loader.astro ve experience.ts. SEO içerik kaynağı, 12 hizmet rotası, gerçek iletişim bilgileri ve önizleme noindex ayarı korunur.
