# Loading ve hero düzenlemesi

Onaylanan düzen: büyük logo → “2004’ten bu yana kararlı bir hukuki duruş.” → 2px yazısız mavi bar. Dönen motifler ve görünür aşama/yüzde yazıları kaldırıldı; ekran okuyucu durumu korunuyor.

Logo masaüstünde en fazla 650px, dar ekranlarda 85vw. Bar 240–300px, dar ekranlarda en fazla 75vw. Yeni raster varlık, harici istek veya bağımlılık eklenmedi. Bar transform ile doluyor; veri indirme yüzdesi değildir. Gerçek DOM/font/sahne hazırlığı ekranın kapanışını belirlemeye devam eder.

İlk oturum girişinde minimum 1800ms gösterim ve 500ms çıkış. Aynı sekmenin sessionStorage kaydına göre sonraki ziyaretlerde minimum bekleme yok, çıkış 180ms. Depolama engelliyse ilk giriş davranışı güvenle devam eder. Azaltılmış hareket tercihinde bekleme ve animasyon yok. Hazırlık sonuçlanmazsa 4000ms fail-open ve en fazla 200ms çıkış sürer; JS kapalıyken içerik görünür.

Hero'daki üç satır özgün, tek taraflı defne dalı SVG ile işaretlendi. Sembol masaüstünde 22px, mobilde 17px. Satır kaydırıldığında metin aynı kolon altında kalır. Antigravity sahne ve hero düzeni korunur.

Doğrulama: Astro check 19 dosyada sıfır hata/uyarı; build 13 HTML sayfa; statik kontroller 2184/2184; loading yaşam döngüsü 6 senaryoda başarılı (`npm run verify:loader`). Browser aracı sandbox ortam hatası verdiği için yeni tasarımın canlı görsel kontrolü tamamlanmadı. Bu testler gerçek cihazda görsel/GPU doğrulamasının yerine geçmez.
