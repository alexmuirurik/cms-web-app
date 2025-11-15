import { createContext, useContext, useState } from "react";

const MessageContext = createContext({
    messages: [],
    setMessages: () => {},
})

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState([])
    

    return (
        <MessageContext.Provider value={{messages: [], setMessages: () => {}}}>
            {children}
        </MessageContext.Provider>
    )
}


export const useMessageContext = () => useContext(MessageContext)