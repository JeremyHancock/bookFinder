import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Container, Row, Col } from 'reactstrap';
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import Book from "../components/Book";

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
          console.log(res.data.items[0].id);
          this.setState({ books: res.data.items, title: "", author: "" })
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Find a great book!</h1>
            </Jumbotron>
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
