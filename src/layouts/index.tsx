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
      author: {
        image: string
      }
    }
  }
}

interface IndexLayoutProps {
  slug?: string
  articleTitle?: string
  articleImage?: string
}

const IndexLayout: React.FC<IndexLayoutProps> = ({ articleTitle, articleImage, slug, children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author {
              image
            }
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
            { property: 'og:type', content: 'article' },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@uechan9220' },
            { property: 'og:url', content: `${data.site.siteMetadata.siteUrl}${slug}` || data.site.siteMetadata.siteUrl },
            { property: 'og:title', content: articleTitle || data.site.siteMetadata.title },
            { property: 'og:description', content: data.site.siteMetadata.description },
            { property: 'og:image', content: `${data.site.siteMetadata.siteUrl}${articleImage}` || data.site.siteMetadata.author.image }
          ]}
        />
        <Header title={data.site.siteMetadata.title} />
        <LayoutMain>{children}</LayoutMain>
      </LayoutRoot>
    )}
  />
)

export default IndexLayout
