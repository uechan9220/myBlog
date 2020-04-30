import * as React from 'react'
import { Link, graphql } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

interface IndexProps {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          fields: {
            slug: string
          }
          frontmatter: {
            title: string
          }
        }
      }
    }
  }
}

const IndexPage: React.FC<IndexProps> = ({ data }) => {
  let hoge: any = data.allMarkdownRemark.edges
  return (
    <IndexLayout>
      <Page>
        <Container>
          {hoge.map((items: any, index: number) => {
            return (
              <>
                <Link to={items.node.fields.slug} key={index}>
                  <h1>{items.node.frontmatter.title}</h1>
                </Link>
              </>
            )
          })}
        </Container>
      </Page>
    </IndexLayout>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

export default IndexPage
