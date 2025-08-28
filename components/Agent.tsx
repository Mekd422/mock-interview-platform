"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const messages = [
  "hi, what is your name?",
  "My name is john doe",
  "what is your profession?",
  "I am a software developer",
  "What technologies do you use?",
  "I use React, Node.js, and Python",
];

type AgentProps = {
  userName: string;
  type?: string; 
};

const Agent = ({ userName, type }: AgentProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [username, setUserName] = useState("Guest");
  const [lastMessage, setLastMessage] = useState(messages[messages.length - 1]);
  const [callStatus, setCallStatus] = useState<
    "INACTIVE" | "CONNECTING" | "ACTIVE" | "FINISHED"
  >("INACTIVE");

  const handleCall = () => {
    setCallStatus("ACTIVE");
  };

  const handleDisconnect = () => {
    setCallStatus("FINISHED");
  };

    return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;