import React from "react";

const QuickReply = (props) => {
  if (props.reply.structValue.fields.payload) {
    return (
      <a
        href="#"
        style={{ marginRight: 3 }}
        className="waves-effect waves-light btn-small"
        onClick={(event) => {
          props.click(
            event,
            props.reply.structValue.fields.payload.stringValue,
            props.reply.structValue.fields.text.stringValue
          );
        }}
      >
        {props.reply.structValue.fields.text.stringValue}
      </a>
    );
  } else {
    return null;
    // <a
    //   href={props.reply.structValue.fields.link.stringValue}
    //   className="waves-effect waves-light btn-small"
    //   style={{ background: "green", margin: 2 }}
    // >
    //   {props.reply.structValue.fields.text.stringValue}
    // </a>
  }
};

export default QuickReply;
