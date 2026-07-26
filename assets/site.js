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
    // ---- Rakiplerden Farkımız (4 pillar) ----
    h_diff_title:{tr:'Rakiplerden farkımız',en:'Why us vs the alternatives',de:'Warum wir vs. die Alternativen',fr:'Pourquoi nous face aux alternatives',es:'Por qué nosotros frente a las alternativas'},
    h_diff_sub:{tr:'Web tabanlı SaaS rakiplerinin kapatamayacağı 4 net avantaj.',en:'Four clear advantages web-based SaaS competitors can\'t match.',de:'Vier klare Vorteile gegenüber webbasierten SaaS.',fr:'Quatre avantages clairs face aux SaaS web.',es:'Cuatro ventajas claras frente a los SaaS web.'},
    d1_t:{tr:'🔌 Offline & yerel performans',en:'🔌 Offline & local performance',de:'🔌 Offline & lokale Leistung',fr:'🔌 Hors ligne & local',es:'🔌 Offline y local'},
    d1_d:{tr:'"Tarayıcıda donan web yazılımlarını unutun." Gümrükte, depoda, gemide — internet yokken bile 3D motoru masaüstünüzün tüm gücüyle çalışır.',en:'"Forget browser tools that freeze when connection drops." At customs, warehouse, aboard a ship — the 3D engine runs on your desktop\'s full power.',de:'Kein Einfrieren im Browser. Am Zoll, im Lager, an Bord — 3D-Motor läuft ohne Internet mit voller Desktop-Leistung.',fr:'Fini les outils qui gèlent. Douane, entrepôt, bateau — moteur 3D sur toute la puissance de votre poste.',es:'Se acabaron los cuelgues del navegador. En aduana, almacén o barco — motor 3D con toda la potencia de su equipo.'},
    d2_t:{tr:'⚖️ Kantar-dostu aks yükü',en:'⚖️ Weighbridge-ready axle loads',de:'⚖️ Waagerechte Achslasten',fr:'⚖️ Charges prêtes pour la bascule',es:'⚖️ Cargas listas para báscula'},
    d2_d:{tr:'"Sadece hacmi değil, cezaları da optimize edin." AB 96/53/EC ≈ TR aks limitleri, devrilme ve ezilme riskleri anlık — sürücünüz yola çıkmadan yasal.',en:'"Optimize for fines, not just volume." EU 96/53/EC ≈ TR axle limits, tip-over and crush risk — driver road-legal before departure.',de:'Nicht nur Volumen — auch Bußgelder. EU 96/53/EG ≈ TR-Grenzen, Kipp- und Belastungsrisiko — konform vor Abfahrt.',fr:'Optimisez amendes et volume. UE 96/53/CE ≈ TR, risque de basculement, en règle avant départ.',es:'Optimice multas y volumen. UE 96/53/CE ≈ TR, riesgo de vuelco, legal antes de salir.'},
    d3_t:{tr:'🔒 Verileriniz sizde kalır',en:'🔒 Your data stays with you',de:'🔒 Ihre Daten bleiben bei Ihnen',fr:'🔒 Vos données restent chez vous',es:'🔒 Sus datos se quedan con usted'},
    d3_d:{tr:'"Müşteri çeki listelerini 3. parti buluta göndermeyin." Stratejik yükleme verileriniz bilgisayarınızda kalır — bulut sync opsiyonel ve tamamen kontrolünüzde.',en:'"Don\'t send packing lists to third-party clouds." Loading data stays on your machine — cloud sync is optional.',de:'Packlisten bleiben bei Ihnen. Cloud-Sync optional.',fr:'Vos listes restent locales. Sync cloud optionnelle.',es:'Sus listas quedan locales. Sync en la nube opcional.'},
    d4_t:{tr:'💼 Cihaz-bazlı takım lisansı',en:'💼 Device-based team license',de:'💼 Geräte-basierte Team-Lizenz',fr:'💼 Licence d\'équipe par appareil',es:'💼 Licencia de equipo por dispositivo'},
    d4_d:{tr:'"Her yeni personele ekstra ödemeye son." PRO+: 8 lisans × 2 PC = 16 PC eşzamanlı, yıllık €890. SaaS rakipleri €25/kişi/ay ister (€2.400+/yıl).',en:'"Stop paying for every new hire." PRO+: 8 licenses × 2 PCs = 16 concurrent for €890/year. SaaS competitors charge €25/user/mo (€2,400+/year).',de:'Schluss mit Extra-Gebühren. PRO+: 8×2 = 16 PCs für €890/Jahr. SaaS: €25/Nutzer/Mon. (€2.400+/Jahr).',fr:'Fini les frais par recrue. PRO+: 8×2 = 16 PC pour 890 €/an. SaaS: 25 €/utilisateur/mois (2.400 €+/an).',es:'Basta de tarifas por contratación. PRO+: 8×2 = 16 PC por 890 €/año. SaaS: 25 €/usuario/mes (2.400 €+/año).'},

    // ---- Kimler kullanır? (personas) ----
    h_who_title:{tr:'Kimler kullanır?',en:'Who uses it?',de:'Wer nutzt es?',fr:'Qui l\'utilise ?',es:'¿Quién lo usa?'},
    h_who_sub:{tr:'Farklı sektörlerdeki lojistik profesyonelleri her gün ESP ile plan yapıyor.',en:'Logistics professionals across industries plan with ESP every day.',de:'Logistik-Profis aus vielen Branchen planen täglich mit ESP.',fr:'Les pros de la logistique de tous secteurs planifient avec ESP au quotidien.',es:'Los profesionales de la logística de todos los sectores planifican con ESP cada día.'},
    p1_t:{tr:'Uluslararası Nakliye',en:'Freight Forwarders',de:'Spediteure',fr:'Transitaires',es:'Transitarios'},
    p1_d:{tr:'Konteyner ve TIR yükleme planı, aks yükü uyumu, parsiyel için grup etiketi — tek programda.',en:'Container & truck plans, axle compliance, groupage labels — all in one.',de:'Container- und LKW-Pläne, Achslast, Sammelgut-Etiketten — alles in einem.',fr:'Plans conteneurs et camions, essieux, étiquettes groupage — tout en un.',es:'Planes de contenedor y camión, ejes, etiquetas de grupaje — todo en uno.'},
    p2_t:{tr:'Depo & Operasyon',en:'Warehouse Ops',de:'Lager & Betrieb',fr:'Opérations entrepôt',es:'Operaciones de almacén'},
    p2_d:{tr:'Şoföre kâğıt üzerinde net yükleme sırası, QR etiketli parçalar, boşluksuz istifleme.',en:'Clear loading sequence on paper, QR-labeled pieces, gap-free stacking.',de:'Klare Ladefolge auf Papier, QR-Etiketten, dichte Stapelung.',fr:'Ordre de chargement clair, étiquettes QR, empilement sans vide.',es:'Orden de carga claro, etiquetas QR, apilamiento sin huecos.'},
    p3_t:{tr:'İhracatçı & Üretici',en:'Exporters & Manufacturers',de:'Exporteure & Hersteller',fr:'Exportateurs & fabricants',es:'Exportadores y fabricantes'},
    p3_d:{tr:'Sipariş listesini Excel\'den al, konteyner sayısını gör, alıcıya profesyonel PDF rapor gönder.',en:'Import orders from Excel, see container count, send buyers a branded PDF.',de:'Aufträge aus Excel, Container­zahl, gebrandete PDFs für Käufer.',fr:'Commandes depuis Excel, nombre de conteneurs, PDF pour l\'acheteur.',es:'Pedidos desde Excel, número de contenedores, PDF profesional al comprador.'},
    p4_t:{tr:'Parsiyel & Konsolidatör',en:'Groupage & Consolidators',de:'Sammelgut & Konsolidatoren',fr:'Groupage & consolidateurs',es:'Grupaje y consolidadores'},
    p4_d:{tr:'Her müşteri bir grup — QR kodlu etiketler, POD bilgisi, LIFO düzen, yanlış teslimat yok.',en:'Each customer a group — QR labels, POD info, LIFO order, no misdeliveries.',de:'Jeder Kunde eine Gruppe — QR, POD, LIFO, keine Fehl­lieferung.',fr:'Chaque client un groupe — QR, POD, LIFO, zéro erreur.',es:'Cada cliente un grupo — QR, POD, LIFO, sin errores.'},
    p5_t:{tr:'Yük Komisyoncusu',en:'Freight Brokers',de:'Frachtmakler',fr:'Commissionnaires',es:'Corredores de carga'},
    p5_d:{tr:'Yük ile ekipmanı hızla eşleştir, doluluk simülasyonuyla teklif ver, kazanç oranını görüntüle.',en:'Match freight to equipment fast, quote with fill simulation, see margins.',de:'Fracht mit Fahrzeug abgleichen, Angebot mit Simulation, Marge sichtbar.',fr:'Associer fret et équipement, devis avec simulation, marge visible.',es:'Empareje carga y equipo rápido, cotice con simulación, margen visible.'},
    p6_t:{tr:'Eğitmen & Öğrenci',en:'Educators & Students',de:'Lehrende & Studierende',fr:'Enseignants & étudiants',es:'Docentes y estudiantes'},
    p6_d:{tr:'Lojistik, uluslararası ticaret ve endüstri mühendisliği derslerinde canlı simülasyon aracı.',en:'A live simulation tool for logistics, foreign trade, and industrial engineering classes.',de:'Live-Simulation für Logistik-, Außenhandels- und Ingenieur­kurse.',fr:'Simulation en direct pour cours de logistique, commerce et ingénierie.',es:'Simulación en vivo para clases de logística, comercio e ingeniería.'},

    // ---- Eğitim / Akademi hediye programı ----
    h_edu_title:{tr:'🎓 Öğrenci & Eğitmenlere 6 Ay Ücretsiz Pro',en:'🎓 6 Months Free Pro for Students & Educators',de:'🎓 6 Monate Pro gratis für Studierende & Lehrende',fr:'🎓 6 mois de Pro offert aux étudiants & enseignants',es:'🎓 6 meses de Pro gratis para estudiantes y docentes'},
    h_edu_sub:{tr:'Eğitime destek veriyoruz. Lojistik, uluslararası ticaret veya endüstri mühendisliği alanında öğrenci veya eğitmenseniz, isminize lisanslı 6 aylık ücretsiz Pro hediye ediyoruz.',en:'We support education. If you\'re a student or educator in logistics, foreign trade, or industrial engineering, we\'ll issue a 6-month Pro license in your name — on us.',de:'Wir fördern Bildung. Studierende und Lehrende aus Logistik, Außenhandel oder Wirtschafts­ingenieur­wesen erhalten eine namens­gebundene 6-monatige Pro-Lizenz kostenlos.',fr:'Nous soutenons la formation. Étudiants et enseignants en logistique, commerce international ou génie industriel : licence Pro de 6 mois offerte à votre nom.',es:'Apoyamos la educación. Si es estudiante o docente de logística, comercio internacional o ingeniería industrial, le regalamos una licencia Pro de 6 meses a su nombre.'},
    h_edu_bullet1:{tr:'✓ İsminize özel lisans kodu',en:'✓ License key in your name',de:'✓ Lizenz auf Ihren Namen',fr:'✓ Licence à votre nom',es:'✓ Licencia a su nombre'},
    h_edu_bullet2:{tr:'✓ Kurumsal PDF raporda öğrenci/öğretim üyesi rolünüz görünür',en:'✓ Your role (student/instructor) appears on branded PDF reports',de:'✓ Rolle (Student/Dozent) erscheint im PDF-Bericht',fr:'✓ Votre rôle apparaît sur les rapports PDF',es:'✓ Su rol aparece en los informes PDF'},
    h_edu_bullet3:{tr:'✓ Kurum e-postası ile başvuru (öğrenci belgesi veya kimlik doğrulama)',en:'✓ Apply with your institutional e-mail (student ID / verification)',de:'✓ Antrag per Hochschul-E-Mail',fr:'✓ Candidature via e-mail institutionnel',es:'✓ Solicítelo con su correo institucional'},
    h_edu_cta:{tr:'Eğitim lisansı için başvur',en:'Apply for Education License',de:'Bildungs­lizenz beantragen',fr:'Demander une licence éducation',es:'Solicitar licencia educativa'},

    // ---- Ekran Görüntüleri (gallery) ----
    h_gal_title:{tr:'Ekran görüntüleri',en:'Screenshots',de:'Screenshots',fr:'Captures d\'écran',es:'Capturas de pantalla'},
    h_gal_sub:{tr:'Gerçek uygulamadan görüntüler.',en:'Views from the actual application.',de:'Ansichten aus der tatsächlichen Anwendung.',fr:'Vues de l\'application réelle.',es:'Vistas de la aplicación real.'},
    g1:{tr:'3D Otomatik Yükleme',en:'3D Auto-Loading',de:'3D-Autoladung',fr:'Chargement auto 3D',es:'Carga automática 3D'},
    g1_d:{tr:'Algoritma, girdiğiniz kriterlere göre en verimli yükleme planını sizin için hazırlar. Kargoların çevrilme yönü, istiflenebilirlik, durak sırası, ağırlık ve kırılganlık limitlerini bir kez tanımlayın — bütün parametreler otomatik hesaba katılır ve saniyeler içinde optimize 3D plan hazır olur.',en:'The algorithm builds the most efficient loading plan from your rules. Set rotation direction, stackability, stop order, weight and fragility limits once — every parameter is factored in and an optimized 3D plan is ready in seconds.',de:'Der Algorithmus erstellt den effizientesten Ladeplan aus Ihren Regeln. Legen Sie Drehrichtung, Stapelbarkeit, Stop-Reihenfolge, Gewicht und Zerbrechlichkeit einmal fest — alle Parameter fließen ein und ein optimierter 3D-Plan ist in Sekunden bereit.',fr:'L\'algorithme construit le plan de chargement le plus efficace selon vos règles. Définissez une seule fois rotation, empilement, ordre des arrêts, poids et fragilité — tous les paramètres sont pris en compte et un plan 3D optimisé est prêt en quelques secondes.',es:'El algoritmo crea el plan de carga más eficiente según sus reglas. Defina una sola vez rotación, apilabilidad, orden de paradas, peso y fragilidad — todos los parámetros se tienen en cuenta y un plan 3D optimizado está listo en segundos.'},
    g2:{tr:'İstatistikler ve Aks Yükü',en:'Statistics & Axle Load',de:'Statistiken & Achslast',fr:'Statistiques & essieux',es:'Estadísticas y ejes'},
    g2_d:{tr:'Kapasite kullanımı, doluluk oranı, kat kat compaction ve aks yükü dağılımı tek bakışta. Traktör (kingpin), dorse aksı ve toplam ağırlık için EU 96/53/EC referans limitleri karşısındaki yüzde farkını gösterir; yerleştirilemeyen kargolar liste halinde altta bildirilir.',en:'Capacity usage, fill ratio, floor compaction and axle load distribution at a glance. Shows tractor (kingpin), trailer axle and gross weight vs EU 96/53/EC reference limits — with a list of any pieces that didn\'t fit at the bottom.',de:'Kapazitätsnutzung, Füllquote, Boden-Compaction und Achslast auf einen Blick. Zeigt Zugmaschine (Kingpin), Aufliegerachse und Gesamtgewicht gegen EU 96/53/EC-Referenzwerte — mit einer Liste nicht platzierter Stücke unten.',fr:'Utilisation de capacité, taux de remplissage, compaction du plancher et charge à l\'essieu en un coup d\'œil. Affiche tracteur (sellette), essieu remorque et poids total face aux limites EU 96/53/EC — avec la liste des colis non placés en bas.',es:'Uso de capacidad, tasa de llenado, compactación del piso y carga por eje de un vistazo. Muestra tractor (quinta rueda), eje del remolque y peso total frente a los límites de referencia EU 96/53/EC — con lista de piezas no colocadas al final.'},
    g3:{tr:'Elle Sürükle-Bırak',en:'Manual Drag & Drop',de:'Ziehen & Ablegen',fr:'Glisser-déposer',es:'Arrastrar y soltar'},
    g3_d:{tr:'Otomatik plan üzerinde ince ayar yapın. Sürükle-bırakla parça taşıyın, sağ tık menüsüyle "bu parçayı döndür / bu yönde doldur / seçileni geri al" komutları verin. Her hamlede kapasite ve denge uyarısı gerçek zamanlı güncellenir — sonuca güvenle ilerleyin.',en:'Fine-tune the auto plan. Drag and drop to move pieces; right-click for "rotate this / fill in this direction / undo selection". Capacity and balance warnings update in real time on every move — so you commit with confidence.',de:'Feineinstellung des Auto-Plans. Ziehen und ablegen, um Stücke zu verschieben; Rechtsklick für "Drehen / in dieser Richtung füllen / Auswahl rückgängig". Kapazitäts- und Balance-Warnungen aktualisieren sich in Echtzeit — sicher zum Ergebnis.',fr:'Ajustez le plan auto. Glissez-déposez pour déplacer les colis ; clic droit pour « faire pivoter / remplir dans cette direction / annuler la sélection ». Les alertes de capacité et d\'équilibre se mettent à jour en temps réel à chaque mouvement.',es:'Ajuste fino del plan automático. Arrastre y suelte para mover piezas; clic derecho para "rotar / rellenar en esta dirección / deshacer selección". Los avisos de capacidad y equilibrio se actualizan en tiempo real con cada movimiento.'},
    g4:{tr:'Yönlü Doldurma',en:'Directional Fill',de:'Richtungsfüllung',fr:'Remplissage directionnel',es:'Relleno direccional'},
    g4_d:{tr:'Sağ tık menüsünden "İleri doldur", "Yandan doldur" veya "Yukarı doldur" komutunu verin — program o parçadan itibaren seçtiğiniz yönde boşlukları doldurur. Kalan kargoları teker teker yerleştirmek yerine tek komutla toplu düzen kurun.',en:'Right-click to choose "fill forward", "fill sideways" or "fill up" — the app fills gaps starting from that piece in your chosen direction. Set a bulk layout with one command instead of placing remaining cargo one by one.',de:'Rechtsklick auf "vorwärts füllen", "seitwärts füllen" oder "nach oben füllen" — die App füllt Lücken ab diesem Stück in Ihrer Richtung. Ein Befehl statt Einzelplatzierung.',fr:'Clic droit sur « remplir en avant », « remplir sur le côté » ou « remplir vers le haut » — l\'application comble les vides à partir de ce colis dans la direction choisie. Une commande au lieu du placement pièce par pièce.',es:'Clic derecho en "rellenar hacia adelante", "rellenar de lado" o "rellenar hacia arriba" — la app rellena huecos desde esa pieza en la dirección elegida. Un solo comando en lugar de colocar pieza a pieza.'},
    g5:{tr:'2D Üstten Görünüm + Yükleme Sırası',en:'2D Top View + Loading Order',de:'2D-Draufsicht + Ladefolge',fr:'Vue de dessus 2D + ordre',es:'Vista superior 2D + orden'},
    g5_d:{tr:'Şoförün ve depo ekibinin kâğıt üzerinde göreceği plan. Numaralandırılmış yükleme sırası, palet renkleri, uzunluk cetveli ve arka kapıya (DOOR) uzaklık ölçüsü — depoda yanlış sıralama veya son dakika ters yerleştirme olmaz.',en:'The plan your driver and warehouse team see on paper. Numbered loading order, palette colors, length ruler and distance-from-door markers — no wrong sequence at the warehouse, no last-minute swaps.',de:'Der Plan, den Fahrer und Lager auf Papier sehen. Nummerierte Ladefolge, Palettenfarben, Längenlineal und Abstand-vom-Tor-Markierungen — keine falsche Reihenfolge im Lager.',fr:'Le plan que voient chauffeur et magasin sur papier. Ordre numéroté, couleurs des palettes, règle de longueur et distance à la porte — aucune erreur de séquence au chargement.',es:'El plan que ven conductor y almacén en papel. Orden numerado, colores de palés, regla de longitud y distancia a la puerta — sin errores de secuencia en el almacén.'},
    g6:{tr:'Kurumsal PDF Rapor',en:'Branded PDF Report',de:'Kundenspezifischer PDF-Bericht',fr:'Rapport PDF de marque',es:'Informe PDF de marca'},
    g6_d:{tr:'Her sevkiyat için müşteri adı, PO numarası ve parça-parça yükleme adımlarını rapora ekleyin. E-postayla gönderin, yazdırın veya PDF olarak kaydedin — firma logolu, 5 dilli, kurumsal görünümlü çıktı hazır.',en:'Add customer name, PO number and piece-by-piece loading steps to each report. Email, print or save as PDF — your logo, 5 languages, boardroom-ready.',de:'Kundenname, PO-Nummer und Stück-für-Stück-Ladeschritte in jedem Bericht. E-Mail, Druck oder PDF — Ihr Logo, 5 Sprachen, präsentationsreif.',fr:'Ajoutez client, numéro PO et étapes de chargement à chaque rapport. Email, impression ou PDF — votre logo, 5 langues, prêt à présenter.',es:'Añada cliente, PO y pasos de carga pieza por pieza a cada informe. Envíe por email, imprima o guarde como PDF — con su logo, 5 idiomas, listo para presentar.'},

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
    pl_basic:{tr:'BASIC',en:'BASIC',de:'BASIC',fr:'BASIC',es:'BASIC'},
    pl_basic_price:{tr:'€0 <small>/ süresiz</small>',en:'€0 <small>/ forever</small>',de:'€0 <small>/ dauerhaft</small>',fr:'€0 <small>/ à vie</small>',es:'€0 <small>/ para siempre</small>'},
    pl_basic_note:{tr:'Kredi kartı gerekmez',en:'No credit card required',de:'Keine Kreditkarte',fr:'Sans carte bancaire',es:'Sin tarjeta de crédito'},
    pl_basic_1:{tr:'Otomatik 3D bin-packing',en:'Automatic 3D bin-packing',de:'Automatisches 3D-Bin-Packing',fr:'Bin-packing 3D automatique',es:'Bin-packing 3D automático'},
    pl_basic_2:{tr:'2D ve 3D görünüm + denge uyarıları',en:'2D and 3D views + balance alerts',de:'2D/3D-Ansichten + Balance-Warnungen',fr:'Vues 2D et 3D + alertes équilibre',es:'Vistas 2D y 3D + avisos de equilibrio'},
    pl_basic_3:{tr:'5 standart ekipman',en:'5 standard equipment',de:'5 Standard-Ausrüstungen',fr:'5 équipements standard',es:'5 equipos estándar'},
    pl_basic_4:{tr:'Plan kaydetme (sınırsız)',en:'Save plans (unlimited)',de:'Pläne speichern (unbegrenzt)',fr:'Enregistrer les plans (illimité)',es:'Guardar planes (ilimitado)'},
    pl_basic_5:{tr:'Kurulumda 15 gün tam Pro deneme',en:'15-day full Pro trial at install',de:'15 Tage volle Pro-Testversion bei Installation',fr:'Essai Pro complet de 15 jours',es:'Prueba Pro completa de 15 días al instalar'},
    pl_basic_cta:{tr:'Ücretsiz İndir',en:'Download Free',de:'Kostenlos laden',fr:'Télécharger gratuitement',es:'Descargar gratis'},
    pl_basic_trial:{tr:'Kurulumda: 15 gün tam Pro deneme',en:'At install: 15-day full Pro trial',de:'Bei Installation: 15 Tage Pro-Test',fr:'À l\'installation : essai Pro de 15 jours',es:'Al instalar: 15 días de prueba Pro'},

    pl_pro:{tr:'⭐ PRO',en:'⭐ PRO',de:'⭐ PRO',fr:'⭐ PRO',es:'⭐ PRO'},
    pl_pro_price:{tr:'€219 <small>/ yıl</small>',en:'€219 <small>/ year</small>',de:'€219 <small>/ Jahr</small>',fr:'€219 <small>/ an</small>',es:'€219 <small>/ año</small>'},
    pl_pro_note:{tr:'veya <strong>€29/ay</strong> — yıllıkta <strong>€129 tasarruf</strong>',en:'or <strong>€29/mo</strong> — <strong>save €129</strong> with annual',de:'oder <strong>€29/Mon.</strong> — <strong>sparen Sie €129</strong>',fr:'ou <strong>29 €/mois</strong> — <strong>économisez 129 €</strong>',es:'o <strong>29 €/mes</strong> — <strong>ahorre 129 €</strong>'},
    pl_pro_1:{tr:'Tüm Pro özellikleri, offline çalışır',en:'All Pro features, works offline',de:'Alle Pro-Funktionen, offline nutzbar',fr:'Toutes les fonctionnalités Pro, hors ligne',es:'Todas las funciones Pro, sin conexión'},
    pl_pro_2:{tr:'1 lisans — 2 PC\'de eşzamanlı',en:'1 license — runs on 2 PCs at once',de:'1 Lizenz — gleichzeitig auf 2 PCs',fr:'1 licence — 2 PC simultanément',es:'1 licencia — 2 PC a la vez'},
    pl_pro_3:{tr:'Elle sürükle-bırak + kurumsal PDF + 5 dil',en:'Manual drag & drop + branded PDF + 5 languages',de:'Manuelles Drag & Drop + PDF mit Logo + 5 Sprachen',fr:'Glisser-déposer + PDF avec logo + 5 langues',es:'Arrastrar y soltar + PDF con logotipo + 5 idiomas'},
    pl_pro_4:{tr:'Aks yükü, çok duraklı LIFO, istifleme kuralları',en:'Axle load, multi-drop LIFO, stacking rules',de:'Achslast, Multi-Drop LIFO, Stapelregeln',fr:'Charge à l\'essieu, multi-arrêts LIFO, empilement',es:'Carga por eje, multi-parada LIFO, apilamiento'},
    pl_pro_5:{tr:'Grup etiketleri + QR + Excel/CSV içe aktarma',en:'Group labels + QR + Excel/CSV import',de:'Gruppen­etiketten + QR + Excel/CSV',fr:'Étiquettes de groupe + QR + Excel/CSV',es:'Etiquetas de grupo + QR + Excel/CSV'},
    pl_pro_cta_year:{tr:'Yıllık Al — €219',en:'Buy Yearly — €219',de:'Jährlich kaufen — €219',fr:'Achat annuel — 219 €',es:'Comprar anual — 219 €'},
    pl_pro_cta_month:{tr:'Aylık: €29/ay',en:'Monthly: €29/mo',de:'Monatlich: €29/Mon.',fr:'Mensuel : 29 €/mois',es:'Mensual: 29 €/mes'},

    pl_pplus:{tr:'PRO+',en:'PRO+',de:'PRO+',fr:'PRO+',es:'PRO+'},
    pl_pplus_price:{tr:'€890 <small>/ yıl</small>',en:'€890 <small>/ year</small>',de:'€890 <small>/ Jahr</small>',fr:'€890 <small>/ an</small>',es:'€890 <small>/ año</small>'},
    pl_pplus_note:{tr:'<strong>8 lisans</strong> — 8 ayrı PRO almaktan <strong>€862 tasarruf</strong>',en:'<strong>8 licenses</strong> — <strong>save €862</strong> vs 8 separate PRO subscriptions',de:'<strong>8 Lizenzen</strong> — <strong>sparen Sie €862</strong> gegenüber 8 einzelnen PRO',fr:'<strong>8 licences</strong> — <strong>économisez 862 €</strong> vs 8 abonnements PRO séparés',es:'<strong>8 licencias</strong> — <strong>ahorre 862 €</strong> frente a 8 suscripciones PRO separadas'},
    pl_pplus_1:{tr:'PRO\'daki her şey, 8 kullanıcı için',en:'Everything in PRO, for 8 users',de:'Alles aus PRO, für 8 Nutzer',fr:'Tout PRO, pour 8 utilisateurs',es:'Todo lo de PRO, para 8 usuarios'},
    pl_pplus_2:{tr:'8 lisans — her biri 2 PC (toplam 16 PC)',en:'8 licenses — each on 2 PCs (16 PCs total)',de:'8 Lizenzen — je 2 PCs (16 PCs total)',fr:'8 licences — 2 PC chacune (16 PC au total)',es:'8 licencias — 2 PC cada una (16 PC en total)'},
    pl_pplus_3:{tr:'Öncelikli uzaktan teknik destek',en:'Priority remote tech support',de:'Priorisierter Fern-Support',fr:'Support technique prioritaire',es:'Soporte técnico prioritario'},
    pl_pplus_4:{tr:'Güncellemelere erken erişim',en:'Early access to updates',de:'Früher Zugang zu Updates',fr:'Accès anticipé aux mises à jour',es:'Acceso anticipado a actualizaciones'},
    pl_pplus_5:{tr:'Tavsiye et, kazan — promo kodunuzla +1 ay',en:'Refer & earn — +1 month per sale',de:'Empfehlen & verdienen — +1 Monat',fr:'Parrainez et gagnez — +1 mois',es:'Recomiende y gane — +1 mes'},
    pl_pplus_cta:{tr:'PRO+ Satın Al — €890',en:'Buy PRO+ — €890',de:'PRO+ kaufen — €890',fr:'Acheter PRO+ — 890 €',es:'Comprar PRO+ — 890 €'},
    pl_pplus_more:{tr:'8\'den fazla kullanıcı? Teklif iste',en:'More than 8 users? Get a quote',de:'Mehr als 8 Nutzer? Angebot anfordern',fr:'Plus de 8 utilisateurs ? Devis',es:'¿Más de 8 usuarios? Presupuesto'},
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

    // ---- CHECKOUT page (esp.biltech.ee/checkout) ----
    ck_title:{tr:'Siparişini tamamla',en:'Complete your order',de:'Bestellung abschließen',fr:'Finaliser votre commande',es:'Completar su pedido'},
    ck_subtitle:{tr:'Güvenli ödeme sayfasına yönlendiriliyorsunuz.',en:'Redirecting you to the secure checkout.',de:'Sie werden zur sicheren Kasse weitergeleitet.',fr:'Redirection vers le paiement sécurisé.',es:'Redirigiéndote al pago seguro.'},
    ck_change_plan:{tr:'← Planı değiştir',en:'← Change plan',de:'← Plan ändern',fr:'← Changer de plan',es:'← Cambiar plan'},
    ck_total:{tr:'Toplam',en:'Total',de:'Gesamt',fr:'Total',es:'Total'},
    ck_vat_note:{tr:'KDV, adresine göre sonraki adımda hesaplanır. Kurumsal alıcılar (geçerli VAT no) ters vergi (reverse-charge) uygulanır.',en:'VAT is calculated at the next step based on your address. Business buyers with a valid VAT number get reverse-charge treatment.',de:'MwSt. wird im nächsten Schritt basierend auf Ihrer Adresse berechnet. Geschäftskunden mit gültiger USt-IdNr. erhalten Reverse-Charge.',fr:'TVA calculée à l\'étape suivante selon votre adresse. Autoliquidation pour les acheteurs professionnels avec numéro TVA valide.',es:'El IVA se calcula en el siguiente paso según su dirección. Los compradores empresariales con NIF-IVA válido reciben inversión del sujeto pasivo.'},

    ck_contact_section:{tr:'İletişim',en:'Contact',de:'Kontakt',fr:'Contact',es:'Contacto'},
    ck_email_label:{tr:'E-posta *',en:'Email *',de:'E-Mail *',fr:'E-mail *',es:'Correo electrónico *'},
    ck_name_label:{tr:'Ad Soyad *',en:'Full name *',de:'Vollständiger Name *',fr:'Nom complet *',es:'Nombre completo *'},

    ck_company_section:{tr:'Firma bilgileri',en:'Company details',de:'Firmendaten',fr:'Informations société',es:'Datos de la empresa'},
    ck_company_label:{tr:'Firma / kurum adı *',en:'Company / organization name *',de:'Firmen- / Organisationsname *',fr:'Nom de l\'entreprise *',es:'Nombre de la empresa *'},
    ck_company_hint:{tr:'Fatura ve lisansta bu isim görünür — PDF raporlarınızın başlığında da kullanılır.',en:'This name will appear on the invoice and license — and in the header of your PDF reports.',de:'Dieser Name erscheint auf Rechnung, Lizenz und in PDF-Berichten.',fr:'Ce nom apparaît sur facture, licence et en-tête de rapports PDF.',es:'Este nombre aparece en factura, licencia y en el encabezado de los informes PDF.'},
    ck_vat_label:{tr:'VAT / Vergi numarası',en:'VAT / Tax number',de:'USt-IdNr. / Steuernummer',fr:'Numéro TVA',es:'Número IVA / NIF'},
    ck_vat_hint:{tr:'AB firmaları için opsiyonel — geçerli VAT no girilirse ters vergi uygulanır.',en:'Optional for EU businesses — reverse-charge applies if a valid VAT number is entered.',de:'Optional für EU-Firmen — Reverse-Charge bei gültiger USt-IdNr.',fr:'Optionnel pour les entreprises UE — autoliquidation si TVA valide.',es:'Opcional para empresas UE — inversión del sujeto pasivo si el IVA es válido.'},

    ck_address_section:{tr:'Fatura adresi',en:'Billing address',de:'Rechnungsadresse',fr:'Adresse de facturation',es:'Dirección de facturación'},
    ck_country_label:{tr:'Ülke *',en:'Country *',de:'Land *',fr:'Pays *',es:'País *'},
    ck_city_label:{tr:'Şehir *',en:'City *',de:'Stadt *',fr:'Ville *',es:'Ciudad *'},
    ck_zip_label:{tr:'Posta kodu *',en:'Postal code *',de:'PLZ *',fr:'Code postal *',es:'Código postal *'},
    ck_street_label:{tr:'Adres *',en:'Street address *',de:'Straße & Nr. *',fr:'Adresse *',es:'Dirección *'},

    ck_terms_label:{tr:'Kullanım koşullarını ve gizlilik politikasını kabul ediyorum',en:'I agree to the terms of service and privacy policy',de:'Ich stimme den AGB und der Datenschutzerklärung zu',fr:'J\'accepte les conditions d\'utilisation et la politique de confidentialité',es:'Acepto los términos y la política de privacidad'},
    ck_submit_btn:{tr:'Ödeme adımına geç →',en:'Continue to payment →',de:'Weiter zur Zahlung →',fr:'Passer au paiement →',es:'Continuar al pago →'},
    ck_submit_loading:{tr:'Ödeme hazırlanıyor…',en:'Preparing your checkout…',de:'Zahlung wird vorbereitet…',fr:'Préparation du paiement…',es:'Preparando el pago…'},
    ck_secure_note:{tr:'Ödeme, güvenli Polar ödeme sayfasında (SSL şifreli) alınır. Fatura Polar tarafından kesilir.',en:'Payment is handled on the secure Polar checkout (SSL encrypted). Invoice issued by Polar.',de:'Die Zahlung erfolgt auf der sicheren Polar-Kasse (SSL-verschlüsselt). Rechnung von Polar.',fr:'Le paiement se fait sur le paiement sécurisé Polar (chiffré SSL). Facture émise par Polar.',es:'El pago se realiza en el pago seguro de Polar (cifrado SSL). Factura emitida por Polar.'},

    ck_error_email:{tr:'Geçerli bir e-posta adresi girin.',en:'Please enter a valid email address.',de:'Bitte gültige E-Mail-Adresse eingeben.',fr:'Veuillez saisir une adresse e-mail valide.',es:'Introduzca un correo electrónico válido.'},
    ck_error_required:{tr:'Lütfen zorunlu alanları doldurun.',en:'Please fill in all required fields.',de:'Bitte alle Pflichtfelder ausfüllen.',fr:'Veuillez remplir tous les champs obligatoires.',es:'Complete todos los campos obligatorios.'},
    ck_error_terms:{tr:'Devam etmek için koşulları kabul etmelisin.',en:'Please accept the terms to continue.',de:'Bitte akzeptieren Sie die AGB.',fr:'Veuillez accepter les conditions pour continuer.',es:'Debe aceptar los términos para continuar.'},
    ck_error_generic:{tr:'Bir sorun oluştu. Lütfen birkaç saniye sonra tekrar dene.',en:'Something went wrong. Please try again in a moment.',de:'Etwas ist schiefgelaufen. Bitte gleich erneut versuchen.',fr:'Un problème est survenu. Veuillez réessayer dans un instant.',es:'Algo salió mal. Inténtelo de nuevo en un momento.'},
    ck_error_network:{tr:'Bağlantı hatası. İnternet bağlantını kontrol edip tekrar dene.',en:'Network error. Please check your connection and try again.',de:'Netzwerkfehler. Verbindung prüfen und erneut versuchen.',fr:'Erreur réseau. Vérifiez votre connexion et réessayez.',es:'Error de red. Compruebe su conexión e inténtelo de nuevo.'},
    rate_limit:{tr:'Çok fazla deneme. Lütfen 1 dakika bekle.',en:'Too many attempts. Please wait 1 minute.',de:'Zu viele Versuche. Bitte 1 Minute warten.',fr:'Trop de tentatives. Veuillez attendre 1 minute.',es:'Demasiados intentos. Espere 1 minuto.'},

    plan_cycle_year:{tr:'/ yıl',en:'/ year',de:'/ Jahr',fr:'/ an',es:'/ año'},
    plan_cycle_month:{tr:'/ ay',en:'/ month',de:'/ Monat',fr:'/ mois',es:'/ mes'},
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

  // Expose i18n helpers for other page scripts (e.g. checkout.js)
  window.__espT = T;
  window.__espApplyI18n = applyI18n;
  window.__espGetLang = getLang;

  document.addEventListener('DOMContentLoaded', function () {
    injectShell();
    applyI18n(getLang());
    initDownloadForm();
  });
})();
