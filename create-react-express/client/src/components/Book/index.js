import React from "react";
import "./style.css";

function Book({ ...props }) {
    return (
        <div className="book-card" {...props} >
            <h1 className="book-title">{props.title}</h1>
            <h2 className="book-author">{props.author}</h2>
            <p className="book-synopsis">{props.synopsis}</p>
            <a href={`/books/${props.id}`}>
                <img className="book-image" src={props.image} alt={props.title}></img>
            </a>
        </div>
    );
}

export default Book;