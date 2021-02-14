// import React from "react";

// const Message = (props) => {
//   return (
//     <div className="col s12 m8 offset-m2 offset-l3 ">
//       <div
//         className="card-panel teal"
//         style={{
//           height: 75,

//           color: "black",
//           borderRadius: 20,
//         }}
//       >
//         <div className="row valign-wrapper">
//           {props.speaks === "bot" && (
//             <div className="col s1">
//               {/* <a
//                 className="btn-floating btn-large waves-effect waves-dark"
//                 style={{ background: "red" }}
//                 href="/"
//               >
//                 {props.speaks}
//               </a> */}
//               <i class="small material-icons">child_care</i>
//             </div>
//           )}
//           <div className="col s10">
//             <span className="white-text">{props.text}</span>
//           </div>
//           {props.speaks === "me" && (
//             <div className="col s2">
//               {/* <a
//                 className="btn-floating btn-large waves-effect waves-light"
//                 style={{ background: "lightenblue" }}
//                 href="/"
//               >
//                 {props.speaks}
//               </a> */}
//               <i class="small material-icons">person</i>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Message;
import React from "react";

const Message = (props) => {
  return (
    <div className={props.speaks === "me" ? "right-align" : ""}>
      <div className={`chatbubble ${props.speaks === "bot" ? "bot" : "me"}`}>
        <span>{props.text}</span>
      </div>
    </div>
  );
};

export default Message;
