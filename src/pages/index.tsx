import * as React from 'react'
import { Link, graphql } from 'gatsby'

import Page from '../components/Page'
import IndexLayout from '../layouts'
import Img from 'gatsby-image'

import styled from 'styled-components'
import { colors } from '../styles/variables'

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
  min-width: 21rem;
  min-height: 21rem;
  max-width: 21rem;
  max-height: 21rem;
  margin: 0 0 1rem 0;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Card = styled.div`
  width: 21rem;
  display: flex;
  text-align: center;
  justify-content: center;
  margin: 2rem 0 0 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: ${colors.white};
`

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const TextContainer = styled.div`
  padding: 0.5rem;
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
              <Card>
                <Link to={post.fields.slug} key={index}>
                  <CenterContainer>
                    <ImageContainer>
                      <Img fluid={featuredImgFluid} />
                    </ImageContainer>
                    <TextContainer>
                      <h1>{post.frontmatter.title}</h1>
                    </TextContainer>
                  </CenterContainer>
                </Link>
              </Card>
            )
          })}
        </Container>
      </Page>
    </IndexLayout>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
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
