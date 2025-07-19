"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    n8nChat?: {
      createChat: (options: any) => void;
    };
    createChat?: (options: any) => void;
  }
}

export default function IqbalAgencyApp() {
  const [chatLoaded, setChatLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js";
    script.type = "module";
    script.onload = () => {
      if (window.n8nChat?.createChat) {
        window.n8nChat.createChat({
          webhookUrl:
            "https://ramorespect1011.app.n8n.cloud/webhook/39fb2aae-db8d-433d-b4ad-49a3011324a7/chat",
          target: "#n8n-chat",
          mode: "window",
          loadPreviousSession: true,
          chatInputKey: "chatInput",
          chatSessionKey: "sessionId",
          defaultHeight: 600,
          defaultWidth: 400,
          showWelcomeScreen: true,
          initialMessages: [],
          i18n: {
            en: {
              title: "Iqbal Agency Assistant",
              subtitle: "How can we help you today?",
              footer: "",
              getStarted: "Get Started",
              inputPlaceholder: "Type your message...",
            },
          },
        });
        setChatLoaded(true);
      } else {
        setTimeout(() => {
          if (window.createChat) {
            window.createChat({
              webhookUrl:
                "https://ramorespect1011.app.n8n.cloud/webhook/39fb2aae-db8d-433d-b4ad-49a3011324a7/chat",
              target: "#n8n-chat",
              mode: "window",
            });
            setChatLoaded(true);
          }
        }, 1000);
      }
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const talkToBot = () => {
    console.log("Bot button clicked");
    const statusEl = document.getElementById("status");

    if (!chatLoaded) {
      if (statusEl) {
        statusEl.innerText = "Loading chat widget...";
      }
      return;
    }

    const chatContainer = document.getElementById("n8n-chat");
    if (chatContainer) {
      chatContainer.style.display =
        chatContainer.style.display === "none" ? "block" : "none";
      if (statusEl) {
        statusEl.innerText =
          chatContainer.style.display === "none"
            ? ""
            : "Chat opened! You can start typing...";
      }
    } else {
      const newChatContainer = document.createElement("div");
      newChatContainer.id = "n8n-chat";
      newChatContainer.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 400px;
        height: 600px;
        z-index: 1000;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        background: white;
      `;
      document.body.appendChild(newChatContainer);

      if (statusEl) {
        statusEl.innerText = "Chat widget initialized!";
      }
    }

    fetch(
      "https://ramorespect.app.n8n.cloud/webhook/940bc5b7-474f-4cf4-9dca-17a30187c03d/webhook",
      {
        method: "GET",
      }
    ).catch((err) => console.error("Webhook error:", err));
  };

  return (
    <div className="text-center text-[#f5f5dc] bg-[#1a140f] min-h-screen flex items-center">
      <header className="bg-[#201710] p-10 pb-6">
        <div className="w-[150px] h-[100px] mx-auto mb-6 bg-[#ffd700] rounded-lg flex items-center justify-center text-[#1a140f] font-bold text-xl">
          IQBAL
        </div>
        <h1 className="text-4xl text-[#ffd700] font-bold">IQBAL AGENCY</h1>
        <p className="text-lg text-[#d4af37] mt-1">
          We bring success wherever we go
        </p>
      </header>

      <main className="max-w-2xl  px-4 py-10">
        <section className="mb-10">
          <h2 className="text-2xl text-[#ffa500] font-semibold mb-2">
            Who We Are
          </h2>
          <p className="text-base leading-relaxed">
            Iqbal Agency is a forward-thinking consulting and digital services
            company that empowers businesses to achieve excellence through
            innovation, strategy, and AI-powered automation.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl text-[#ffa500] font-semibold mb-2">
            What We Do
          </h2>
          <p className="text-base leading-relaxed">
            We specialize in building AI agents, smart workflows, and automation
            strategies that enhance productivity, drive engagement, and create
            long-term value for our clients. Whether it's lead generation,
            customer support, or process optimization — we've got you covered.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl text-[#ffa500] font-semibold mb-2">
            Meet Our AI Bot
          </h2>
          <p className="text-base leading-relaxed mb-4">
            Need help or want to learn more? Click the button below to chat with
            our smart assistant. It can answer FAQs, collect your details, and
            even help you book a meeting.
          </p>
          <Button
            onClick={talkToBot}
            className="bg-[#ffd700] text-[#1a140f] text-lg px-6 py-3 rounded-xl shadow-md hover:bg-[#e6c200] transition-transform"
          >
            💬 Chat with Our Bot
          </Button>
          <p id="status" className="mt-4 text-[#ffd700] text-sm">
            {chatLoaded ? "Chat ready!" : "Loading chat..."}
          </p>
        </section>
      </main>

      <footer className="text-[#aaa] text-sm border-t border-[#333] py-6 bg-[#1a140f]">
        © 2025 Iqbal Agency. All rights reserved.
      </footer>

      <button
        onClick={talkToBot}
        title="Chat with our bot"
        className="fixed bottom-6 right-6 w-[60px] h-[60px] flex items-center justify-center bg-[#ffd700] text-[#1a140f] rounded-full shadow-lg text-2xl hover:bg-[#e6c200] transition-transform z-50"
      >
        💬
      </button>

      <div id="n8n-chat" style={{ display: "none" }}></div>
    </div>
  );
}
