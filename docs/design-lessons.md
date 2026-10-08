# Tasarım sürecinden öğrenilenler — Toraman Hukuk

Tarih: 6 Ekim 2026. Kanıt: ilk teslim `6d1383b`, kullanıcı tarafından kabul edilen akış revizyonu `87f6a38`, konuşmadaki geri bildirim ve canlı referans/yerel karşılaştırması.

## Temel hata

Kullanıcının seçtiği deneyimin davranışını tasarım sözleşmesine yeterince çevirmeden uygulamaya geçildi. Siyah/beyaz, kobalt, büyük tipografi, asimetri ve 3D gibi özellikler korunsa da bunların referansta nasıl birlikte çalıştığı korunmadı. Teknik olarak çalışan bir uygulama, tasarım niyetini karşılamayan bir sonuçla teslim edildi. Bu bir erişim veya kapasite engeli değildi; yorumlama, karar verme ve kabul kontrolü hatasıydı.

Soyut mimari obje başlangıçta konuşulmuştu. Dolayısıyla soyutluk tek başına yetkisiz seçim değildi. Hata, bu araştırma yönünü başarılı bir görsel prova olmadan kesinleştirmek ve objeyi scroll hikâyesine bağlamadan dekor olarak kullanmaktı. Kullanıcının son düzeltmesi terazi yönünü kesinleştirdi.

## Hatalar, düzeltmeler ve çıkarımlar

| İlk teslim | Revizyonda değişen | Tekrarı önleyen kontrol |
| --- | --- | --- |
| Referansın sıfatları alındı; sahne sürekliliği ve bölüm ritmi kayboldu. | Tam ekran sahne, solda metinli navigasyon, outline CTA ve serbest metin konumları kuruldu. | Referansın hero, erken/orta/geç scroll, açık sahne ve mobil durumlarını ayrı ayrı kaydet; kompozisyon ve davranışı tarif et. |
| Portal objesi dönüyor, içerikle ilişkili bir olay örgüsü kurmuyordu. | Kiriş, zincir, kefeler ve kaideli terazi; scroll'a bağlı yaklaşma, konum, kadraj ve ışık değişimi uygulandı. | Her hareket için tetikleyici, başlangıç/son durum ve içerikteki işlevi yaz. Kullanıcı kaydırmıyorsa neden hareket ettiğini açıklayabil. |
| Alanlar iki kolonlu bloklara, büro ve ekip ayrı boyanmış bölümlere dönüştü. | Kutusuz, farklı yatay konumlarda akan alanlar ve büyük soluk numaralar; aynı yüzeyde koyudan açığa dönüşüm uygulandı. | Kullanıcının reddettiği hero/kart/KPI kalıplarını tasarım kararlarında açıkça dışarıda tut. Asimetriyi yalnızca kartların marjını değiştirerek taklit etme. |
| Loading kodda vardı, fakat açılış deneyimi ve logo-sahne bağlantısı yeterince okunmuyordu. | Logo, motifler ve gerçek hazırlık barı; logonun header'a taşınması ve terazinin o konumdan açılması eklendi. | Varlık kontrolü yeterli değildir: soğuk açılışı, sıcak açılışı, yavaş yüklemeyi ve reduced motion yolunu gözle. Motif/3D arasında paylaşılan biçimi somutlaştır. |
| Responsive ağırlıkla taşma ve menü kontrolleriyle değerlendirildi. | Mobil başlık/CTA ve terazi farklı yüksekliklere yerleştirildi; alanlar asimetrik tek sütuna dönüştü. | Aynı genişlikte referans ve uygulamayı karşılaştır; metin, obje, CTA ve üst navigasyonun görsel hiyerarşisini de kontrol et. |
| Build, typecheck ve binlerce statik kontrol tasarım kabulü gibi sunuldu. | Görsel fark canlı karşılaştırmayla ele alındı, teknik doğrulama ayrıca yapıldı. | İşlevsel doğruluk ve tasarım uyumu için ayrı kabul sonuçları tut; sayısal test başarısını görsel kalite kanıtı olarak kullanma. |
| Paralel görevlerin çıktıları birleşti, fakat tek tasarım sorumluluğu yeterince korunmadı. | Kullanıcının isteğiyle revizyon tek ajan tarafından yürütüldü. | Delegasyon olduğunda ana ajan referans sözleşmesinin ve son görsel kabulün sahibi kalır. Sorunu subagentlara yükleme. |

## Bundan sonraki uygulama yöntemi

1. Kullanıcının kesin kararları, araştırma seçenekleri ve yasakladığı kalıpları ayır. Son düzeltme önceki aday kararın önüne geçer.
2. Referansı gerçek scroll durumlarıyla incele. Objeyi, kamerayı, renk değişimini, tipografi ağırlığını, negatif alanı ve navigasyonu tarif eden kısa bir davranış haritası çıkar.
3. Önce hero + bir scroll geçişi + mobil karşılığını çalışır hâle getir. Bunları referansla aynı viewportlarda karşılaştır; tam içerik uygulamasına yanlış bir temel üzerinde yayılma.
4. Yaratıcı özgünlüğü marka, içerik, obje geometrisi ve renk gibi belirlenen alanlarda kullan. Kullanıcının seçtiği deneyim omurgasını kendi zevkine göre değiştirme.
5. Her aşamada görünür çıktıyı kararlarla karşılaştır. Çalışan kod kadar, kullanıcının tarif ettiği akışı karşılayıp karşılamadığına da bak.
6. Bir gereksinim eksikse, teknik engel varsa veya henüz doğrulanmadıysa açıkça bildir. Uygulanmış, denenmiş ve kabul edilmiş ifadelerini birbirinin yerine kullanma.

## Sınırlar

Kullanıcının revizyonu beğenmesi sonraki görsel kararlar için geçerli yönü gösterir; gerçek cihaz performansı, tüm erişilebilirlik yolları veya tüm animasyon hata senaryolarının tamamlandığını kanıtlamaz. Önceki QA/review sonuçları yeni sahneyi otomatik olarak kapsamaz. Logo çıkış animasyonu ve ortak kiriş eğrisi, logonun bütün olarak kesintisiz geometrik morph edildiği iddiası değildir.

Bu dosya proje içinde kalıcı çalışma kaydıdır. Gelecek oturumda bu projeye devam ederken okunmalıdır; bütün bağımsız konuşmalarda otomatik hatırlanacağı iddia edilmez.
