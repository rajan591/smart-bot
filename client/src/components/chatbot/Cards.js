import React from "react";
import "./cards.css";

const Cards = (props) => {
  return (
    <div
      style={{
        width: 270,
        paddingRight: 20,
        float: "left",
      }}
    >
      <div
        className="card "
        style={{
          backgroundColor: "#ff8a80",
          textAlign: "center",
          color: "white",
          // border: "2px solid black",
        }}
      >
        <div className="card-image">
          <img
            src={props.payload.fields.image.stringValue}
            alt={props.payload.fields.header.stringValue}
          />
        </div>

        <span
          className="card-title"
          style={{ fontWeight: "bolder", color: "black" }}
        >
          {props.payload.fields.header.stringValue}
        </span>
        <div
          className="card-content"
          style={{ backgroundColor: "#ff8a80", color: "black" }}
        >
          <p>{props.payload.fields.description.stringValue}</p>
          {/* <p>
            <a href="/">{props.payload.fields.price.stringValue} </a>
          </p> */}
        </div>
        {/* <div className="card-action">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={props.payload.fields.link.stringValue}
          >
            View
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Cards;
