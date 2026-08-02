import type { Unit } from '../types'

const IMG = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

/** Facade shot differs per unit so the grid doesn't look duplicated. */
const FACADES = [
  'photo-1568605114967-8130f3a36994',
  'photo-1512917774080-9991f1c4c750',
  'photo-1570129477492-45c003edd2be',
  'photo-1580587771525-78b9dba3b914',
  'photo-1600596542815-ffad4c1539a9',
]

/**
 * Gallery order is fixed by the content spec (ข้อ 2.3):
 * facade → garden → living → kitchen → masterbed → bathroom → plan-1f → plan-2f
 */
const galleryFor = (facadeIndex: number): string[] => [
  IMG(FACADES[facadeIndex]), // facade
  IMG('photo-1558904541-efa843a96f01'), // garden
  IMG('photo-1586023492125-27b2c045efd7'), // living
  IMG('photo-1556909212-d5b604d0c90d'), // kitchen
  IMG('photo-1560448204-e02f11c3d0e2'), // masterbed
  IMG('photo-1552321554-5fefe8c9ef14'), // bathroom
  IMG('photo-1503387762-592deb58ef4e'), // plan-1f
  IMG('photo-1524758631624-e2822e304c36'), // plan-2f
]

const altTextsFor = (project: string, model: string): string[] => [
  `หน้าบ้านโครงการ ${project} แบบบ้าน ${model} มุมมองจากถนนหน้าโครงการ`,
  `สวนหลังบ้านโครงการ ${project} แบบบ้าน ${model} พร้อมพื้นที่พักผ่อนกลางแจ้ง`,
  `ห้องนั่งเล่นบ้าน ${model} โครงการ ${project} เพดานสูงพร้อมหน้าต่างกระจกบานใหญ่`,
  `ห้องครัวบ้าน ${model} โครงการ ${project} แบบครัวปิดพร้อมเคาน์เตอร์หินสังเคราะห์`,
  `ห้องนอนใหญ่บ้าน ${model} โครงการ ${project} พร้อมห้องแต่งตัวในตัว`,
  `ห้องน้ำหลักบ้าน ${model} โครงการ ${project} แยกส่วนเปียกส่วนแห้ง`,
  `แปลนบ้านชั้น 1 แบบบ้าน ${model} โครงการ ${project}`,
  `แปลนบ้านชั้น 2 แบบบ้าน ${model} โครงการ ${project}`,
]

export const units: Unit[] = [
  {
    id: 'u-1',
    unitCode: 'ART-A01',
    plot: 'A01',
    project: 'Artale อโศก-พระราม 9',
    brand: 'Artale',
    houseModel: 'ARCH',
    propertyType: 'บ้านเดี่ยว',
    location: 'อโศก-พระราม 9',
    areaSqWa: 42.5,
    areaSqM: 385,
    bedrooms: 5,
    bathrooms: 6,
    parking: 3,
    direction: 'ตะวันออก',
    listPrice: 45_000_000,
    promoPrice: 42_900_000,
    status: 'ว่าง',
    updatedAt: '30 ก.ค. 69',
    petFriendly: true,
    nearInternationalSchool: true,
    nearBTS: true,
    images: galleryFor(0),
    altTexts: altTextsFor('Artale อโศก-พระราม 9', 'ARCH'),
    seoTitle: 'Artale อโศก-พระราม 9 บ้านเดี่ยวหรูใจกลางเมือง แบบ ARCH 5 ห้องนอน',
    seoDescription:
      'บ้านเดี่ยวระดับลักชัวรี Artale อโศก-พระราม 9 แบบบ้าน ARCH 385 ตร.ม. 5 ห้องนอน 6 ห้องน้ำ จอดรถ 3 คัน ใกล้ MRT พระราม 9 เริ่ม 42.9 ล้านบาท',
    imageSizesKB: [512, 240, 180, 165, 190, 155, 96, 92],
  },
  {
    id: 'u-2',
    unitCode: 'AIR2-A05',
    plot: 'A05',
    project: 'Airi พระราม 2',
    brand: 'Airi',
    houseModel: 'SORA',
    propertyType: 'บ้านเดี่ยว',
    location: 'พระราม 2',
    areaSqWa: 50.1,
    areaSqM: 178,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    direction: 'เหนือ',
    listPrice: 12_500_000,
    promoPrice: 10_900_000,
    status: 'จองแล้ว',
    updatedAt: '12 ก.ค. 69',
    petFriendly: true,
    nearInternationalSchool: false,
    nearBTS: false,
    images: galleryFor(1),
    altTexts: [
      ...altTextsFor('Airi พระราม 2', 'SORA').slice(0, 5),
      '',
      '',
      ...altTextsFor('Airi พระราม 2', 'SORA').slice(7),
    ],
    seoTitle: 'Airi พระราม 2 บ้านเดี่ยว แบบ SORA 4 ห้องนอน เริ่ม 10.9 ล้าน',
    seoDescription:
      'บ้านเดี่ยว Airi พระราม 2 แบบบ้าน SORA 178 ตร.ม. บนที่ดิน 50.1 ตร.ว. 4 ห้องนอน 3 ห้องน้ำ จอดรถ 2 คัน ทิศเหนือ พร้อมอยู่ ราคาโปรโมชั่น 10.9 ล้านบาท',
    imageSizesKB: [280, 610, 210, 175, 205, 160, 88, 90],
  },
  {
    id: 'u-3',
    unitCode: 'AND-B02',
    plot: 'B02',
    project: 'Anda ราชพฤกษ์-แจ้งวัฒนะ',
    brand: 'Anda',
    houseModel: 'MONO',
    propertyType: 'บ้านเดี่ยว',
    location: 'ราชพฤกษ์-แจ้งวัฒนะ',
    areaSqWa: 38,
    areaSqM: 152,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    direction: 'เหนือ',
    listPrice: 6_990_000,
    promoPrice: 5_990_000,
    status: 'ว่าง',
    updatedAt: '30 ก.ค. 69',
    petFriendly: false,
    nearInternationalSchool: true,
    nearBTS: false,
    images: galleryFor(2),
    altTexts: altTextsFor('Anda ราชพฤกษ์-แจ้งวัฒนะ', 'MONO'),
    seoTitle: 'Anda ราชพฤกษ์-แจ้งวัฒนะ บ้านเดี่ยว MONO 3 ห้องนอน 5.99 ล้าน',
    seoDescription:
      'บ้านเดี่ยว Anda ราชพฤกษ์-แจ้งวัฒนะ แบบบ้าน MONO 152 ตร.ม. 38 ตร.ว. 3 ห้องนอน 3 ห้องน้ำ ใกล้โรงเรียนนานาชาติ ราคาโปรโมชั่น 5.99 ล้านบาท',
    imageSizesKB: [220, 195, 205, 170, 188, 150, 84, 86],
  },
  {
    id: 'u-4',
    unitCode: 'URB-C01',
    plot: 'C01',
    project: 'Urbanio วิภาวดี-แจ้งวัฒนะ',
    brand: 'Urbanio',
    houseModel: 'CREST',
    propertyType: 'ทาวน์โฮม',
    location: 'วิภาวดี-แจ้งวัฒนะ',
    areaSqWa: 20.5,
    areaSqM: 180,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    direction: 'ใต้',
    listPrice: 5_890_000,
    promoPrice: null,
    status: 'ทำสัญญา',
    updatedAt: '05 ก.ค. 69',
    petFriendly: false,
    nearInternationalSchool: false,
    nearBTS: true,
    images: galleryFor(3),
    altTexts: altTextsFor('Urbanio วิภาวดี-แจ้งวัฒนะ', 'CREST'),
    seoTitle:
      'Urbanio วิภาวดี-แจ้งวัฒนะ ทาวน์โฮม 3 ชั้น แบบ CREST ใกล้รถไฟฟ้าสายสีชมพู เดินทางสะดวกเข้าเมือง',
    seoDescription:
      'ทาวน์โฮม Urbanio วิภาวดี-แจ้งวัฒนะ แบบ CREST 180 ตร.ม. 20.5 ตร.ว. 3 ห้องนอน 3 ห้องน้ำ ใกล้รถไฟฟ้า ราคา 5.89 ล้านบาท',
    imageSizesKB: [198, 205, 215, 168, 182, 148, 80, 82],
  },
  {
    id: 'u-5',
    unitCode: 'AIR2-C03',
    plot: 'E03',
    project: 'Atoll วงแหวน-ลำลูกกา',
    brand: 'Atoll',
    houseModel: 'DELIGHT',
    propertyType: 'บ้านเดี่ยว',
    location: 'วงแหวน-ลำลูกกา',
    areaSqWa: 52,
    areaSqM: 165,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    direction: 'ตะวันออก',
    listPrice: 4_990_000,
    promoPrice: null,
    status: 'ขายแล้ว',
    updatedAt: '30 มิ.ย. 69',
    petFriendly: true,
    nearInternationalSchool: false,
    nearBTS: false,
    images: galleryFor(4),
    altTexts: [...altTextsFor('Atoll วงแหวน-ลำลูกกา', 'DELIGHT').slice(0, 3), '', '', '', '', ''],
    seoTitle: 'Atoll วงแหวน-ลำลูกกา บ้านเดี่ยว DELIGHT 4 ห้องนอน',
    seoDescription: 'บ้านเดี่ยว Atoll วงแหวน-ลำลูกกา แบบบ้าน DELIGHT 165 ตร.ม. บนที่ดิน 52 ตร.ว.',
    imageSizesKB: [340, 320, 199, 176, 186, 158, 78, 79],
  },
]

