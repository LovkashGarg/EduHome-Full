import React, { useEffect, useState } from "react";
import Scrolltobottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

const Room = () => {
  const {roomId}  =useParams();
  let myMeeting = async (element) => {
    // generate Kit Token
    const hgsl52 = +process.env.REACT_APP_hgsl52;
    const server_ghs30 = process.env.REACT_APP_server_ghs30;


    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      hgsl52,
      server_ghs30,
      roomId,
      randomID(5),
      randomID(5)
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url: `https://localhost:3000/Room/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };

  // const socket=io.connect("http://localhost:6000");
  // const myMeeting=async(element)=>{

  //   const kitToken=
  // }
  // we need to pass socket as a parameter since we are sending data from front to here
  const Chat = ({ socket, username, room }) => {
    const [currentmessage, setCurrentmessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const sendMessage = async () => {};
    //         useEffect(()=>{
    // io.on("connect",()=>{
    //     console.log("connected ");
    // })
    //         },[socket])
    // we made it async since it might take time to load date and compute data
    //     const sendMessage=async()=>{
    //         if(currentmessage !== ""){
    //             const messageData={
    //                 room:room,
    //                 author:username,
    //                 message:currentmessage,
    //                 time:new Date(Date.now()).getHours()+ ":" +new Date(Date.now()).getMinutes(),
    //             };
    //             await socket.emit("send_message",messageData);// the name of the event is same as that of the  index.js in the server socket.on
    //             setMessageList((list)=>[...list,messageData]);// this lines updates sender message list
    //             setCurrentmessage("");
    //         }
    //     }
    //     useEffect(() => {
    //         const handleMessage = (data) => {
    //             setMessageList((list) => [...list, data]);
    //             console.log(data);
    //         };

    //         socket.on("receive_message", handleMessage);

    //         return () => {
    //             // Cleanup: Unsubscribe from the event listener when component unmounts
    //             socket.off("receive_message", handleMessage);
    //         };
    //     }, [socket]);

    //     useEffect(()=>{
    //         // similar to when we send data from front to back now we send data from back to front
    //         socket.on("receive_message",(data)=>{
    //         setMessageList((list)=>[...list,data]);

    // console.log(data);
    // // next line updates our  message list  with the current message data
    //         })
    //     },[socket])
    return (
      <div>
        <div className="chat-header">
          <p>Live Chat with Room ID {room}</p>
        </div>

        <div className="chat-body w-[30vw] h-[500px] border-[2px] border-black ">
          <Scrolltobottom className="message-container w-[100%] px-[0]">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message-body  w-[100px] mx-[5px] px-[20px]"
                  id={username === messageContent.author ? "you" : "other"}
                >
                  <div className="flex flex-col align-center ">
                    <h2 className=" message-content border-[2px] text-wrap h-[auto] w-[20vw]  px-[10px] rounded-[20px]">
                      <p className="w-[80px]">{messageContent.message}</p>
                    </h2>
                    <div className="message-time-author flex justify-between">
                      <h2 className="w-[13vw] text-black">
                        From {messageContent.author}
                      </h2>
                      <h4 className="text-red-400 ">{messageContent.time}AM</h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </Scrolltobottom>
        </div>
        <div className="chat-footer ">
          <input
            value={currentmessage}
            type="text"
            className="border-[2px]  w-[300px] border-black ml-[auto]  my-[30px] p-[10px]"
            placeholder="Hey ..."
            onChange={(event) => {
              setCurrentmessage(event.target.value);
            }}
            onKeyPress={(event2) => {
              event2.key === "Enter" && sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            className="border-[2px] border-black ml-[30px] h-[50px] px-[10px]"
          >
            SEND &#9658;
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="Room grid grid-cols-12">
        <div className="Menu-bar col-span-2 text-[25px] bg-black flex flex-col justify-start items-center h-[90vh] p-[30px]  m-[20px] text-white gap-[20px] ">
          <div>
            <ul className="flex flex-col  gap-[20px]">
              <li className=" bg-gray-800 px-[10px] rounded-[20px]">Home</li>
              <li className=" bg-gray-800 px-[10px] rounded-[20px]">Profile</li>
              <li className=" bg-gray-800 px-[10px] rounded-[20px]">
                My courses
              </li>
              <li className=" bg-gray-800 px-[10px] rounded-[20px]">
                Settings
              </li>
            </ul>
          </div>
        </div>
        <div className="live-video col-span-10 bg-white  border-[3px] border-green-400 m-[20px] flex justify-center items-center  h-[90vh]">
          <div
            className="myCallContainer"
            ref={myMeeting}
            style={{ width: "80%", height: "80%" }}
          ></div>
        </div>
        {/* <div className="Chat_section col-span-4 bg-orange  border-[3px] border-green-400 m-[20px] flex justify-center items-center  h-[90vh]">
          <Chat />
        </div> */}
      </div>
    </>
  );
};

export default Room;
