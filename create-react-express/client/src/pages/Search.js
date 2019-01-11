import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Container, Row, Col } from 'reactstrap';
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import Book from "../components/Book";
import SaveBtn from "../components/SaveBtn";

function getSafe(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    console.log("getSafe employed: " + fn)
    return defaultVal;
  }
}
class Books extends Component {
  state = {
    books: [],
    title: "",
    author: ""
  };

  saveBook = id => {
    API.saveBook(id)
      .then(res => {
        alert("Book saved! Click in the nav bar to see your saved books");
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.getBooks({
        title: this.state.title,
        author: this.state.author
      })
        .then(res => {
          this.setState({ books: res.data.items})
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Row className="statement">
              <h1>Find a great book!</h1>
            </Row>
            <Jumbotron>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search for book
              </FormBtn>
            </Jumbotron>
          </Col>
          <Col size="md-6">
            <List>
              {this.state.books.map(book => (
                <ListItem>
                  <Book
                    id={book.id}
                    key={book.id}
                    author={book.volumeInfo.authors[0]}
                    title={book.volumeInfo.title}
                    synopsis={getSafe(() => book.volumeInfo.description)}
                    image={getSafe(() => book.volumeInfo.imageLinks.thumbnail)}
                  />
                  <SaveBtn onClick={() => this.saveBook({
                    reference: `${book.id}`,
                    title: `${book.volumeInfo.title}`,
                    author: `${book.volumeInfo.authors[0]}`,
                    synopsis: `${getSafe(() => book.volumeInfo.description)}`,
                    image: `${getSafe(() => book.volumeInfo.imageLinks.thumbnail)}`
                  })} />
                </ListItem>
              ))}
            </List>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
