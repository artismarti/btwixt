import React from 'react'
import { Carousel, Image } from 'react-bootstrap/'

const HomePage = props => (
  <Carousel fade keyboard>
    <Carousel.Item>
      <Image
        className="d-block w-100"
        src="https://images.unsplash.com/photo-1462536943532-57a629f6cc60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"
        alt="First slide"
        fluid
      />
      <Carousel.Caption>
        <h3>Meet in the middle</h3>
        <p>
          bTwixt makes it easy to decide where to meet friends starting off from
          different locations.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3>No more arguments about where to meet</h3>
        <p>
          Just tell bTwixt all the starting locations & get back suggested
          location and venues to meet at.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.unsplash.com/photo-1496275068113-fff8c90750d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        alt="Third slide"
      />

      <Carousel.Caption>
        <h3>Focus on the friendship, not the logistics</h3>
        <p>
          Easily invite friends, get updated suggestions if someone drops out or
          joins in.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
)
export default HomePage
