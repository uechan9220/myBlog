import * as React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/Page'
import IndexLayout from '../layouts'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { colors } from '../styles/variables'

interface PageTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    markdownRemark: {
      html: string
      excerpt: string
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

const MainTitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
const Title = styled.h1``
const ImageContainer = styled.div`
  max-width: 20rem;
  max-height: 20rem;
  min-width: 20rem;
  min-height: 20rem;
`

const TitleContainer = styled.div`
  padding: 1rem;
  border-bottom: 4px double #000;
  text-align: center;
`

const MainContant = styled.div`
  padding: 1rem;
`

const Container = styled.div`
  background-color: ${colors.white};
`

const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => {
  let post = data.markdownRemark
  let featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid
  return (
    <IndexLayout>
      <Page>
        <Container>
          <MainTitleContainer>
            <ImageContainer>
              <Img fluid={featuredImgFluid} />
            </ImageContainer>
            <TitleContainer>
              <Title>{data.markdownRemark.frontmatter.title}</Title>
            </TitleContainer>
          </MainTitleContainer>
          <MainContant dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default PageTemplate

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
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
`
