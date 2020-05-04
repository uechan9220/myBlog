import * as React from 'react'
import { Link, graphql } from 'gatsby'

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
                fixed: any
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
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 416px) {
    justify-content: center;
  }
  justify-content: space-between;
  padding: 0 1.5rem;
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
      <Container>
        {hoge.map((items: any, index: number) => {
          let post = items.node
          let featuredImgFixed = post.frontmatter.featuredImage.childImageSharp.fixed
          return (
            <Card key={index}>
              <Link to={post.fields.slug}>
                <CenterContainer>
                  <ImageContainer>
                    <Img fixed={featuredImgFixed} />
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
    </IndexLayout>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            featuredImage {
              childImageSharp {
                fixed(width: 336) {
                  ...GatsbyImageSharpFixed
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
