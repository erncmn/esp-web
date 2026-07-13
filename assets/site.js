/* Easy Stacking Planner — site ortak JS: 5 dilli i18n + menü/footer + dil seçici + indirme formu */
(function () {
  'use strict';

  // Deploy sonrası doldurun: indirme/lead API adresi (webhook /download)
  var ESP_DOWNLOAD_API = 'https://lisans.biltech.ee/download';

  var LANGS = [
    { code: 'tr', label: '🇹🇷 Türkçe' }, { code: 'en', label: '🇬🇧 English' },
    { code: 'de', label: '🇩🇪 Deutsch' }, { code: 'fr', label: '🇫🇷 Français' },
    { code: 'es', label: '🇪🇸 Español' },
  ];

  // ---- Sözlük (nav/footer + tüm sayfalar) ----
  var T = {
    // menü / footer
    nav_home:{tr:'Ana Sayfa',en:'Home',de:'Start',fr:'Accueil',es:'Inicio'},
    nav_features:{tr:'Özellikler',en:'Features',de:'Funktionen',fr:'Fonctions',es:'Funciones'},
    nav_pricing:{tr:'Fiyatlandırma',en:'Pricing',de:'Preise',fr:'Tarifs',es:'Precios'},
    nav_faq:{tr:'SSS',en:'FAQ',de:'FAQ',fr:'FAQ',es:'FAQ'},
    nav_trial:{tr:'Ücretsiz Dene',en:'Free Trial',de:'Kostenlos testen',fr:'Essai gratuit',es:'Prueba gratis'},
    foot_tagline:{tr:'Konteyner ve TIR yükleme planlama yazılımı.',en:'Container & truck load-planning software.',de:'Software zur Lade­planung für Container & LKW.',fr:'Logiciel de plan de chargement conteneur & camion.',es:'Software de planificación de carga para contenedores y camiones.'},
    foot_privacy:{tr:'Gizlilik',en:'Privacy',de:'Datenschutz',fr:'Confidentialité',es:'Privacidad'},
    foot_contact:{tr:'İletişim',en:'Contact',de:'Kontakt',fr:'Contact',es:'Contacto'},
    foot_rights:{tr:'Tüm hakları saklıdır.',en:'All rights reserved.',de:'Alle Rechte vorbehalten.',fr:'Tous droits réservés.',es:'Todos los derechos reservados.'},

    // ---- ANA SAYFA ----
    hero_h1:{tr:'Konteyner ve TIR yüklemesini saniyeler içinde planlayın.',en:'Plan container & truck loading in seconds.',de:'Container- und LKW-Beladung in Sekunden planen.',fr:'Planifiez le chargement conteneur & camion en quelques secondes.',es:'Planifique la carga de contenedores y camiones en segundos.'},
    hero_lead:{tr:'TIR, kamyon ve konteyner için 2D/3D otomatik ve elle yükleme simülasyonu. Şerit optimizasyonu, ağırlık & denge kontrolü, aks yükü, taşma hesabı, çoklu ekipman ve kurumsal PDF rapor — tek programda.',en:'2D/3D automatic and manual load simulation for trucks and containers. Lane optimization, weight & balance, axle load, overhang, multi-equipment and corporate PDF reports — all in one.',de:'2D/3D-Beladungssimulation für LKW und Container. Reihen­optimierung, Gewicht & Balance, Achslast, Überhang, Mehrfach­ausrüstung und PDF-Berichte — alles in einem.',fr:'Simulation de chargement 2D/3D pour camions et conteneurs. Optimisation, poids & équilibre, charge à l’essieu, débord, multi-équipement et rapports PDF — tout en un.',es:'Simulación de carga 2D/3D para camiones y contenedores. Optimización, peso y equilibrio, carga por eje, voladizo, multi-equipo e informes PDF — todo en uno.'},
    hero_cta1:{tr:'Ücretsiz İndir',en:'Free Download',de:'Kostenlos laden',fr:'Télécharger',es:'Descargar gratis'},
    hero_cta2:{tr:'Özellikleri Gör',en:'See Features',de:'Funktionen',fr:'Voir les fonctions',es:'Ver funciones'},
    hero_note:{tr:'✓ 15 gün tam Pro deneme · ✓ Tek tıkla kurulum · ✓ Windows',en:'✓ 15-day full Pro trial · ✓ One-click install · ✓ Windows',de:'✓ 15 Tage Pro-Test · ✓ Ein-Klick-Installation · ✓ Windows',fr:'✓ Essai Pro 15 jours · ✓ Installation en un clic · ✓ Windows',es:'✓ Prueba Pro de 15 días · ✓ Instalación en un clic · ✓ Windows'},
    shot_ph:{tr:'Uygulama ekran görüntüsü (3D yükleme görünümü)',en:'App screenshot (3D loading view)',de:'App-Screenshot (3D-Ansicht)',fr:'Capture (vue 3D)',es:'Captura (vista 3D)'},
    h_feat_title:{tr:'Neler yapar?',en:'What it does',de:'Was es kann',fr:'Ce qu’il fait',es:'Qué hace'},
    h_feat_sub:{tr:'Lojistik ekipleri için gerçek yükleme planlama araçları.',en:'Real load-planning tools for logistics teams.',de:'Echte Ladeplanungs-Tools für Logistikteams.',fr:'De vrais outils de plan de chargement.',es:'Herramientas reales de planificación de carga.'},
    f1_t:{tr:'Otomatik yükleme',en:'Auto-loading',de:'Auto-Beladung',fr:'Chargement auto',es:'Carga automática'},
    f1_d:{tr:'Yük listesini girin, en verimli dizilimi program bulsun — palet şeritleri, kat kat istif, ağırlık limiti dikkate alınır.',en:'Enter your cargo, the app finds the most efficient layout — pallet lanes, layers, weight limits.',de:'Ladung eingeben, die App findet das effizienteste Layout.',fr:'Saisissez la charge, l’appli trouve la disposition optimale.',es:'Introduzca la carga y la app encuentra la disposición óptima.'},
    f2_t:{tr:'Elle sürükle-bırak',en:'Manual drag & drop',de:'Manuell per Drag & Drop',fr:'Glisser-déposer',es:'Arrastrar y soltar'},
    f2_d:{tr:'3D sahnede paletleri taşıyın, döndürün, "bu yönde doldur" deyin. Yapışma ve serbest düşüş.',en:'Move and rotate pallets in 3D, fill in a chosen direction, with snapping.',de:'Paletten in 3D bewegen und drehen, gerichtet füllen.',fr:'Déplacez et pivotez les palettes en 3D.',es:'Mueva y gire palés en 3D.'},
    f3_t:{tr:'Tüm ekipmanlar',en:'All equipment',de:'Alle Ausrüstungen',fr:'Tous les équipements',es:'Todos los equipos'},
    f3_d:{tr:'TIR, Mega TIR, kamyon, 20\'/40\'/40\'HC/45\'HC konteyner, Open Top, Flat Rack ve Platform — taşma hesabıyla.',en:'Trucks, 20\'/40\'/HC containers, Open Top, Flat Rack and Platform — with overhang.',de:'LKW, Container, Open Top, Flat Rack, Platform — mit Überhang.',fr:'Camions, conteneurs, Open Top, Flat Rack, Platform — avec débord.',es:'Camiones, contenedores, Open Top, Flat Rack y Platform — con voladizo.'},
    f4_t:{tr:'Ağırlık & aks dengesi',en:'Weight & axle balance',de:'Gewicht & Achslast',fr:'Poids & essieux',es:'Peso y ejes'},
    f4_d:{tr:'Aks yükü ve ağırlık merkezi uyarısı, kapasite ve boyut kontrolü, uygun ekipman önerisi.',en:'Axle-load and center-of-gravity alerts, capacity and size checks, equipment suggestions.',de:'Achslast- und Schwerpunkt­warnungen, Kapazitäts­prüfung.',fr:'Alertes charge à l’essieu et centre de gravité.',es:'Alertas de carga por eje y centro de gravedad.'},
    f5_t:{tr:'Çoklu ekipman & çok duraklı',en:'Multi-equipment & multi-drop',de:'Mehrfach & Mehr-Stopp',fr:'Multi-équipement & multi-arrêts',es:'Multi-equipo y multi-parada'},
    f5_d:{tr:'Sığmayan yükler 2., 3. araca devreder; çok duraklı teslimatta LIFO sıralama ve durak planı.',en:'Overflow moves to the next vehicle; multi-drop LIFO ordering and stop plan.',de:'Überschuss zum nächsten Fahrzeug; Mehr-Stopp-LIFO.',fr:'Le surplus passe au véhicule suivant; multi-arrêts LIFO.',es:'El excedente pasa al siguiente vehículo; multi-parada LIFO.'},
    f6_t:{tr:'Kurumsal rapor & etiket',en:'Reports & labels',de:'Berichte & Etiketten',fr:'Rapports & étiquettes',es:'Informes y etiquetas'},
    f6_d:{tr:'Firma logolu, çok dilli PDF rapor + parsiyel için QR kodlu grup (müşteri) etiketleri.',en:'Branded multilingual PDF reports + QR group (customer) labels for groupage.',de:'Mehrsprachige PDF-Berichte + QR-Gruppen­etiketten.',fr:'Rapports PDF multilingues + étiquettes de groupe QR.',es:'Informes PDF multilingües + etiquetas de grupo con QR.'},
    h_price_title:{tr:'Basit fiyatlandırma',en:'Simple pricing',de:'Einfache Preise',fr:'Tarifs simples',es:'Precios simples'},
    h_price_sub:{tr:'Ücretsiz sürümle tanışın; Pro tüm gücü açar. Kurulumda 15 gün tam Pro deneme.',en:'Start free; Pro unlocks everything. 15-day full Pro trial on install.',de:'Kostenlos starten; Pro schaltet alles frei. 15 Tage Test.',fr:'Commencez gratuitement; Pro débloque tout. Essai 15 jours.',es:'Empiece gratis; Pro lo desbloquea todo. Prueba de 15 días.'},
    h_price_cta:{tr:'Fiyatları ve karşılaştırmayı gör',en:'See pricing & comparison',de:'Preise & Vergleich',fr:'Tarifs & comparatif',es:'Precios y comparación'},
    h_dl_title:{tr:'15 Günlük Ücretsiz Deneme (Windows)',en:'15-Day Free Trial (Windows)',de:'15 Tage kostenlos (Windows)',fr:'Essai gratuit 15 jours (Windows)',es:'Prueba gratis 15 días (Windows)'},
    dl_email:{tr:'İş e-posta adresiniz',en:'Your business e-mail',de:'Ihre geschäftliche E-Mail',fr:'Votre e-mail professionnel',es:'Su correo de empresa'},
    dl_name:{tr:'Ad Soyad (opsiyonel)',en:'Full name (optional)',de:'Name (optional)',fr:'Nom (facultatif)',es:'Nombre (opcional)'},
    dl_company:{tr:'Firma (opsiyonel)',en:'Company (optional)',de:'Firma (optional)',fr:'Société (facultatif)',es:'Empresa (opcional)'},
    dl_consent:{tr:'İndirme bağlantısı ve ürün bilgilendirmeleri için e-posta almayı kabul ediyorum',en:'I agree to receive the download link and product e-mails',de:'Ich stimme zu, den Download-Link und Produkt-E-Mails zu erhalten',fr:'J’accepte de recevoir le lien et des e-mails produit',es:'Acepto recibir el enlace y correos del producto'},
    dl_btn:{tr:'İndirme Linkini Gönder',en:'Send Download Link',de:'Download-Link senden',fr:'Envoyer le lien',es:'Enviar enlace'},
    dl_sending:{tr:'Gönderiliyor…',en:'Sending…',de:'Senden…',fr:'Envoi…',es:'Enviando…'},
    dl_ok:{tr:'✓ İndirme bağlantısı e-postanıza gönderildi. Gelen kutunuzu (ve spam) kontrol edin.',en:'✓ Download link sent to your e-mail. Check your inbox (and spam).',de:'✓ Download-Link gesendet. Prüfen Sie Ihren Posteingang.',fr:'✓ Lien envoyé. Vérifiez votre boîte (et spam).',es:'✓ Enlace enviado. Revise su bandeja (y spam).'},
    dl_err_email:{tr:'Lütfen geçerli bir e-posta girin.',en:'Please enter a valid e-mail.',de:'Bitte gültige E-Mail eingeben.',fr:'Veuillez saisir un e-mail valide.',es:'Introduzca un correo válido.'},
    dl_err_consent:{tr:'Devam etmek için onay kutusunu işaretleyin.',en:'Please tick the consent box.',de:'Bitte Zustimmung ankreuzen.',fr:'Cochez la case de consentement.',es:'Marque la casilla de consentimiento.'},
    dl_err_disp:{tr:'Lütfen kalıcı bir iş e-postası kullanın.',en:'Please use a permanent business e-mail.',de:'Bitte dauerhafte geschäftliche E-Mail.',fr:'Utilisez un e-mail professionnel permanent.',es:'Use un correo de empresa permanente.'},
    dl_err_net:{tr:'Bağlantı hatası. Lütfen tekrar deneyin.',en:'Connection error. Please try again.',de:'Verbindungsfehler. Bitte erneut.',fr:'Erreur de connexion. Réessayez.',es:'Error de conexión. Inténtelo de nuevo.'},
    cta_contact:{tr:'Pro Lisans İçin İletişim',en:'Contact for Pro License',de:'Kontakt für Pro-Lizenz',fr:'Contact licence Pro',es:'Contacto licencia Pro'},
    h_show_title:{tr:'Kurumsal, hazır çıktılar',en:'Professional, ready-to-use output',de:'Professionelle Ausgaben',fr:'Documents prêts à l’emploi',es:'Documentos listos para usar'},
    h_show_sub:{tr:'Firma logonuzla dijital imzalı PDF raporlar ve depo/liman için QR kodlu grup etiketleri — örnek: TARGET-INT.',en:'Digitally-signed PDF reports with your logo and QR group labels for warehouse/port — example: TARGET-INT.',de:'Signierte PDF-Berichte mit Ihrem Logo und QR-Etiketten — Beispiel: TARGET-INT.',fr:'Rapports PDF signés avec votre logo et étiquettes QR — exemple : TARGET-INT.',es:'Informes PDF firmados con su logo y etiquetas QR — ejemplo: TARGET-INT.'},
    show_report:{tr:'Kurumsal yükleme raporu (PDF)',en:'Corporate loading report (PDF)',de:'Ladebericht (PDF)',fr:'Rapport de chargement (PDF)',es:'Informe de carga (PDF)'},
    show_label:{tr:'QR kodlu grup (müşteri) etiketi',en:'QR group (customer) label',de:'QR-Gruppenetikett',fr:'Étiquette de groupe QR',es:'Etiqueta de grupo QR'},

    // ---- ÖZELLİKLER SAYFASI ----
    fp_title:{tr:'Özellikler',en:'Features',de:'Funktionen',fr:'Fonctions',es:'Funciones'},
    fp_sub:{tr:'Bir yükleme planından beklediğiniz her şey — ve fazlası.',en:'Everything you expect from a load planner — and more.',de:'Alles, was Sie von einer Ladeplanung erwarten — und mehr.',fr:'Tout ce qu’un plan de chargement doit offrir — et plus.',es:'Todo lo que espera de un planificador de carga — y más.'},
    x1_t:{tr:'3D otomatik bin-packing',en:'3D auto bin-packing',de:'3D-Auto-Packen',fr:'Bin-packing 3D auto',es:'Bin-packing 3D automático'},
    x1_d:{tr:'Yük tiplerini girin, program en çok parçayı sığdıran düzeni bulur: palet şeritleri, düzenli bloklar, %75 taban destek kuralı ve boşluklu istiften kaçınma.',en:'Enter cargo types; the app finds the layout that fits the most: pallet lanes, neat blocks, 75% support rule and gap-free stacking.',de:'Ladungstypen eingeben; die App findet das beste Layout: Reihen, saubere Blöcke, 75%-Auflageregel.',fr:'Saisissez les types; l’appli optimise: rangées, blocs nets, règle d’appui 75%.',es:'Introduzca los tipos; la app optimiza: hileras, bloques, regla de apoyo 75%.'},
    x2_t:{tr:'Elle yükleme & sürükle-bırak',en:'Manual loading & drag-drop',de:'Manuelle Beladung',fr:'Chargement manuel',es:'Carga manual'},
    x2_d:{tr:'3D sahnede paletleri taşıyın, döndürün (R), "öne / yana / üste / blok doldur" komutları, yapışma (snap) ve serbest düşüş.',en:'Move/rotate pallets in 3D, "fill front/side/up/block" commands, snapping and free-fall.',de:'Paletten in 3D bewegen/drehen, "füllen"-Befehle, Einrasten.',fr:'Déplacer/pivoter en 3D, commandes de remplissage, aimantation.',es:'Mover/girar en 3D, comandos de relleno, imantación.'},
    x3_t:{tr:'Aks yükü & yasal uyum',en:'Axle load & legal compliance',de:'Achslast & Konformität',fr:'Charge à l’essieu & conformité',es:'Carga por eje y cumplimiento'},
    x3_d:{tr:'Çeker (kingpin) ve dorse akslarına düşen yükü hesaplar; AB 96/53/EC ≈ TR yasal sınırları aşılınca uyarır. Ağırlık merkezi & denge göstergesi.',en:'Computes kingpin and trailer axle loads; warns when EU 96/53/EC ≈ legal limits are exceeded. Center-of-gravity & balance gauge.',de:'Berechnet Achslasten; warnt bei Überschreitung der EU-Grenzen.',fr:'Calcule les charges à l’essieu; alerte au-delà des limites UE.',es:'Calcula cargas por eje; avisa al superar límites de la UE.'},
    x4_t:{tr:'Çok duraklı teslimat (LIFO)',en:'Multi-drop delivery (LIFO)',de:'Mehr-Stopp-Lieferung',fr:'Livraison multi-arrêts',es:'Entrega multi-parada'},
    x4_d:{tr:'Yükleri gruplara (duraklara) ayırın; ilk teslim kapıya en yakın yüklenir. Renkli gruplar ve şoför için Durak Planı belgesi.',en:'Split cargo into drop groups; first delivery loaded nearest the door. Color groups and a driver Stop Plan.',de:'Ladung in Stopp-Gruppen; erster Stopp türnah. Stopp-Plan.',fr:'Groupes d’arrêts; première livraison près de la porte. Plan d’arrêts.',es:'Grupos de parada; primera entrega junto a la puerta. Plan de paradas.'},
    x5_t:{tr:'Çoklu ekipman',en:'Multiple equipment',de:'Mehrere Ausrüstungen',fr:'Multi-équipement',es:'Multi-equipo'},
    x5_d:{tr:'Sığmayan yükler otomatik olarak 2., 3. araca devreder — her araç farklı tipte olabilir. Rapor ekipman başına detaylanır.',en:'Overflow moves to the next vehicle — each can differ. Reports detailed per unit.',de:'Überschuss zum nächsten Fahrzeug. Bericht je Einheit.',fr:'Surplus au véhicule suivant. Rapport par unité.',es:'Excedente al siguiente vehículo. Informe por unidad.'},
    x6_t:{tr:'Kurumsal PDF rapor',en:'Corporate PDF report',de:'PDF-Bericht',fr:'Rapport PDF',es:'Informe PDF'},
    x6_d:{tr:'Firma logolu, 5 dilli, dijital imzalı PDF: kullanım özeti, aks tablosu, kargo manifesti, 2D/3D görünümler ve isteğe bağlı adım adım yükleme.',en:'Branded, 5-language, digitally-signed PDF: usage summary, axle table, manifest, 2D/3D views and optional step-by-step loading.',de:'Signierter PDF-Bericht in 5 Sprachen.',fr:'PDF signé en 5 langues.',es:'PDF firmado en 5 idiomas.'},
    x7_t:{tr:'Grup (müşteri) etiketleri + QR',en:'Group (customer) labels + QR',de:'Gruppen­etiketten + QR',fr:'Étiquettes de groupe + QR',es:'Etiquetas de grupo + QR'},
    x7_d:{tr:'Parsiyel taşımada her müşteri için referans, POD, parça no (1/N), ölçü/istif kuralları ve QR kodlu etiketler — A4\'e 2 adet.',en:'For groupage: reference, POD, piece no (1/N), size/stack rules and QR labels — 2 per A4.',de:'Für Sammelgut: Referenz, POD, Stück-Nr., QR-Etiketten.',fr:'Groupage: référence, POD, n° colis, étiquettes QR.',es:'Grupaje: referencia, POD, n.º pieza, etiquetas QR.'},
    x8_t:{tr:'Excel/CSV içe aktarma',en:'Excel/CSV import',de:'Excel/CSV-Import',fr:'Import Excel/CSV',es:'Importar Excel/CSV'},
    x8_d:{tr:'Müşterinin kendi listesini yükleyin — sütun eşleştirme motoru her formatı tanır, otomatik tahmin ve canlı önizleme.',en:'Upload any customer list — a column-mapping engine handles any format, with auto-guess and live preview.',de:'Beliebige Liste hochladen — Spalten-Zuordnung erkennt jedes Format.',fr:'Importez toute liste — moteur de correspondance des colonnes.',es:'Suba cualquier lista — motor de mapeo de columnas.'},
    x9_t:{tr:'İstifleme kuralları',en:'Stacking rules',de:'Stapelregeln',fr:'Règles d’empilage',es:'Reglas de apilado'},
    x9_d:{tr:'Yük başına yön (1/2/4/6 yol), maks istif katı, "yalnızca alt", "üstüne yük konabilir" ve üstüne maksimum kg (ezilme limiti).',en:'Per cargo: orientation, max stack, "bottom only", "load on top" and max kg on top (crush limit).',de:'Je Ladung: Ausrichtung, Max-Stapel, Boden-only, Max-kg.',fr:'Par charge: orientation, empilage max, fond seul, kg max.',es:'Por carga: orientación, apilado máx, solo abajo, kg máx.'},
    x10_t:{tr:'5 dil & metrik/imperial',en:'5 languages & metric/imperial',de:'5 Sprachen & metrisch/imperial',fr:'5 langues & métrique/imperial',es:'5 idiomas y métrico/imperial'},
    x10_d:{tr:'Arayüz ve raporlar Türkçe, İngilizce, Almanca, Fransızca, İspanyolca. Metrik veya imperial birim.',en:'UI and reports in TR, EN, DE, FR, ES. Metric or imperial units.',de:'Oberfläche & Berichte in 5 Sprachen. Metrisch/imperial.',fr:'Interface & rapports en 5 langues. Métrique/imperial.',es:'Interfaz e informes en 5 idiomas. Métrico/imperial.'},
    x11_t:{tr:'Offline lisans',en:'Offline license',de:'Offline-Lizenz',fr:'Licence hors ligne',es:'Licencia sin conexión'},
    x11_d:{tr:'Lisans internet gerektirmez — dijital imzalı, cihaza bağlı. Verileriniz sizde kalır; program eve telefon etmez.',en:'License needs no internet — digitally signed, device-bound. Your data stays with you; no phone-home.',de:'Lizenz ohne Internet — signiert, gerätegebunden. Kein Phone-home.',fr:'Licence sans internet — signée, liée à l’appareil.',es:'Licencia sin internet — firmada, ligada al dispositivo.'},
    x12_t:{tr:'Plan kaydet & aç',en:'Save & open plans',de:'Pläne speichern',fr:'Enregistrer les plans',es:'Guardar planes'},
    x12_d:{tr:'İsimli planları kaydedin, tekrar açın; şablonlar ve "Planları Karşılaştır" (yoğun vs. tabana yay) ile en iyisini seçin.',en:'Save named plans, reopen; templates and "Compare Plans" (dense vs. spread) to pick the best.',de:'Benannte Pläne speichern; Vorlagen und Planvergleich.',fr:'Plans nommés; modèles et comparaison de plans.',es:'Planes con nombre; plantillas y comparar planes.'},

    // ---- FİYATLANDIRMA SAYFASI ----
    pp_title:{tr:'Fiyatlandırma',en:'Pricing',de:'Preise',fr:'Tarifs',es:'Precios'},
    pp_sub:{tr:'Ücretsiz başlayın; hazır olduğunuzda Pro\'ya geçin. Kurulumda 15 gün tam Pro deneme.',en:'Start free; upgrade to Pro when ready. 15-day full Pro trial on install.',de:'Kostenlos starten; später Pro. 15 Tage Test.',fr:'Commencez gratuitement; passez à Pro. Essai 15 jours.',es:'Empiece gratis; pase a Pro. Prueba de 15 días.'},
    pl_free:{tr:'FREE',en:'FREE',de:'FREE',fr:'FREE',es:'FREE'},
    pl_free_price:{tr:'Ücretsiz',en:'Free',de:'Gratis',fr:'Gratuit',es:'Gratis'},
    pl_free_1:{tr:'Otomatik yükleme + şerit optimizasyonu',en:'Auto-loading + lane optimization',de:'Auto-Beladung + Reihen',fr:'Chargement auto + rangées',es:'Carga automática + hileras'},
    pl_free_2:{tr:'2D/3D görünümler ve uyarılar',en:'2D/3D views and alerts',de:'2D/3D-Ansichten',fr:'Vues 2D/3D',es:'Vistas 2D/3D'},
    pl_free_3:{tr:'5 standart ekipman',en:'5 standard equipment',de:'5 Standard-Ausrüstungen',fr:'5 équipements standard',es:'5 equipos estándar'},
    pl_free_4:{tr:'Sınırsız plan kaydetme',en:'Unlimited saved plans',de:'Unbegrenzte Pläne',fr:'Plans illimités',es:'Planes ilimitados'},
    pl_pro:{tr:'⭐ PRO',en:'⭐ PRO',de:'⭐ PRO',fr:'⭐ PRO',es:'⭐ PRO'},
    pl_pro_price:{tr:'Lisans',en:'License',de:'Lizenz',fr:'Licence',es:'Licencia'},
    pl_pro_note:{tr:'Fiyat için iletişime geçin',en:'Contact us for pricing',de:'Preis auf Anfrage',fr:'Prix sur demande',es:'Precio a consultar'},
    pl_pro_1:{tr:'Free\'deki her şey +',en:'Everything in Free +',de:'Alles aus Free +',fr:'Tout Free +',es:'Todo Free +'},
    pl_pro_2:{tr:'Tüm ekipmanlar + OT/FR/Platform',en:'All equipment + OT/FR/Platform',de:'Alle Ausrüstungen',fr:'Tous les équipements',es:'Todos los equipos'},
    pl_pro_3:{tr:'Elle yükleme, çoklu ekipman, aks yükü',en:'Manual loading, multi-equipment, axle load',de:'Manuell, Mehrfach, Achslast',fr:'Manuel, multi, essieux',es:'Manual, multi, ejes'},
    pl_pro_4:{tr:'PDF rapor, grup etiketi, Excel içe aktarma',en:'PDF reports, group labels, Excel import',de:'PDF, Etiketten, Excel',fr:'PDF, étiquettes, Excel',es:'PDF, etiquetas, Excel'},
    pl_pro_5:{tr:'5 dil, firma logosu, metrik/imperial',en:'5 languages, branding, metric/imperial',de:'5 Sprachen, Branding',fr:'5 langues, marque',es:'5 idiomas, marca'},
    pl_ribbon:{tr:'En popüler',en:'Most popular',de:'Beliebt',fr:'Populaire',es:'Popular'},
    pp_cmp_title:{tr:'Ayrıntılı karşılaştırma',en:'Detailed comparison',de:'Detaillierter Vergleich',fr:'Comparatif détaillé',es:'Comparación detallada'},
    pp_ref:{tr:'🎁 Tavsiye Et, Kazan: Pro kullanıcılar promo kodlarıyla gelen her satın alımda 1 ay ücretsiz kullanım kazanır (en fazla 3 ay).',en:'🎁 Refer & Earn: Pro users get 1 free month for each purchase made with their promo code (up to 3 months).',de:'🎁 Empfehlen & Verdienen: 1 Gratismonat je Kauf mit Promo-Code (bis 3).',fr:'🎁 Parrainez & Gagnez: 1 mois offert par achat avec votre code (jusqu’à 3).',es:'🎁 Recomienda y Gana: 1 mes gratis por compra con su código (hasta 3).'},
    c_feature:{tr:'Özellik',en:'Feature',de:'Funktion',fr:'Fonction',es:'Función'},
    r1:{tr:'Otomatik yükleme + optimizasyon',en:'Auto-loading + optimization',de:'Auto-Beladung',fr:'Chargement auto',es:'Carga automática'},
    r2:{tr:'2D/3D + ağırlık/denge/boyut uyarıları',en:'2D/3D + weight/balance/size alerts',de:'2D/3D + Warnungen',fr:'2D/3D + alertes',es:'2D/3D + alertas'},
    r3:{tr:'Plan kaydetme',en:'Save plans',de:'Pläne speichern',fr:'Enregistrer',es:'Guardar'},
    r4:{tr:'Ekipmanlar',en:'Equipment',de:'Ausrüstung',fr:'Équipements',es:'Equipos'},
    r5:{tr:'Dil',en:'Language',de:'Sprache',fr:'Langue',es:'Idioma'},
    r6:{tr:'Elle sürükle-bırak yükleme',en:'Manual drag & drop',de:'Manuell',fr:'Manuel',es:'Manual'},
    r7:{tr:'PDF / Yazdır / E-posta rapor',en:'PDF / Print / E-mail report',de:'PDF-Bericht',fr:'Rapport PDF',es:'Informe PDF'},
    r8:{tr:'Grup etiketi + QR',en:'Group labels + QR',de:'Etiketten + QR',fr:'Étiquettes + QR',es:'Etiquetas + QR'},
    r9:{tr:'Aks yükü & çok duraklı',en:'Axle load & multi-drop',de:'Achslast & Mehr-Stopp',fr:'Essieux & multi-arrêts',es:'Ejes y multi-parada'},
    r10:{tr:'Çoklu ekipman',en:'Multi-equipment',de:'Mehrfach',fr:'Multi',es:'Multi'},
    r11:{tr:'Excel içe aktarma & şablonlar',en:'Excel import & templates',de:'Excel & Vorlagen',fr:'Excel & modèles',es:'Excel y plantillas'},
    r12:{tr:'Firma logosu & metrik/imperial',en:'Branding & metric/imperial',de:'Branding',fr:'Marque',es:'Marca'},
    r_std5:{tr:'5 standart',en:'5 standard',de:'5 Standard',fr:'5 standard',es:'5 estándar'},
    r_all:{tr:'Tümü + OT/FR/Platform',en:'All + OT/FR/Platform',de:'Alle',fr:'Tous',es:'Todos'},
    r_en:{tr:'İngilizce',en:'English',de:'Englisch',fr:'Anglais',es:'Inglés'},
    r_5lang:{tr:'5 dil',en:'5 languages',de:'5 Sprachen',fr:'5 langues',es:'5 idiomas'},

    // ---- SSS SAYFASI ----
    sp_title:{tr:'Sıkça Sorulan Sorular',en:'Frequently Asked Questions',de:'Häufige Fragen',fr:'Questions fréquentes',es:'Preguntas frecuentes'},
    sp_sub:{tr:'Aradığınızı bulamazsanız info@biltech.ee ile yazın.',en:'Can’t find it? Write to info@biltech.ee.',de:'Nicht gefunden? info@biltech.ee.',fr:'Pas trouvé ? info@biltech.ee.',es:'¿No lo encuentra? info@biltech.ee.'},
    q1:{tr:'Program hangi işletim sisteminde çalışır?',en:'Which OS does it run on?',de:'Welches Betriebssystem?',fr:'Quel système ?',es:'¿Qué sistema operativo?'},
    a1:{tr:'Windows (10/11). Kurulum tek tıkla yapılır; internet olmadan da çalışır.',en:'Windows (10/11). One-click install; works offline too.',de:'Windows (10/11). Ein-Klick, auch offline.',fr:'Windows (10/11). Installation en un clic, hors ligne.',es:'Windows (10/11). Instalación en un clic, sin conexión.'},
    q2:{tr:'İnternet bağlantısı gerekli mi?',en:'Do I need internet?',de:'Brauche ich Internet?',fr:'Internet requis ?',es:'¿Necesito internet?'},
    a2:{tr:'Hayır. Lisans dijital imzalıdır ve internetsiz doğrulanır. Yalnızca güncelleme kontrolü ve (isteğe bağlı) cihaz aktivasyonu bağlantı kullanır.',en:'No. The license is digitally signed and verified offline. Only update checks and optional device activation use a connection.',de:'Nein. Lizenz offline geprüft. Nur Updates/Aktivierung online.',fr:'Non. Licence vérifiée hors ligne. Seules les mises à jour utilisent le réseau.',es:'No. La licencia se verifica sin conexión. Solo actualizaciones usan red.'},
    q3:{tr:'Deneme sürümü ne kadar sürer?',en:'How long is the trial?',de:'Wie lange dauert der Test?',fr:'Durée de l’essai ?',es:'¿Duración de la prueba?'},
    a3:{tr:'Kurulumdan sonra 15 gün boyunca tüm Pro özellikler ücretsizdir. Süre bitince program Free moda döner; lisans girerek Pro\'ya geçebilirsiniz.',en:'15 days of full Pro after install. Then it reverts to Free; enter a license to go Pro.',de:'15 Tage Pro, danach Free.',fr:'15 jours Pro, puis Free.',es:'15 días Pro, luego Free.'},
    q4:{tr:'Lisans nasıl çalışır? Kaç bilgisayarda kullanabilirim?',en:'How does the license work? How many PCs?',de:'Wie funktioniert die Lizenz?',fr:'Comment marche la licence ?',es:'¿Cómo funciona la licencia?'},
    a4:{tr:'Satın alınca firma adınıza özel bir kod e-posta ile gelir; Ayarlar → Lisans\'a yapıştırırsınız. Kod belirli sayıda cihazda etkinleştirilebilir; bir cihazı kaldırıp başka birine taşıyabilirsiniz.',en:'After purchase you get a code by e-mail for your company; paste it in Settings → License. It can be activated on a set number of devices and moved between them.',de:'Code per E-Mail, in Einstellungen einfügen. Auf mehreren Geräten nutzbar/übertragbar.',fr:'Code par e-mail, à coller dans Réglages → Licence. Activable sur plusieurs postes.',es:'Código por correo, se pega en Ajustes → Licencia. Activable en varios equipos.'},
    q5:{tr:'Verilerim güvende mi? Yüklerim buluta gönderiliyor mu?',en:'Is my data safe? Is it sent to the cloud?',de:'Sind meine Daten sicher?',fr:'Mes données sont-elles sûres ?',es:'¿Están seguros mis datos?'},
    a5:{tr:'Yükleme planlarınız ve müşteri verileriniz cihazınızda kalır. Program yükleme/rota verinizi buluta göndermez. Yalnızca indirme sırasında verdiğiniz e-posta bizde kayıtlıdır (bkz. Gizlilik).',en:'Your plans and customer data stay on your device. The app does not send load/route data to any cloud. Only your download e-mail is stored (see Privacy).',de:'Pläne bleiben lokal. Keine Cloud-Übertragung. Nur Download-E-Mail gespeichert.',fr:'Vos plans restent locaux. Aucune donnée envoyée au cloud. Seul l’e-mail est stocké.',es:'Sus planes quedan locales. No se envían al cloud. Solo se guarda el correo.'},
    q6:{tr:'Excel listemi programa aktarabilir miyim?',en:'Can I import my Excel list?',de:'Kann ich meine Excel-Liste importieren?',fr:'Puis-je importer mon Excel ?',es:'¿Puedo importar mi Excel?'},
    a6:{tr:'Evet. .xlsx/.csv dosyanızı yükleyin; sütun eşleştirme motoru her formatı tanır, otomatik tahmin eder ve önizleme gösterir (Pro).',en:'Yes. Upload .xlsx/.csv; the column-mapping engine handles any format with auto-guess and preview (Pro).',de:'Ja, .xlsx/.csv mit Spalten-Zuordnung (Pro).',fr:'Oui, .xlsx/.csv avec mappage (Pro).',es:'Sí, .xlsx/.csv con mapeo (Pro).'},
    q7:{tr:'Grup (müşteri) etiketleri nedir?',en:'What are group (customer) labels?',de:'Was sind Gruppen­etiketten?',fr:'Qu’est-ce que les étiquettes de groupe ?',es:'¿Qué son las etiquetas de grupo?'},
    a7:{tr:'Parsiyel taşımada her müşteriyi bir grup olarak işaretler; o gruba ait tüm parçalar için referans, POD, parça no (1/N), ölçü/istif bilgisi ve QR kodlu etiketler basarsınız.',en:'In groupage each customer is a group; you print QR labels with reference, POD, piece no (1/N) and size/stack info for every piece.',de:'Bei Sammelgut je Kunde ein Etikett mit QR, POD, Stück-Nr.',fr:'En groupage, étiquettes QR par pièce (référence, POD, n°).',es:'En grupaje, etiquetas QR por pieza (referencia, POD, n.º).'},
    q8:{tr:'Fatura / KDV alabilir miyim?',en:'Can I get an invoice / VAT?',de:'Bekomme ich eine Rechnung?',fr:'Puis-je avoir une facture ?',es:'¿Puedo obtener factura?'},
    a8:{tr:'Evet. BILTECH OÜ (Estonya, AB) üzerinden fatura düzenlenir. Detaylar için info@biltech.ee.',en:'Yes. Invoiced via BILTECH OÜ (Estonia, EU). Contact info@biltech.ee.',de:'Ja, über BILTECH OÜ (Estland, EU).',fr:'Oui, via BILTECH OÜ (Estonie, UE).',es:'Sí, vía BILTECH OÜ (Estonia, UE).'},
  };

  var ESP_MARK = '<svg viewBox="0 0 100 100" width="30" height="30" aria-hidden="true"><rect x="1" y="1" width="98" height="98" rx="22" fill="#16365c"/><g transform="translate(0,-3)" stroke="#0e2440" stroke-width="1.4" stroke-linejoin="round"><polygon points="50,19 70,30 50,41 30,30" fill="#f2ce72"/><polygon points="30,30 50,41 50,67 30,56" fill="#d9a63a"/><polygon points="70,30 50,41 50,67 70,56" fill="#c2901f"/><polygon points="34,39 54,50 34,61 14,50" fill="#7db0f2"/><polygon points="14,50 34,61 34,87 14,76" fill="#3d7bd9"/><polygon points="54,50 34,61 34,87 54,76" fill="#2a5ca8"/><polygon points="66,39 86,50 66,61 46,50" fill="#7db0f2"/><polygon points="46,50 66,61 66,87 46,76" fill="#3d7bd9"/><polygon points="86,50 66,61 66,87 86,76" fill="#2a5ca8"/></g></svg>';

  function getLang() {
    var l = localStorage.getItem('esp-site-lang');
    if (l && LANGS.some(function (x) { return x.code === l; })) return l;
    var b = (navigator.language || 'tr').slice(0, 2);
    return LANGS.some(function (x) { return x.code === b; }) ? b : 'tr';
  }
  function tr(k, lang) { return (T[k] && (T[k][lang] || T[k].tr)) || k; }

  function applyI18n(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (T[k]) el.innerHTML = tr(k, lang);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      if (T[k]) el.setAttribute('placeholder', tr(k, lang));
    });
    var lb = document.getElementById('langLabel');
    if (lb) { var cur = LANGS.filter(function (x) { return x.code === lang; })[0]; lb.textContent = cur ? cur.label.split(' ')[0] + ' ' + lang.toUpperCase() : lang.toUpperCase(); }
  }
  function setLang(lang) { localStorage.setItem('esp-site-lang', lang); applyI18n(lang); }

  // ortak menü + footer enjekte et (her sayfada #site-nav ve #site-footer)
  function injectShell() {
    var page = document.body.getAttribute('data-page') || 'home';
    var A = function (href, key, p) { return '<a href="' + href + '"' + (p === page ? ' class="active"' : '') + ' data-i18n="' + key + '"></a>'; };
    var nav = document.getElementById('site-nav');
    if (nav) nav.innerHTML =
      '<div class="topbar"><div class="wrap"><div class="nav">' +
        '<a class="brand" href="index.html">' + ESP_MARK + ' Easy Stacking Planner <span class="tag">ESP</span></a>' +
        '<button class="hamb" id="hambBtn" aria-label="menu">☰</button>' +
        '<nav class="menu" id="mainMenu">' +
          A('index.html', 'nav_home', 'home') + A('ozellikler.html', 'nav_features', 'features') +
          A('fiyatlandirma.html', 'nav_pricing', 'pricing') + A('sss.html', 'nav_faq', 'faq') +
          '<div class="lang"><button class="lang-btn" id="langBtn"><span id="langLabel"></span> ▾</button>' +
            '<div class="lang-menu" id="langMenu">' + LANGS.map(function (l) { return '<button data-l="' + l.code + '">' + l.label + '</button>'; }).join('') + '</div></div>' +
          '<a class="btn btn-nav" href="index.html#indir" data-i18n="nav_trial"></a>' +
        '</nav>' +
      '</div></div></div>';
    var foot = document.getElementById('site-footer');
    if (foot) foot.innerHTML =
      '<div class="wrap"><div class="foot-grid">' +
        '<div><strong>Easy Stacking Planner (ESP)</strong> — <span data-i18n="foot_tagline"></span></div>' +
        '<div class="foot-links">' +
          '<a href="gizlilik.html" data-i18n="foot_privacy"></a>' +
          '<a href="mailto:info@biltech.ee" data-i18n="foot_contact"></a>' +
          '<a href="https://biltech.ee">biltech.ee</a>' +
        '</div>' +
      '</div><div style="margin-top:12px;font-size:12px;color:#7f97ba">© BILTECH OÜ · Narva mnt 5, 10117 Tallinn, Estonia · <span data-i18n="foot_rights"></span></div></div>';

    // dil menüsü
    var lb = document.getElementById('langBtn'), lm = document.getElementById('langMenu');
    if (lb) lb.addEventListener('click', function (e) { e.stopPropagation(); lm.classList.toggle('open'); });
    document.addEventListener('click', function () { if (lm) lm.classList.remove('open'); });
    if (lm) lm.querySelectorAll('button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-l')); lm.classList.remove('open'); }); });
    // hamburger
    var hb = document.getElementById('hambBtn'), mm = document.getElementById('mainMenu');
    if (hb) hb.addEventListener('click', function () { mm.classList.toggle('open'); });
  }

  // indirme formu
  function initDownloadForm() {
    var f = document.getElementById('dlForm'); if (!f) return;
    var msg = document.getElementById('dlMsg'), btn = document.getElementById('dlBtn');
    var lang = getLang();
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      lang = getLang();
      var email = document.getElementById('dlEmail').value.trim();
      var consent = document.getElementById('dlConsent').checked;
      msg.className = 'dl-msg';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.textContent = tr('dl_err_email', lang); msg.className = 'dl-msg err'; return; }
      if (!consent) { msg.textContent = tr('dl_err_consent', lang); msg.className = 'dl-msg err'; return; }
      btn.disabled = true; msg.textContent = tr('dl_sending', lang);
      fetch(ESP_DOWNLOAD_API, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, name: document.getElementById('dlName').value.trim(), company: document.getElementById('dlCompany').value.trim(), consent: true, lang: lang }) })
        .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          if (res.ok && res.d.ok) { msg.textContent = tr('dl_ok', lang); msg.className = 'dl-msg ok'; f.reset(); }
          else if (res.d.error === 'disposable') { msg.textContent = tr('dl_err_disp', lang); msg.className = 'dl-msg err'; }
          else if (res.d.error === 'consent') { msg.textContent = tr('dl_err_consent', lang); msg.className = 'dl-msg err'; }
          else { msg.textContent = tr('dl_err_email', lang); msg.className = 'dl-msg err'; }
        })
        .catch(function () { msg.textContent = tr('dl_err_net', lang); msg.className = 'dl-msg err'; })
        .then(function () { btn.disabled = false; });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectShell();
    applyI18n(getLang());
    initDownloadForm();
  });
})();
