import Vapi from "@vapi-ai/web";
import { useState, useEffect } from "react";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}

const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

  useEffect(() => {
    const vapiInstance = new Vapi("4bc6bf98-dde6-4632-8148-d0abc7fd35e3");

    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscript([]);
    });
    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("error", (error) => {
      setIsConnecting(false);
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            text: message.transcript,
          },
        ]);
      }
    });

    return () => {
      vapiInstance.stop();
    };
  }, []);

  const startCall = () => {
    setIsConnecting(true);
    if (vapi) {
      vapi.start("30b9dff6-abed-4793-bdf9-27b0d27dab87");
    }
  };
  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    endCall,
  };
};

export default useVapi;
