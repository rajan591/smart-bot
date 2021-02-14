import React from "react";
// import Pikachu from "../../assets/images/tu.png";

const Landing = () => {
  return (
    <div class="row" style={{ margin: 20 }}>
      <div class="col s10 m6">
        <div class="card">
          <div class="card-image">
            <img
              src="https://miro.medium.com/max/875/1*Sdckr5tAt5peOaZJgsAQ1Q.png"
              style={{}}
            />
          </div>
          <div style={{ textAlign: "center", color: "red" }}>
            <span class="card-title">SMART HEALTH BOT</span>
          </div>

          <div class="card-content">
            <p>
              Hello, I am a smart chat bot . I will help you to recommend
              hospitals for you. I can save your information for your further
              inquery if you are not feeling well. Try asking me.
            </p>
          </div>
        </div>
      </div>
    </div>
    //     <div className="card">
    //       <div className="card-image" style={{ heigth: "150px" }}>
    //         <img src="chatbot.png" alt="bot" />
    //         <span className="card-title">Hello!</span>
    //       </div>
    //       <div className="card-content">
    //         <p>
    //           This is a simple chatbot built using DialogFlow. You can try asking
    //           him questions about me like my likes, dislikes and academics. You can
    //           also ask the bot for its name and have small talk with it. I'll add
    //           more training phrases whenever I find some time. Don't forget to say
    //           bye before leaving :D
    //         </p>
    //       </div>
    //     </div>
  );
};

export default Landing;
