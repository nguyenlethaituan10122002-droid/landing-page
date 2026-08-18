import { site, fullAddress } from '@/content/site'
import { services } from '@/content/services'
import { areas } from '@/content/areas'
import { faqs } from '@/content/faq'
import { pricing } from '@/content/pricing'
import { zaloHref } from '@/lib/format'

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

  return {
    '@context': 'https://schema.org',
    '@graph': [localBusiness, website, ...serviceNodes, faqPage],
  }
}

export const jsonLdScript = () => ({
  __html: JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c'),
})

export { fullAddress }
