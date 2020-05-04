import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize'
import '../styles/normalize'

import Header from '../components/Header'
import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
      siteUrl: string
    }
  }
}

interface IndexLayoutProps{
  slug?: string
  articleTitle?: string
}

const IndexLayout: React.FC<IndexLayoutProps> = ({ articleTitle, slug, children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <LayoutRoot>
        {/* {console.log(`${data.site.siteMetadata.siteUrl}${slug}twitter-card.jpg`)} */}
        {console.log(children)}

        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@uechan9220'},
            { property: 'og:url', content: `${data.site.siteMetadata.siteUrl}${slug}` },
            { property: 'og:title', content: articleTitle },
            { property: 'og:description', content: data.site.siteMetadata.description },
            // { property: 'og:image', content: '画像のURL' }
          ]}
        />
        <Header title={data.site.siteMetadata.title} />
        <LayoutMain>{children}</LayoutMain>
      </LayoutRoot>
    )}
  />
)

export default IndexLayout
