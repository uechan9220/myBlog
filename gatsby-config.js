'use strict'

module.exports = {
  siteMetadata: {
    title: `Moke's Tech Blog`,
    description:
      'アウトプットを出来る環境をと思って作ったTech Blogになります。自分がやっていて詰まったところや、解決策等を主に記事にして書いていく予定です。',
    keywords: 'TypeScript, Javascript, FrontEnd, Blog, techBlog',
    siteUrl: 'https://blog.moke.dev',

    author: {
      name: 'Kazuya Uejima',
      url: 'https://twitter.com/uechan9220',
      email: 'k.uejima0922@gmail.com',
      image: 'https://pbs.twimg.com/profile_images/1230573017882718208/fsGvUR8k_400x400.jpg'
    }
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Moke's Tech Blog`,
        short_name: `Tech Blog`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-154799065-1'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          `gatsby-remark-social-cards`,
          `gatsby-remark-prismjs-title`,
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: true
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://blog.moke.dev'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-styled-components`
  ]
}
