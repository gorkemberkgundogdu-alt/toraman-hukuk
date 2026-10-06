export interface FAQItem {
  question: string;
  answer: string;
}

export interface PracticeArea {
  id: string;
  slug: string;
  title: string;
  description: string;
  topics: string[];
  paragraphs: string[];
  faqs: FAQItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  education?: string;
  image: string;
}

// This is a proposed production origin, not a confirmed deployment domain.
const configuredSite = new URL(import.meta.env.PUBLIC_SITE_URL || 'https://toramanhukuk.com');
if (!['https:', 'http:'].includes(configuredSite.protocol) || configuredSite.username || configuredSite.password || configuredSite.pathname !== '/' || configuredSite.search || configuredSite.hash) {
  throw new Error('PUBLIC_SITE_URL must be an absolute HTTP(S) origin without a path, credentials, query or fragment.');
}
export const siteUrl = configuredSite.origin;
// Preview builds are noindex until the deployment owner explicitly opts in.
export const allowIndexing = import.meta.env.PUBLIC_INDEXABLE === 'true' && !import.meta.env.DEV;
export const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).href;

export const firm = {
  name: 'Toraman Hukuk',
  telephone: '0216 414 04 04',
  phoneHref: 'tel:+902164140404',
  email: 'tugrul@toramanhukuk.com',
  emailHref: 'mailto:tugrul@toramanhukuk.com',
  address: 'Bahariye Caddesi, Sakızgülü Sokak, Fevzi Çakmak Apartmanı No: 31/9, Kadıköy / İstanbul',
  hours: 'Hafta içi 09.00–18.00',
  founded: 2004,
  founder: 'Tuğrul Toraman',
  description: 'Toraman Hukuk, 2004 yılından bu yana hukuki danışmanlık, dava takibi ve uyuşmazlık çözümü hizmetleri sunmaktadır.',
  about: 'Toraman Hukuk, 2004 yılında İstanbul Barosu’na kayıtlı Arabulucu Avukat Tuğrul Toraman tarafından Kadıköy’de kurulmuştur.',
  mapHref: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('Bahariye Caddesi, Sakızgülü Sokak, Fevzi Çakmak Apartmanı No: 31/9, Kadıköy İstanbul'),
};

export const areas: PracticeArea[] = [
  {
    id: '01', slug: 'idare-vergi-hukuku', title: 'İdare & Vergi Hukuku',
    description: 'İdari işlemler ve vergilendirmeden doğan hukuki meselelerde danışmanlık ve temsil hizmeti sunuyoruz. Başvuru, itiraz ve dava süreçlerini konunun özelliklerine göre birlikte değerlendiriyoruz.',
    topics: ['İdari işlemlerin hukuki değerlendirmesi', 'İdari başvuru ve itirazlar', 'Vergilendirmeden doğan uyuşmazlıklar', 'İdari ve vergi davalarının takibi'],
    paragraphs: [
      'İdareyle yaşanan bir uyuşmazlıkta işlemin içeriği kadar nasıl bildirildiği ve hangi belgelerle desteklendiği de değerlendirilir. İdari kararlar, başvuru kayıtları ve yazışmalar birlikte incelenerek hukuki meselenin çerçevesi belirlenir.',
      'Vergilendirmeye ilişkin meselelerde bildirimler, işlem dayanakları ve mali belgeler arasındaki ilişki ele alınır. Başvuru, itiraz ve dava seçenekleri; işlemin niteliği, dosyanın mevcut aşaması ve ilgili usul kuralları doğrultusunda değerlendirilir.',
    ],
    faqs: [
      { question: 'İdari bir işlemle ilgili görüşmeye hangi belgeler yardımcı olur?', answer: 'İşlemin veya bildirimin bir örneği, tebliğe ilişkin kayıtlar, daha önce yapılan başvurular ve idareyle yazışmalar konunun anlaşılmasına yardımcı olur. Dosyaya özgü belge ihtiyacı ilk iletişimde ayrıca değerlendirilebilir.' },
      { question: 'İdari başvuru ile dava aynı süreç midir?', answer: 'İdareye yapılan başvuru ile yargısal inceleme farklı süreçlerdir. Hangi yolun değerlendirileceği ve bu yolların birbiriyle ilişkisi, işlemin türü ve dosyanın koşullarına göre ele alınır.' },
    ],
  },
  {
    id: '02', slug: 'bankacilik-finans-hukuku', title: 'Bankacılık & Finans Hukuku',
    description: 'Kredi ilişkileri, finansman sözleşmeleri ve bankacılık işlemlerinin hukuki boyutunu ele alıyoruz. Sözleşmelerin incelenmesinden ortaya çıkan uyuşmazlıkların takibine kadar hukuki destek sağlıyoruz.',
    topics: ['Kredi ve finansman sözleşmeleri', 'Ödeme ve teminat düzenlemeleri', 'Bankacılık işlemlerinden doğan uyuşmazlıklar', 'Sözleşme incelemesi ve hukuki danışmanlık'],
    paragraphs: [
      'Finansman ilişkilerinde tarafların yükümlülükleri, ödeme koşulları ve teminat düzenlemeleri sözleşmenin bütünü içinde incelenir. Sözleşme metni, ekleri ve işlem kayıtları üzerinden ilişkinin hukuki yapısı değerlendirilir.',
      'Uyuşmazlık ortaya çıktığında sözleşmede kararlaştırılan koşullar ile işlemlerin fiilî seyri birlikte ele alınır. Hesap dökümleri, ödeme belgeleri ve taraflar arasındaki bildirimler; danışmanlık ve uyuşmazlık takibinin hazırlanmasına katkı sağlar.',
    ],
    faqs: [
      { question: 'Bir finansman sözleşmesi imzalanmadan önce incelenebilir mi?', answer: 'Sözleşme taslağı ve ekleri üzerinden tarafların hakları, yükümlülükleri ve teminat koşulları hukuki açıdan değerlendirilebilir. İncelemenin kapsamı, finansman ilişkisinin özelliklerine göre belirlenir.' },
      { question: 'Bankacılık uyuşmazlığında hangi kayıtlar değerlendirilir?', answer: 'İlgili sözleşme, hesap ve işlem dökümleri, ödeme belgeleri, teminat evrakı ve bankayla yapılan yazışmalar değerlendirmenin temelini oluşturabilir. Her dosyada gerekli kayıtlar farklılaşabilir.' },
    ],
  },
  {
    id: '03', slug: 'tuketici-hukuku', title: 'Tüketici Hukuku',
    description: 'Mal ve hizmet alımlarında tüketiciler ile işletmeler arasında doğan uyuşmazlıklara yönelik hukuki destek sunuyoruz. Ayıplı ürün ve hizmetler, sözleşmeler ve tüketici başvuruları kapsamında süreçleri takip ediyoruz.',
    topics: ['Mal ve hizmet alımına ilişkin sözleşmeler', 'Ayıplı ürün ve hizmet uyuşmazlıkları', 'Tüketici başvurularının değerlendirilmesi', 'Tüketici ile işletme arasındaki uyuşmazlıklar'],
    paragraphs: [
      'Mal veya hizmet alımında yaşanan sorun, satış ya da hizmet sözleşmesi ve işlem kayıtları üzerinden değerlendirilir. Ürünün veya hizmetin özellikleri, tarafların açıklamaları ve teslim ya da ifa koşulları hukuki incelemenin parçasıdır.',
      'Tüketici ile işletme arasındaki yazışmalar, faturalar ve ilgili kayıtlar uyuşmazlığın somutlaştırılmasına yardımcı olur. Başvuru ve yargısal süreçler, işlem türüne ve talebin niteliğine göre ele alınır; her uyuşmazlık için aynı yolun geçerli olduğu varsayılmaz.',
    ],
    faqs: [
      { question: 'Ürün veya hizmet sorununda hangi belgeler önemlidir?', answer: 'Fatura, sipariş veya sözleşme kaydı, teslim belgesi, sorunla ilgili fotoğraflar ve satıcı ya da hizmet sağlayıcıyla yapılan yazışmalar incelemeye yardımcı olabilir.' },
      { question: 'Her tüketici uyuşmazlığında aynı başvuru yolu mu kullanılır?', answer: 'Başvuru yolu; işlemin, talebin ve uyuşmazlığın özelliklerine göre değişebilir. Uygun yol dosya üzerinden ve güncel düzenlemeler dikkate alınarak değerlendirilir.' },
    ],
  },
  {
    id: '04', slug: 'sirketler-hukuku', title: 'Şirketler Hukuku',
    description: 'Şirketlerin kuruluşu, günlük faaliyetleri ve ortaklık ilişkilerinde hukuki danışmanlık sağlıyoruz. Ticari sözleşmeleri, şirket kararlarını ve ortaklar arasında doğan uyuşmazlıkları bütünlüklü bir yaklaşımla ele alıyoruz.',
    topics: ['Şirket kuruluşu ve ortaklık yapısı', 'Ticari sözleşmelerin incelenmesi', 'Şirket kararları ve faaliyetlerine ilişkin danışmanlık', 'Ortaklar arasındaki uyuşmazlıklar'],
    paragraphs: [
      'Şirketin hukuki ihtiyaçları; faaliyet konusu, ortaklık yapısı ve ticari ilişkileriyle birlikte değerlendirilir. Kuruluş belgeleri, şirket kararları ve sözleşmeler arasındaki uyum, günlük faaliyetlere ilişkin danışmanlığın önemli bir parçasıdır.',
      'Ortaklık ilişkilerinde veya ticari sözleşmelerde ortaya çıkan meseleler, tarafların hak ve yükümlülükleri üzerinden ele alınır. İlgili kararlar, sözleşme metinleri ve yazışmalar incelenerek danışmanlık ve uyuşmazlık takibinin kapsamı belirlenir.',
    ],
    faqs: [
      { question: 'Şirket danışmanlığı yalnızca dava aşamasını mı kapsar?', answer: 'Şirket danışmanlığı; kuruluş, sözleşmeler, şirket kararları ve günlük faaliyetlerin hukuki değerlendirmesini de kapsayabilir. İhtiyaç duyulan destek şirketin yapısı ve ele alınacak konu üzerinden belirlenir.' },
      { question: 'Ortaklık uyuşmazlığında hangi belgeler incelenir?', answer: 'Şirket sözleşmesi, varsa ortaklar arasındaki sözleşmeler, ilgili şirket kararları ve uyuşmazlığa ilişkin yazışmalar incelemeye yardımcı olur. Konuya bağlı olarak ticari kayıtlar da değerlendirilebilir.' },
    ],
  },
  {
    id: '05', slug: 'ceza-hukuku', title: 'Ceza Hukuku',
    description: 'Soruşturma ve kovuşturma aşamalarında savunma ve hukuki temsil hizmeti sunuyoruz. Dosyanın koşullarını, delilleri ve usule ilişkin hakları değerlendirerek süreci takip ediyoruz.',
    topics: ['Soruşturma aşamasında hukuki destek', 'Kovuşturma aşamasında savunma ve temsil', 'Delillerin ve dosya belgelerinin değerlendirilmesi', 'Usule ilişkin hakların incelenmesi'],
    paragraphs: [
      'Ceza dosyalarında hukuki değerlendirme, kişinin süreçteki sıfatı ve dosyanın bulunduğu aşama dikkate alınarak yapılır. Olayın anlatımı, mevcut belgeler ve dosyadaki deliller birlikte incelenir.',
      'Savunma ve temsil hazırlığında isnat edilen olay ile usule ilişkin meseleler ayrı ayrı ele alınır. İfade ve duruşma tutanakları, bildirimler ve diğer dosya belgeleri üzerinden sürecin hukuki çerçevesi değerlendirilir.',
    ],
    faqs: [
      { question: 'Soruşturma ve kovuşturma için destek veriliyor mu?', answer: 'Toraman Hukuk, ceza hukukunda soruşturma ve kovuşturma aşamalarına ilişkin savunma ve hukuki temsil hizmetleri sunar. Destek kapsamı kişinin dosyadaki sıfatına ve konunun özelliklerine göre değerlendirilir.' },
      { question: 'Ceza dosyasıyla ilgili ilk iletişimde hangi bilgiler yararlıdır?', answer: 'Biliniyorsa dosya numarası, ilgili makam, gelen bildirim ve sürecin mevcut aşaması konunun anlaşılmasına yardımcı olur. Elinizde bulunan ifade veya duruşma tutanakları da değerlendirmeye katkı sağlayabilir.' },
    ],
  },
  {
    id: '06', slug: 'enerji-maden-hukuku', title: 'Enerji & Maden Hukuku',
    description: 'Enerji ve madencilik faaliyetlerinin izin, sözleşme ve mevzuat boyutlarında hukuki destek sağlıyoruz. Yatırım ve işletme süreçlerinde ortaya çıkan idari ve ticari uyuşmazlıkları ele alıyoruz.',
    topics: ['İzin süreçlerinin hukuki değerlendirmesi', 'Enerji ve madencilik sözleşmeleri', 'Yatırım ve işletme faaliyetlerine ilişkin danışmanlık', 'İdari ve ticari uyuşmazlıklar'],
    paragraphs: [
      'Enerji ve madencilik faaliyetlerinde hukuki ihtiyaçlar, projenin veya işletmenin aşamasıyla birlikte değerlendirilir. İzin belgeleri, idari yazışmalar ve sözleşmeler, faaliyetin hukuki çerçevesini anlamak için birlikte incelenir.',
      'İdareyle veya ticari taraflarla yaşanan uyuşmazlıklarda ilgili işlem ve sözleşmenin niteliği esas alınır. Yatırım ve işletme süreçlerine ilişkin belgeler üzerinden danışmanlık, başvuru ve uyuşmazlık takibinin kapsamı değerlendirilir.',
    ],
    faqs: [
      { question: 'Enerji ve maden faaliyetlerinde hangi konular ele alınıyor?', answer: 'İzin süreçleri, faaliyetle ilgili sözleşmeler, mevzuatın hukuki değerlendirmesi ve bu faaliyetlerden doğan idari veya ticari uyuşmazlıklar ele alınır. Somut hizmet kapsamı projenin özelliklerine göre belirlenir.' },
      { question: 'Bir yatırımın hukuki değerlendirmesi için hangi belgeler yararlıdır?', answer: 'Mevcut izinler, idari bildirimler, sözleşmeler ve yatırımın bulunduğu aşamayı gösteren belgeler yararlı olabilir. Gerekli belgeler faaliyetin niteliğine göre ayrıca değerlendirilir.' },
    ],
  },
  {
    id: '07', slug: 'icra-iflas-hukuku', title: 'İcra & İflas Hukuku',
    description: 'Alacakların tahsili, icra takipleri ve borç ilişkilerinden doğan uyuşmazlıklarda hukuki destek sunuyoruz. Alacaklı ve borçlu tarafların durumunu değerlendirerek takip, itiraz ve dava süreçlerini yürütüyoruz.',
    topics: ['Alacak ve borç ilişkilerinin değerlendirilmesi', 'İcra takiplerinin hazırlanması ve takibi', 'Takibe ilişkin itiraz ve uyuşmazlıklar', 'İcra ve iflas süreçlerinin hukuki incelenmesi'],
    paragraphs: [
      'Alacak veya borç ilişkisi, dayandığı sözleşme ve işlem kayıtları üzerinden incelenir. Ödeme belgeleri, tarafların yazışmaları ve varsa mevcut takip dosyası, hukuki durumun değerlendirilmesine yardımcı olur.',
      'Takip, itiraz ve dava süreçlerinde dosyanın aşaması ile tarafların konumu birlikte ele alınır. İcra ve iflas meselelerinde başvuru seçenekleri ve usule ilişkin konular somut dosya üzerinden değerlendirilir; tahsilat ya da sonuç garantisi verilmez.',
    ],
    faqs: [
      { question: 'İcra takibi konusunda hem alacaklı hem borçlu destek alabilir mi?', answer: 'Alacaklı ve borçlu tarafların hukuki durumu ayrı ayrı değerlendirilebilir. Hizmet kapsamı dosyanın niteliği, mevcut aşaması ve temsil koşulları üzerinden belirlenir.' },
      { question: 'Ödeme emri veya takip belgesi aldıysam hangi bilgileri paylaşmalıyım?', answer: 'Gelen belgenin tamamı, bildirime ilişkin kayıtlar, dosya numarası ve borç ilişkisine dair sözleşme ya da ödeme belgeleri değerlendirmeye yardımcı olur. Başvuru ve itiraz koşulları dosya üzerinden incelenir.' },
    ],
  },
  {
    id: '08', slug: 'saglik-ilac-hukuku', title: 'Sağlık & İlaç Hukuku',
    description: 'Sağlık hizmetleri ve ilaç sektöründeki faaliyetlerin hukuki boyutunu değerlendiriyoruz. Hasta hakları, mesleki sorumluluk, sözleşmeler ve ilgili düzenlemelerden doğan meselelerde danışmanlık ve temsil sağlıyoruz.',
    topics: ['Hasta haklarına ilişkin hukuki meseleler', 'Mesleki sorumluluk uyuşmazlıkları', 'Sağlık ve ilaç alanındaki sözleşmeler', 'Sektörel düzenlemelerin hukuki değerlendirmesi'],
    paragraphs: [
      'Sağlık hizmetine ilişkin bir hukuki meselede hizmetin koşulları, ilgili kayıtlar ve tarafların konumu birlikte değerlendirilir. Hasta hakları ve mesleki sorumluluk konuları, somut olayın belgeleri üzerinden ele alınır.',
      'Sağlık ve ilaç alanındaki faaliyetlerde sözleşmeler ile ilgili düzenlemeler arasındaki ilişki incelenir. Danışmanlık ve temsilin kapsamı, faaliyetin niteliği ve uyuşmazlığın özellikleri doğrultusunda belirlenir.',
    ],
    faqs: [
      { question: 'Sağlık hukukuna ilişkin değerlendirmede hangi belgeler yararlıdır?', answer: 'Konuyla ilgili sağlık kayıtları, raporlar, hizmet belgeleri ve taraflar arasındaki yazışmalar incelemeye yardımcı olabilir. Hangi belgelerin gerekli olduğu olayın özelliklerine göre belirlenir.' },
      { question: 'İlaç sektöründeki sözleşmeler de kapsamda mı?', answer: 'Sağlık ve ilaç sektöründeki faaliyetlere ilişkin sözleşmelerin hukuki değerlendirmesi çalışma alanının kapsamındadır. İncelenecek konu ve destek ihtiyacı ilgili sözleşme ve faaliyete göre ele alınır.' },
    ],
  },
  {
    id: '09', slug: 'is-sosyal-guvenlik-hukuku', title: 'İş & Sosyal Güvenlik Hukuku',
    description: 'İşçi ve işveren ilişkilerinde sözleşme, çalışma koşulları ve iş ilişkisinin sona ermesine ilişkin hukuki destek sunuyoruz. İşçilik alacakları ve sosyal güvenlik uyuşmazlıklarında başvuru ve dava süreçlerini takip ediyoruz.',
    topics: ['İş sözleşmeleri ve çalışma koşulları', 'İş ilişkisinin sona ermesine ilişkin meseleler', 'İşçilik alacakları ve uyuşmazlıklar', 'Sosyal güvenlik başvuru ve dava süreçleri'],
    paragraphs: [
      'İş ilişkisi, sözleşme hükümleriyle birlikte fiilî çalışma koşulları üzerinden değerlendirilir. Çalışmaya, ödemelere ve iş ilişkisinin sona ermesine ilişkin kayıtlar; tarafların hak ve yükümlülüklerinin incelenmesine katkı sağlar.',
      'İşçilik alacakları ve sosyal güvenlik meselelerinde uyuşmazlığın niteliği ile mevcut belgeler esas alınır. Başvuru ve dava seçenekleri, işçi veya işverenin somut durumuna göre değerlendirilir.',
    ],
    faqs: [
      { question: 'İşçi ve işveren için hukuki danışmanlık sunuluyor mu?', answer: 'İş sözleşmeleri, çalışma koşulları ve iş ilişkisinden doğan uyuşmazlıklarda işçi ve işverenin hukuki ihtiyaçları değerlendirilebilir. Temsil ve danışmanlık kapsamı somut konu üzerinden belirlenir.' },
      { question: 'İş uyuşmazlığı görüşmesi için hangi kayıtlar yararlıdır?', answer: 'İş sözleşmesi, ücret ve ödeme kayıtları, çalışmaya ilişkin belgeler, varsa fesih bildirimi ve ilgili yazışmalar incelemeye yardımcı olur. Sosyal güvenlik konularında ilgili kurum kayıtları da değerlendirilebilir.' },
    ],
  },
  {
    id: '10', slug: 'uyusmazlik-cozumu', title: 'Uyuşmazlık Çözümü',
    description: 'Uyuşmazlıkları, tarafların ihtiyaçları ve çözüm seçenekleri doğrultusunda değerlendiriyoruz. Müzakere, arabuluculuk ve yargısal süreçlerde konunun niteliğine uygun bir yol belirlenmesine destek oluyoruz.',
    topics: ['Uyuşmazlığın ve çözüm seçeneklerinin değerlendirilmesi', 'Müzakere süreçlerine hukuki destek', 'Arabuluculuk süreçlerinin değerlendirilmesi', 'Yargısal süreçlerde hukuki temsil'],
    paragraphs: [
      'Bir uyuşmazlığın değerlendirilmesi, tarafların taleplerini ve ihtilafın dayandığı ilişkiyi anlamakla başlar. Sözleşmeler, yazışmalar ve mevcut başvurular üzerinden anlaşmazlığın kapsamı belirlenir.',
      'Müzakere, arabuluculuk ve yargısal süreçler konunun niteliği doğrultusunda ele alınır. Tarafların ihtiyaçları ve dosyanın koşulları değerlendirilerek uygun seçeneklerin anlaşılmasına destek olunur; uzlaşma veya dava sonucu önceden garanti edilmez.',
    ],
    faqs: [
      { question: 'Bir uyuşmazlık için yalnızca dava yolu mu değerlendirilir?', answer: 'Konunun niteliğine göre müzakere, arabuluculuk ve yargısal süreçler birlikte değerlendirilebilir. Hangi seçeneklerin uygun olduğu, uyuşmazlığın koşulları ve ilgili usul kuralları üzerinden incelenir.' },
      { question: 'Arabuluculuk her uyuşmazlık için aynı şekilde mi işler?', answer: 'Arabuluculuğun koşulları ve diğer süreçlerle ilişkisi uyuşmazlığın türüne göre farklılaşabilir. Somut dosyada uygulanacak çerçeve ayrıca değerlendirilir; tek bir yöntemin her konu için uygun olduğu varsayılmaz.' },
    ],
  },
  {
    id: '11', slug: 'basin-medya-hukuku', title: 'Basın & Medya Hukuku',
    description: 'Basılı yayınlar, dijital medya ve sosyal medya faaliyetlerinden doğan hukuki meseleleri ele alıyoruz. Kişilik hakları, yayın içerikleri ve medya sözleşmeleri kapsamında danışmanlık ve temsil hizmeti sağlıyoruz.',
    topics: ['Basılı ve dijital yayınlara ilişkin meseleler', 'Sosyal medya içeriklerinin hukuki değerlendirmesi', 'Kişilik haklarına ilişkin uyuşmazlıklar', 'Medya sözleşmeleri ve hukuki danışmanlık'],
    paragraphs: [
      'Yayın ve içeriklere ilişkin hukuki meseleler; içeriğin tamamı, yayımlandığı ortam ve tarafların konumu dikkate alınarak değerlendirilir. Basılı yayınlar ile dijital ve sosyal medya içerikleri, kendi bağlamları içinde incelenir.',
      'Kişilik haklarıyla ilgili uyuşmazlıklar ve medya sözleşmeleri kapsamında belgeler, yayın kayıtları ve yazışmalar birlikte ele alınır. Danışmanlık ve temsilin kapsamı, içeriğin niteliğine ve somut hukuki ihtiyaca göre belirlenir.',
    ],
    faqs: [
      { question: 'Sosyal medya yayınları da bu çalışma alanına girer mi?', answer: 'Sosyal medya faaliyetlerinden doğan kişilik hakları, içerik ve sözleşme meseleleri bu çalışma alanında değerlendirilir. Her paylaşım kendi içeriği ve yayımlandığı bağlam üzerinden incelenir.' },
      { question: 'Bir yayınla ilgili hukuki incelemede hangi bilgiler yararlıdır?', answer: 'Yayının tamamı, bağlantısı veya basılı örneği, yayın tarihi ve ilgili yazışmalar değerlendirmeye yardımcı olabilir. Dijital içerik için mevcut ekran görüntüleri de konunun anlaşılmasına katkı sağlayabilir.' },
    ],
  },
  {
    id: '12', slug: 'gayrimenkul-hukuku', title: 'Gayrimenkul Hukuku',
    description: 'Taşınmazların alım satımı, kiralanması ve kullanımına ilişkin hukuki destek sunuyoruz. Tapu işlemleri, kira ilişkileri ve mülkiyetten doğan uyuşmazlıklarda sözleşme ve dava süreçlerini takip ediyoruz.',
    topics: ['Taşınmaz alım satım sözleşmeleri', 'Kira ilişkileri ve sözleşmeler', 'Tapu ve mülkiyete ilişkin hukuki meseleler', 'Taşınmaz kullanımından doğan uyuşmazlıklar'],
    paragraphs: [
      'Taşınmazla ilgili hukuki değerlendirmede tapu bilgileri, sözleşmeler ve taşınmazın kullanımına ilişkin kayıtlar birlikte incelenir. Alım satım veya kiralama sürecinde tarafların hak ve yükümlülükleri sözleşmenin bütünü üzerinden ele alınır.',
      'Kira ve mülkiyet uyuşmazlıklarında ilgili belgeler ile ilişkinin fiilî durumu değerlendirilir. Sözleşme incelemesi, başvuru ve dava takibinin kapsamı taşınmazın ve uyuşmazlığın özelliklerine göre belirlenir.',
    ],
    faqs: [
      { question: 'Kira sözleşmesi imzalanmadan önce hukuki değerlendirme yapılabilir mi?', answer: 'Kira sözleşmesi taslağı, tarafların yükümlülükleri ve taşınmazın kullanım koşulları üzerinden incelenebilir. Değerlendirme sözleşmenin ve kiralama ilişkisinin özelliklerine göre yapılır.' },
      { question: 'Gayrimenkul uyuşmazlığı için hangi belgeler yararlıdır?', answer: 'Tapu bilgileri, ilgili satış veya kira sözleşmesi, ödeme kayıtları, bildirimler ve taraflar arasındaki yazışmalar incelemeye yardımcı olabilir. Gerekli belgeler uyuşmazlığın niteliğine göre farklılaşır.' },
    ],
  },
];

export const team: TeamMember[] = [
  { name: 'Tuğrul Toraman', role: 'Arb. Av. · Kurucu', education: 'Dokuz Eylül Üniversitesi Hukuk Fakültesi', image: '/images/tugrul.webp' },
  { name: 'Efe Cem Toraman', role: 'Av.', education: 'Bahçeşehir Üniversitesi Hukuk Fakültesi', image: '/images/efe.webp' },
  { name: 'Doğukan Petek', role: 'Av.', education: 'İstanbul Ticaret Üniversitesi Hukuk Fakültesi', image: '/images/dogukan.webp' },
  { name: 'Senay Kılıç', role: 'Av.', education: 'Marmara Üniversitesi Hukuk Fakültesi', image: '/images/senay.webp' },
  { name: 'Sevilay Lektemur', role: 'Asistan', image: '/images/sevilay.webp' },
];

export const faqs: FAQItem[] = [
  { question: 'Büroya nasıl ulaşabilirim?', answer: 'Büromuz Bahariye Caddesi, Sakızgülü Sokak, Fevzi Çakmak Apartmanı No: 31/9, Kadıköy / İstanbul adresindedir. 0216 414 04 04 numaralı telefondan veya tugrul@toramanhukuk.com adresinden iletişime geçebilirsiniz.' },
  { question: 'Çalışma saatleriniz nedir?', answer: 'Büromuz hafta içi 09.00–18.00 saatleri arasında çalışmaktadır.' },
  { question: 'İlk görüşme için nasıl iletişime geçebilirim?', answer: 'İlk görüşmeyle ilgili bilgi ve randevu için 0216 414 04 04 numaralı telefonu arayabilir veya tugrul@toramanhukuk.com adresine e-posta gönderebilirsiniz.' },
  { question: 'Hangi alanlarda hukuki destek sunuyorsunuz?', answer: 'İdare ve vergi, bankacılık ve finans, tüketici, şirketler, ceza, enerji ve maden, icra ve iflas, sağlık ve ilaç, iş ve sosyal güvenlik, uyuşmazlık çözümü, basın ve medya ile gayrimenkul alanlarında hukuki destek sunuyoruz. Her alanın kapsamına çalışma alanları sayfalarından ulaşabilirsiniz.' },
  { question: 'Görüşmeye hangi belgeleri hazırlamalıyım?', answer: 'Konuyla ilgili sözleşmeler, bildirimler, yazışmalar ve varsa dosya bilgileri görüşmenin hazırlanmasına yardımcı olabilir. Konunuza özgü belge ihtiyacını ilk iletişim sırasında büroyla görüşebilirsiniz.' },
];

export const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': absoluteUrl('/#bureau'),
  name: firm.name,
  url: absoluteUrl('/'),
  description: firm.description,
  telephone: '+90 216 414 04 04',
  email: firm.email,
  foundingDate: String(firm.founded),
  founder: { '@type': 'Person', name: firm.founder },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bahariye Caddesi, Sakızgülü Sokak, Fevzi Çakmak Apartmanı No: 31/9',
    addressLocality: 'Kadıköy',
    addressRegion: 'İstanbul',
    addressCountry: 'TR',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => `https://schema.org/${day}`),
    opens: '09:00', closes: '18:00',
  },
};
