import React from "react";

export default function Reccom() {
  return (
    <div>
      <div class="row" style={{ margin: 20 }}>
        <div class="col s12 m12 l4">
          <div class="card">
            <div class="card-image">
              <img
                alt="chatbot"
                src="https://miro.medium.com/max/875/1*rTZvrFD258ZZwvGy7nyqDw.jpeg"
                style={{}}
              />
            </div>
            <div style={{ textAlign: "center", color: "red" }}>
              <span class="card-title">Smart Hospital Recommendation</span>
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
    </div>
  );
}
