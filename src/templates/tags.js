import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Container from "../components/container"
import getLink from "../utils/node-link"



const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allStoryWriterMarkdown
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? `` : `s`
  } tagged with "${tag}"`

  return (
    <Container>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const title = node.title
          const slug = getLink(node)
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
      <Link to="/tags">All tags</Link>
    </Container>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allStoryWriterMarkdown: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            title: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allStoryWriterMarkdown(
      sort: { fields: [updateDate], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      totalCount
      edges {
        node {
          title
          docType
          slug
        }
      }
    }
  }
`;
