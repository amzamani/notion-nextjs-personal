import { NextApiRequest, NextApiResponse } from 'next'

import { SiteMap } from '../lib/types'
import { host } from '../lib/config'
import { getSiteMaps } from '../lib/get-site-maps'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  const siteMaps = await getSiteMaps()

  // cache sitemap for up to one hour
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, max-age=3600, stale-while-revalidate=3600'
  )
  res.setHeader('Content-Type', 'text/xml')
  res.write(createSitemap(siteMaps[0]))
  res.end()
}

const createSitemap = (
  siteMap: SiteMap
) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->


<url>
  <loc>https://zamani.tech/</loc>
  <lastmod>2022-08-12T08:34:27+00:00</lastmod>
  <priority>1.00</priority>
</url>
<url>
  <loc>https://zamani.tech/contact</loc>
  <lastmod>2022-08-12T08:34:27+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://zamani.tech/toffeemoney--product-engineer</loc>
  <lastmod>2022-08-12T08:34:27+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://zamani.tech/zecide--full-stack-engineer</loc>
  <lastmod>2022-08-12T08:34:27+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://zamani.tech/details-of-projects</loc>
  <lastmod>2022-08-12T08:34:27+00:00</lastmod>
  <priority>0.80</priority>
</url>


</urlset>
    `
