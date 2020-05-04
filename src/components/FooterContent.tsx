import * as React from 'react'
import { Link } from 'gatsby'

import styled from 'styled-components'
import Img from 'gatsby-image'

interface FooterContentProps {
  data: {
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

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 10rem;
  max-height: 15rem;
`

const ImageContainer = styled.div`
  min-width: 10rem;
  min-height: 10rem;
  max-width: 10rem;
  max-height: 10rem;
  margin: 0 0 1rem 0;
`

const TextContainer = styled.div`
  padding: 0.5rem;
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 416px) {
    justify-content: center;
  }
  justify-content: space-between;
`

const Container = styled.div`
  padding: 1rem;
`

const FooterContent: React.FC<FooterContentProps> = ({ data }) => {
  let test: any = data.edges
  return (
    <Container>
      <h2>最新記事</h2>
      <CardContainer>
        {test.map((items: any, index: number) => {
          let post = items.node
          let featuredImgFixed = post.frontmatter.featuredImage.childImageSharp.fixed
          return (
            <Link to={post.fields.slug} key={index}>
              <CenterContainer>
                <ImageContainer>
                  <Img fixed={featuredImgFixed} />
                </ImageContainer>
                <TextContainer>
                  <p>{post.frontmatter.title}</p>
                </TextContainer>
              </CenterContainer>
            </Link>
          )
        })}
      </CardContainer>
    </Container>
  )
}

export default FooterContent
