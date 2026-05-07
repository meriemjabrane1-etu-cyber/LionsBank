import Chatbot from "./settings/parties/chatbot";

export default function AiAgent() {
    return (
        <div className="h-full flex flex-col bg-[#0B0F1A] text-white">

            {/* Header */}
            

            {/* Chat area */}
            <div className="flex-1 overflow-hidden">
                <Chatbot /> 
            </div>

        </div>
    );
}