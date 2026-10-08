# Ekip bölümü — v1 hiyerarşi düzenlemesi

## Temel alınan sürüm

Antigravity değişiklikleri: `65878b2` mobil hero yerleşimi, tipografi ve kontrast; `2b81841` masaüstü terazi kadrajı, hareket yolu ve ışık dengesi. Bu iki commit güncel temel olarak alındı. Önceki kesintiye uğrayan yerel mobil taslak `Preserve interrupted Codex mobile draft before Antigravity sync` isimli Git stash kaydında saklandı; yeni mobil düzenlemelerin üzerine uygulanmadı.

## Görsel ve bilgisel sıra

- Kurucu: başlık, daha büyük dairesel portre, Arb. Av. Tuğrul Toraman, eğitim.
- Ekibimiz: Av. Efe Cem Toraman, Av. Doğukan Petek, Sevilay Lektemur / Asistan. Portreler masaüstünde ve mobilde kaydırılmış serbest akışı sürdürür.
- Referans Büromuz: ayrı grup başlığı, portre, Arb. Av. Senay Kılıç, eğitim. Toraman büro çalışanlarıyla aynı düzeyde sunulmaz.

İlişki bilgisi içerik verisindeki `group` alanıyla belirlenir. Render işlemi dizi sırasına veya kişinin adına bağlı değildir. Başlıklar H2 → H3 → H4 sırasını izler. Yeni kutu, kart zemini veya panel eklenmedi. Terazi ve hero değişikliklerine dokunulmadı; sahne bölüm konumlarını ResizeObserver ile ölçmeye devam eder.

Mobilde kurucu portresi diğer ekip portrelerinden daha geniştir; metin ve eğitim bilgileri portrenin altında kalır. Referans grubu ayrı boşluk ve hafif sağ kaydırmayla ayrılır. Sabit piksel genişliğinde kartlar yerine yüzde genişlikler ve üst sınırlar kullanılır.

## Doğrulama

Astro check: 18 dosya, sıfır hata/uyarı/ipucu. Build: 13 HTML sayfa. Mevcut statik doğrulama: 2184 kontrol, sıfır başarısızlık.

Canlı tarayıcı kontrolü tamamlanamadı: Computer Use ortamı sandbox başlatma hatasıyla kapandı; oturumu sıfırlayıp yeniden denemek de aynı hatayı verdi. Responsive CSS uygulanmış olması, gerçek tarayıcıda görsel onay yapıldığı anlamına gelmez. Yeni kurucu ve referans yerleşimleri için mobil/masaüstü canlı kontrol hâlâ gereklidir.
