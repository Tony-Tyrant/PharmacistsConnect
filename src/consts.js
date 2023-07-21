
export const districtMap = [
    {
        id: 0,
        label: { zh: '香港島', en: 'Hong Kong Island' },
        value: [
            { id: 0, label: { zh: '中西區', en: 'Central and Western' }, value: 'central_and_western' },
            { id: 1, label: { zh: '灣仔', en: 'Wan Chai' }, value: 'wan_chai' },
            { id: 2, label: { zh: '東區', en: 'Eastern' }, value: 'eastern' },
            { id: 3, label: { zh: '南區', en: 'Southern' }, value: 'southern' }
        ],
    },
    {
        id: 1,
        label: { zh: '九龍', en: 'Kowloon' },
        value: [
            { id: 0, label: { zh: '深水埗', en: 'Sham Shui Po' }, value: 'sham_shui_po' },
            { id: 1, label: { zh: '油尖旺', en: 'Yau Tsim Mong' }, value: 'yau_tsim_mong' },
            { id: 2, label: { zh: '九龍城', en: 'Kowloon City' }, value: 'kowloon_city' },
            { id: 3, label: { zh: '黃大仙', en: 'Wong Tai Sin' }, value: 'wong_tai_sin' },
            { id: 4, label: { zh: '觀塘', en: 'Kwun Tong' }, value: 'kwun_tong' },
        ],
    },
    {
        id: 2,
        label: { zh: '新界', en: 'New Territories' },
        value: [
            { id: 0, label: { zh: '沙田', en: 'Shatin' }, value: 'sha_tin' },
            { id: 1, label: { zh: '大埔', en: 'Tai Po' }, value: 'tai_po' },
            { id: 2, label: { zh: '北區', en: 'Northern' }, value: 'north' },
            { id: 3, label: { zh: '元朗', en: 'Yuen Long' }, value: 'yuen_long' },
            { id: 4, label: { zh: '屯門', en: 'Tuen Mun' }, value: 'tuen_mun' },
            { id: 5, label: { zh: '西貢', en: 'Sai Kung' }, value: 'sai_kung' },
            { id: 6, label: { zh: '離島', en: 'Islands' }, value: 'islands' },
            { id: 7, label: { zh: '荃灣', en: 'Tsuen Wan' }, value: 'tsuen_wan' },
            { id: 8, label: { zh: '葵青', en: 'Kwai Tsing' }, value: 'kwai_tsing' },
        ],
    },
]

export const districtGeoMap = {
    'southern': { Latitude: 22.2511479, Longtitude: 114.1514684, },
    'central_and_western': { Latitude: 22.2833322, Longtitude: 114.1499994, },
    'wan_chai': { Latitude: 22.276247, Longtitude: 114.182578, },
    'eastern': { Latitude: 22.2733889, Longtitude: 114.236077, },
    'sham_shui_po': { Latitude: 22.33183, Longtitude: 114.1621, },
    'yau_tsim_mong': { Latitude: 22.32105, Longtitude: 114.17261, },
    'kowloon_city': { Latitude: 22.32866, Longtitude: 114.19121, },
    'wong_tai_sin': { Latitude: 22.35, Longtitude: 114.18333, },
    'kwun_tong': { Latitude: 22.310369, Longtitude: 114.222703, },
    'sha_tin': { Latitude: 22.3887371, Longtitude: 114.1820634, },
    'tai_po': { Latitude: 22.45007, Longtitude: 114.16877, },
    'north': { Latitude: 22.41667, Longtitude: 114.05, },
    'yuen_long': { Latitude: 22.4408288, Longtitude: 114.0171653, },
    'tuen_mun': { Latitude: 22.39175, Longtitude: 113.97157, },
    'sai_kung': { Latitude: 22.38333, Longtitude: 114.26667, },
    'islands': { Latitude: 22.26382, Longtitude: 113.96038, },
    'tsuen_wan': { Latitude: 22.37066, Longtitude: 114.10479, },
    'kwai_tsing': { Latitude: 22.3549, Longtitude: 114.1261, },
};

export const filterMap = [
    {
        id: 0,
        label: { zh: '處方配藥', en: 'Filling Prescriptions' },
        value: 'Prescription',
    },
    {
        id: 1,
        label: { zh: '小病管理', en: 'Managing Minor Ailments' },
        value: 'Minor_Illness',
    },
    {
        id: 2,
        label: { zh: '藥劑師諮詢', en: 'Pharmacist Consultation' },
        value: 'Pharmacists_Enquiry',
    },
];
