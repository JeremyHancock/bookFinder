import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import API from "../utils/API";
import "./style.css"

class Detail extends Component {
  state = {
    book: {},
    title: "",
    author: "",
    synopsis: ""
  };
  loadBook = () => {
    API.getBook(this.props.match.params.id)
      .then(res => {
        this.setState({
          book: res.data.items[0],
          title: res.data.items[0].volumeInfo.title,
          author: res.data.items[0].volumeInfo.authors[0],
          synopsis: res.data.items[0].volumeInfo.description,
          image: res.data.items[0].volumeInfo.imageLinks.thumbnail,
          category: res.data.items[0].volumeInfo.categories[0],
          pages: res.data.items[0].volumeInfo.pageCount
        })
      })
      .catch(err => console.log(err));
  }
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    this.loadBook();
  }

  render() {
    return (
      <Container >
        <Row className="title-card">
          <Col>
            <img className="image" src={this.state.image} alt={this.state.title} />
          </Col >
          <Col>
            <h1 className="title-card-text">{this.state.title}</h1>
            <h2 className="title-card-text">by</h2>
            <h2 className="title-card-text">{this.state.author}</h2>
          </Col >
        </Row >
        <Row >
          <Col >
            <article className="article">
              <h1>Synopsis</h1>
              <p>
                {this.state.synopsis}
              </p>
              <p>{`Category: ${this.state.category}`}</p>
              <p>{`Page count: ${this.state.pages}`}</p>

            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link className="my-link" to="/">Search for more books!</Link>
          </Col>
        </Row>
      </Container >
    );
  }
}

export default Detail;
