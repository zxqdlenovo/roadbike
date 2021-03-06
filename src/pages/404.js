import React from "react"
import Container from "../components/container"
import { Link } from "gatsby"

class FourOhFour extends React.Component {
  render() {
    return (
      <Container>
        <h1>Page not found</h1>
        <p>
          Oops! The page you are looking for has been removed or relocated.
        </p>
        <Link to="/">
          <p>Go Back</p>
        </Link>
      </Container>
    )
  }
}

export default FourOhFour
