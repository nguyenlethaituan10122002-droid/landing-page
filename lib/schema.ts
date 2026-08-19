import { site, fullAddress } from '@/content/site'
import { services } from '@/content/services'
import { areas } from '@/content/areas'
import { faqs } from '@/content/faq'
import { pricing } from '@/content/pricing'
import { zaloHref } from '@/lib/format'
import { video, videoWatchUrl } from '@/content/video'
import { branches } from '@/content/branches'

/**
 * Bo dau tieng Viet roi tao slug.
 * KHONG dung toLowerCase() thang roi loc [^a-z0-9]: lam vay se an mat chinh
 * cac chu co dau, "Quan 1" thanh "qu-n-1" va "TP. Thu Duc" thanh "tp-th-c".
 * NFD tach dau ra thanh ky tu rieng de xoa sach truoc khi loc.
 */
function slug(v: string): string {
  return v
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const BIZ_ID = `${site.url}/#business`

/**
 * Du lieu co cau truc cho Google.
 * KHONG khai bao Review / AggregateRating — khach chua co danh gia that,
 * danh dau schema cho danh gia khong ton tai co the bi Google phat thu cong.
 */
export function buildJsonLd() {
  const localBusiness = {
    '@type': 'HVACBusiness',
    '@id': BIZ_ID,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: [`+84${site.phone.slice(1)}`, `+84${site.phoneAlt.slice(1)}`],
    email: site.email,
    image: `${site.url}/images/og-cover.jpg`,
    logo: `${site.url}/images/logo.png`,
    priceRange: '150.000đ - 2.200.000đ',
    currenciesAccepted: 'VND',
    paymentAccepted: 'Tiền mặt, Chuyển khoản, Ví điện tử',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: `${site.address.ward}, ${site.address.district}`,
      addressRegion: site.address.city,
      addressCountry: site.address.country,
    },
    areaServed: areas.map((name) => ({
      '@type': 'AdministrativeArea',
      name: `${name}, ${site.address.city}`,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    sameAs: [zaloHref(site.zalo)],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Bảng giá dịch vụ điện lạnh',
      itemListElement: pricing.map((row) => ({
        '@type': 'Offer',
        name: `${row.item} — ${row.scope}`,
        priceCurrency: 'VND',
        description: `${row.price} · Bảo hành ${row.warranty}`,
      })),
    },
  }

  const serviceNodes = services.map((s) => ({
    '@type': 'Service',
    '@id': `${site.url}/#service-${s.slug}`,
    serviceType: s.name,
    name: `${s.name} tại nhà TP.HCM`,
    description: s.desc,
    provider: { '@id': BIZ_ID },
    areaServed: { '@type': 'City', name: site.address.city },
    ...(s.price && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'VND',
        description: `${s.price} — ${s.priceNote}`,
      },
    }),
  }))

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${site.url}/#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: 'vi-VN',
    publisher: { '@id': BIZ_ID },
  }

  /**
   * VideoObject — cho phep Google hien video ngay trong ket qua tim kiem.
   * thumbnailUrl tro ve anh tren YouTube chu khong phai ban self-host, vi
   * Google can mot URL cong khai on dinh va doc duoc kich thuoc.
   */
  const videoObject = {
    '@type': 'VideoObject',
    '@id': `${site.url}/#video`,
    name: video.title,
    description: video.desc,
    thumbnailUrl: [`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`],
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: videoWatchUrl,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    publisher: { '@id': BIZ_ID },
  }

  /**
   * Moi diem hoat dong la mot node LocalBusiness rieng, noi ve tru so bang
   * branchOf. Day la cach Google hieu "mot doanh nghiep, nhieu diem" — nho vay
   * tung dia chi co the khop truy van theo quan ("sua may lanh quan 7") thay vi
   * ca trang chi co mot diem duy nhat o Tan Phu.
   *
   * Dung slug tu quan lam @id de moi node co dinh danh on dinh, khong doi khi
   * sap xep lai thu tu trong mang.
   */
  const branchNodes = branches.map((b) => ({
    '@type': 'LocalBusiness',
    '@id': `${site.url}/#branch-${slug(b.district)}`,
    name: `${site.name} — ${b.district}`,
    parentOrganization: { '@id': BIZ_ID },
    branchOf: { '@id': BIZ_ID },
    url: site.url,
    telephone: `+84${site.phone.slice(1)}`,
    image: `${site.url}/images/og-cover.jpg`,
    priceRange: '150.000đ - 2.200.000đ',
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.street,
      addressLocality: b.district,
      addressRegion: site.address.city,
      addressCountry: 'VN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
  }))

  return {
    '@context': 'https://schema.org',
    '@graph': [localBusiness, ...branchNodes, website, ...serviceNodes, faqPage, videoObject],
  }
}

export const jsonLdScript = () => ({
  __html: JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c'),
})

export { fullAddress }
