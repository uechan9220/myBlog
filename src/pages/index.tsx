import * as React from 'react'
import { Link, graphql } from 'gatsby'

import Page from '../components/Page'
import IndexLayout from '../layouts'
import Img from 'gatsby-image'

import styled from 'styled-components'

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
            featuredImage: {
              childImageSharp: {
                fluid: any
              }
            }
          }
        }
      }
    }
  }
}

const ImageContainer = styled.div`
  min-width: 20rem;
  min-height: 20rem;
  max-width: 20rem;
  max-height: 20rem;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Content = styled.div`
  width: 30rem;
  display: flex;
  text-align: center;
  justify-content: center;
`

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const IndexPage: React.FC<IndexProps> = ({ data }) => {
  let hoge: any = data.allMarkdownRemark.edges
  return (
    <IndexLayout>
      <Page>
        <Container>
          {hoge.map((items: any, index: number) => {
            let post = items.node
            let featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid
            return (
              <Content>
                <Link to={post.fields.slug} key={index}>
                  <CenterContainer>
                    <ImageContainer>
                      <Img fluid={featuredImgFluid} />
                    </ImageContainer>
                    <h1>{post.frontmatter.title}</h1>
                  </CenterContainer>
                </Link>
              </Content>
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
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
