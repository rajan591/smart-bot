import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Message from "./Message";
import Card from "./Cards";
import QuickReplies from "./QuickReplies";
import Cookies from "universal-cookie";
import uuid from "uuid";
import messageSound from "./../../assets/open-ended.mp3";
const cookies = new Cookies();

class Chatbot extends Component {
  messagesEnd;
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleQuickReplyPayload = this.handleQuickReplyPayload.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      messages: [],
      showBot: true,
      shopWelcomeSent: false,
    };
    this.sound = new Audio(messageSound);
    if (cookies.get("userID") === undefined) {
      cookies.set("userID", uuid(), { path: "/" });
    }
    console.log(cookies.get("userID"));
  }

  async df_text_query(text) {
    let says = {
      speaks: "me",
      msg: {
        text: {
          text: text,
        },
      },
    };
    this.setState({
      messages: [...this.state.messages, says],
    });
    try {
      const res = await axios.post("/api/df_text_query", {
        text,
        userID: cookies.get("userID"),
      });
      for (let msg of res.data.fulfillmentMessages) {
        says = {
          speaks: "bot",
          msg: msg,
        };
        this.setState({
          messages: [...this.state.messages, says],
        });
      }
    } catch (e) {
      says = {
        speaks: "bot",
        msg: {
          text: {
            text:
              " I am having troubles. I need to terminate, will be back later",
          },
        },
      };
      this.setState({ messages: [...this.state.messages, says] });
      let that = this;
      setTimeout(function () {
        that.setState({
          showBot: false,
        });
      }, 2000);
    }
    this.sound.play();
  }

  async df_event_query(event) {
    try {
      const res = await axios.post("/api/df_event_query", {
        event,
        userID: cookies.get("userID"),
      });
      for (let msg of res.data.fulfillmentMessages) {
        let says = {
          speaks: "bot",
          msg: msg,
        };
        this.setState({
          messages: [...this.state.messages, says],
        });
      }
    } catch {
      let says = {
        speaks: "bot",
        msg: {
          text: {
            text:
              "I am having troubles. I need to terminate, will be back later",
          },
        },
      };
      this.setState({ messages: [...this.state.messages, says] });
      let that = this;
      setTimeout(function () {
        that.setState({
          showBot: false,
        });
      }, 2000);
    }
  }

  resolveAfterXSeconds(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x);
      }, (x = 1000));
    });
  }

  async componentDidMount() {
    this.df_event_query("Welcome");
    if (window.location.pathname === "/about" && !this.state.shopWelcomeSent) {
      await this.resolveAfterXSeconds(1);
      this.df_event_query("About");
      this.setState({ shopWelcomeSent: true, showBot: true });
    }
    this.props.history.listen(() => {
      if (
        this.props.history.location.pathname === "/about" &&
        !this.state.shopWelcomeSent
      ) {
        this.df_event_query("About");
        this.setState({ shopWelcomeSent: true, showBot: true });
      }
    });
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behaviour: "smooth" });
    if (this.talkInput) {
      this.talkInput.focus();
    }
  }

  show(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      showBot: true,
    });
  }

  hide(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      showBot: false,
    });
  }

  handleQuickReplyPayload(event, payload, text) {
    event.preventDefault();
    event.stopPropagation();

    switch (payload) {
      case "recommend_yes":
        this.df_event_query("SHOW_RECOMMENDATION");
        break;
      case "training_masterclass":
        this.df_event_query("MASTERCLASS");
        break;
      default:
        this.df_text_query(text);
        break;
    }
  }
  //Render finction
  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
      );
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.cards
    ) {
      return (
        <div key={i}>
          <div
            className="card-panel  z-depth-1"
            style={{ backgroundColor: "#f1f0f0" }}
          >
            <div style={{ overflow: "auto" }}>
              <div style={{ overflow: "auto", overflowY: "scroll" }}>
                <div
                  style={{
                    height: 300,
                    width:
                      message.msg.payload.fields.cards.listValue.values.length *
                      270,
                  }}
                >
                  {this.renderCards(
                    message.msg.payload.fields.cards.listValue.values
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.quick_replies
    ) {
      return (
        <QuickReplies
          text={
            message.msg.payload.fields.text
              ? message.msg.payload.fields.text
              : null
          }
          key={i}
          replyClick={this.handleQuickReplyPayload}
          speaks={message.speaks}
          payload={message.msg.payload.fields.quick_replies.listValue.values}
        />
      );
    }
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.df_text_query(e.target.value);
      e.target.value = "";
    }
  }

  render() {
    if (this.state.showBot) {
      return (
        // <div
        //   style={{
        //     minHeight: 600,
        //     maxHeight: 470,
        //     width: 400,
        //     position: "absolute",
        //     bottom: 30,
        //     right: 20,
        //     border: "3px solid black",
        //     borderRadius: 20,
        //     backgroundColor: "#546e7a",
        //   }}
        // >
        //   <nav style={{ borderRadius: 20, backgroundColor: "#546e7a" }}>
        //     <div className=" nav-wrapper ">
        //       <a
        //         href="/"
        //         className="brand-logo"
        //         style={{ borderRadius: 20, textAlign: "center" }}
        //       >
        //         S-Bot
        //       </a>
        //       <ul
        //         id="nav-mobile"
        //         className="right hide-on-med-and-down"
        //         style={{
        //           marginRight: 15,
        //         }}
        //       >
        //         <li>
        //           <i class="medium material-icons" onClick={this.hide}>
        //             close
        //           </i>
        //         </li>
        //       </ul>
        //     </div>
        //   </nav>
        //   <div
        //     id="chatbot"
        //     style={{
        //       minHeight: 480,
        //       maxHeight: 480,
        //       width: "100%",
        //       overflow: "auto",
        //       backgroundColor: "#80cbc4",
        //     }}
        //   >
        //     {this.renderMessages(this.state.messages)}
        //     <div
        //       ref={(el) => {
        //         this.messagesEnd = el;
        //       }}
        //       style={{ float: "left", clear: "both" }}
        //     />
        //   </div>
        //   <div className=" col s12">
        //     <input
        //       style={{
        //         margin: 5,
        //         paddingLeft: "1%",
        //         paddingRight: "1%",
        //         width: "95%",
        //       }}
        //       ref={(input) => {
        //         this.talkInput = input;
        //       }}
        //       placeholder="type a message:"
        //       onKeyPress={this.handleKeyPress}
        //       id="user_says"
        //       type="text"
        //     />
        //   </div>
        // </div>
        <div
          style={{
            height: 500,
            width: 450,
            position: "absolute",
            bottom: 30,
            right: 20,
            zIndex: 1000,
          }}
        >
          <nav>
            <div id="chatwindow-nav" className="nav-wrapper">
              <span>Smart bot</span>
              <span className="close" onClick={this.hide}>
                x
              </span>
            </div>
          </nav>
          <div
            id="chatbot"
            style={{
              height: "375px",
              width: "100%",
              overflow: "auto",
              backgroundColor: "white",
            }}
          >
            {this.renderMessages(this.state.messages)}
            <div
              ref={(el) => {
                this.messagesEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            />
          </div>
          <input
            type="text"
            ref={(input) => {
              this.chatInput = input;
            }}
            style={{
              paddingLeft: "1%",
              paddingRight: "1%",
              width: "98%",
              backgroundColor: "white",
              color: "#222222",
              borderTop: "1px solid lightgrey",
              marginBottom: 0,
            }}
            placeholder="Start Talking to the bot!"
            onKeyPress={this.handleKeyPress}
          />
        </div>
      );
    } else {
      return (
        <div
          style={{
            minHeight: "40px",
            maxHeight: "500px",
            width: "440px",
            position: "absolute",
            bottom: 30,
            right: 20,
            border: "1px solid lightgray",
          }}
        >
          <nav style={{ borderRadius: 20 }}>
            <div className="nav-wrapper" style={{ background: "#ee6e73" }}>
              <a href="/" className="brand-logo" style={{ marginLeft: 10 }}>
                Talk to me
              </a>
              <ul
                id="nav-mobile"
                className="right "
                style={{ borderRadius: 20 }}
              >
                <li>
                  <a href="/" onClick={this.show}>
                    Open
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
            style={{ float: "left", clear: "both" }}
          ></div>
        </div>
      );
    }
  }
}

export default withRouter(Chatbot);
