// Türkiye il → ilçe → okul verileri (örnek veri seti)
// TODO: Backend hazır olduğunda gerçek MEB verisiyle değiştirilecek

export type School = {
  id: string;
  name: string;
  type: "ilkokul" | "ortaokul";
};

export type District = {
  name: string;
  schools: School[];
};

export type City = {
  name: string;
  districts: District[];
};

export const cities: City[] = [
  {
    name: "İstanbul",
    districts: [
      {
        name: "Kadıköy",
        schools: [
          { id: "ist-kad-1", name: "Kadıköy Atatürk İlkokulu", type: "ilkokul" },
          { id: "ist-kad-2", name: "Kadıköy Cumhuriyet Ortaokulu", type: "ortaokul" },
          { id: "ist-kad-3", name: "Fenerbahçe İlkokulu", type: "ilkokul" },
          { id: "ist-kad-4", name: "Göztepe Ortaokulu", type: "ortaokul" },
          { id: "ist-kad-5", name: "Bostancı İlkokulu", type: "ilkokul" },
        ],
      },
      {
        name: "Beşiktaş",
        schools: [
          { id: "ist-bes-1", name: "Beşiktaş İlkokulu", type: "ilkokul" },
          { id: "ist-bes-2", name: "Levent Ortaokulu", type: "ortaokul" },
          { id: "ist-bes-3", name: "Etiler İlkokulu", type: "ilkokul" },
          { id: "ist-bes-4", name: "Ortaköy Ortaokulu", type: "ortaokul" },
        ],
      },
      {
        name: "Üsküdar",
        schools: [
          { id: "ist-usk-1", name: "Üsküdar Atatürk İlkokulu", type: "ilkokul" },
          { id: "ist-usk-2", name: "Çamlıca Ortaokulu", type: "ortaokul" },
          { id: "ist-usk-3", name: "Kısıklı İlkokulu", type: "ilkokul" },
          { id: "ist-usk-4", name: "Altunizade Ortaokulu", type: "ortaokul" },
        ],
      },
      {
        name: "Bakırköy",
        schools: [
          { id: "ist-bak-1", name: "Bakırköy İlkokulu", type: "ilkokul" },
          { id: "ist-bak-2", name: "Yeşilköy Ortaokulu", type: "ortaokul" },
          { id: "ist-bak-3", name: "Ataköy İlkokulu", type: "ilkokul" },
        ],
      },
      {
        name: "Sarıyer",
        schools: [
          { id: "ist-sar-1", name: "Sarıyer İlkokulu", type: "ilkokul" },
          { id: "ist-sar-2", name: "Maslak Ortaokulu", type: "ortaokul" },
          { id: "ist-sar-3", name: "İstinye İlkokulu", type: "ilkokul" },
        ],
      },
      {
        name: "Fatih",
        schools: [
          { id: "ist-fat-1", name: "Fatih Sultan Mehmet İlkokulu", type: "ilkokul" },
          { id: "ist-fat-2", name: "Sultanahmet Ortaokulu", type: "ortaokul" },
          { id: "ist-fat-3", name: "Aksaray İlkokulu", type: "ilkokul" },
        ],
      },
      {
        name: "Beyoğlu",
        schools: [
          { id: "ist-bey-1", name: "Beyoğlu İlkokulu", type: "ilkokul" },
          { id: "ist-bey-2", name: "Galata Ortaokulu", type: "ortaokul" },
        ],
      },
      {
        name: "Ataşehir",
        schools: [
          { id: "ist-ata-1", name: "Ataşehir İlkokulu", type: "ilkokul" },
          { id: "ist-ata-2", name: "Ataşehir Cumhuriyet Ortaokulu", type: "ortaokul" },
          { id: "ist-ata-3", name: "Kayışdağı İlkokulu", type: "ilkokul" },
        ],
      },
    ],
  },
  {
    name: "Ankara",
    districts: [
      {
        name: "Çankaya",
        schools: [
          { id: "ank-can-1", name: "Çankaya Atatürk İlkokulu", type: "ilkokul" },
          { id: "ank-can-2", name: "Kavaklıdere Ortaokulu", type: "ortaokul" },
          { id: "ank-can-3", name: "Ayrancı İlkokulu", type: "ilkokul" },
          { id: "ank-can-4", name: "Bahçelievler Ortaokulu", type: "ortaokul" },
        ],
      },
      {
        name: "Keçiören",
        schools: [
          { id: "ank-kec-1", name: "Keçiören İlkokulu", type: "ilkokul" },
          { id: "ank-kec-2", name: "Etlik Ortaokulu", type: "ortaokul" },
          { id: "ank-kec-3", name: "Kalaba İlkokulu", type: "ilkokul" },
        ],
      },
      {
        name: "Mamak",
        schools: [
          { id: "ank-mam-1", name: "Mamak İlkokulu", type: "ilkokul" },
          { id: "ank-mam-2", name: "Mamak Ortaokulu", type: "ortaokul" },
        ],
      },
      {
        name: "Yenimahalle",
        schools: [
          { id: "ank-yen-1", name: "Yenimahalle İlkokulu", type: "ilkokul" },
          { id: "ank-yen-2", name: "Batıkent Ortaokulu", type: "ortaokul" },
          { id: "ank-yen-3", name: "Demetevler İlkokulu", type: "ilkokul" },
        ],
      },
    ],
  },
  {
    name: "İzmir",
    districts: [
      {
        name: "Konak",
        schools: [
          { id: "izm-kon-1", name: "Konak Atatürk İlkokulu", type: "ilkokul" },
          { id: "izm-kon-2", name: "Alsancak Ortaokulu", type: "ortaokul" },
          { id: "izm-kon-3", name: "Kemeraltı İlkokulu", type: "ilkokul" },
        ],
      },
      {
        name: "Karşıyaka",
        schools: [
          { id: "izm-kar-1", name: "Karşıyaka İlkokulu", type: "ilkokul" },
          { id: "izm-kar-2", name: "Bostanlı Ortaokulu", type: "ortaokul" },
          { id: "izm-kar-3", name: "Mavişehir İlkokulu", type: "ilkokul" },
        ],
      },
      {
        name: "Bornova",
        schools: [
          { id: "izm-bor-1", name: "Bornova İlkokulu", type: "ilkokul" },
          { id: "izm-bor-2", name: "Bornova Ortaokulu", type: "ortaokul" },
        ],
      },
    ],
  },
  {
    name: "Bursa",
    districts: [
      {
        name: "Osmangazi",
        schools: [
          { id: "bur-osm-1", name: "Osmangazi İlkokulu", type: "ilkokul" },
          { id: "bur-osm-2", name: "Osmangazi Ortaokulu", type: "ortaokul" },
        ],
      },
      {
        name: "Nilüfer",
        schools: [
          { id: "bur-nil-1", name: "Nilüfer İlkokulu", type: "ilkokul" },
          { id: "bur-nil-2", name: "Nilüfer Ortaokulu", type: "ortaokul" },
        ],
      },
    ],
  },
  {
    name: "Antalya",
    districts: [
      {
        name: "Muratpaşa",
        schools: [
          { id: "ant-mur-1", name: "Muratpaşa İlkokulu", type: "ilkokul" },
          { id: "ant-mur-2", name: "Muratpaşa Ortaokulu", type: "ortaokul" },
        ],
      },
      {
        name: "Konyaaltı",
        schools: [
          { id: "ant-kon-1", name: "Konyaaltı İlkokulu", type: "ilkokul" },
          { id: "ant-kon-2", name: "Konyaaltı Ortaokulu", type: "ortaokul" },
        ],
      },
    ],
  },
  {
    name: "Adana",
    districts: [
      {
        name: "Seyhan",
        schools: [
          { id: "ada-sey-1", name: "Seyhan İlkokulu", type: "ilkokul" },
          { id: "ada-sey-2", name: "Seyhan Ortaokulu", type: "ortaokul" },
        ],
      },
      {
        name: "Çukurova",
        schools: [
          { id: "ada-cuk-1", name: "Çukurova İlkokulu", type: "ilkokul" },
          { id: "ada-cuk-2", name: "Çukurova Ortaokulu", type: "ortaokul" },
        ],
      },
    ],
  },
  {
    name: "Konya",
    districts: [
      {
        name: "Selçuklu",
        schools: [
          { id: "kon-sel-1", name: "Selçuklu İlkokulu", type: "ilkokul" },
          { id: "kon-sel-2", name: "Selçuklu Ortaokulu", type: "ortaokul" },
        ],
      },
    ],
  },
  {
    name: "Gaziantep",
    districts: [
      {
        name: "Şahinbey",
        schools: [
          { id: "gaz-sah-1", name: "Şahinbey İlkokulu", type: "ilkokul" },
          { id: "gaz-sah-2", name: "Şahinbey Ortaokulu", type: "ortaokul" },
        ],
      },
    ],
  },
  {
    name: "Mersin",
    districts: [
      {
        name: "Mezitli",
        schools: [
          { id: "mer-mez-1", name: "Mezitli İlkokulu", type: "ilkokul" },
          { id: "mer-mez-2", name: "Mezitli Ortaokulu", type: "ortaokul" },
        ],
      },
    ],
  },
  {
    name: "Kayseri",
    districts: [
      {
        name: "Melikgazi",
        schools: [
          { id: "kay-mel-1", name: "Melikgazi İlkokulu", type: "ilkokul" },
          { id: "kay-mel-2", name: "Melikgazi Ortaokulu", type: "ortaokul" },
        ],
      },
    ],
  },
];
