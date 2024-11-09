import React from "react";
import {Layout} from "antd";
import {Content, Header, Footer} from "antd/es/layout/layout";
import {IMessage} from "../types/IChat.ts";
import MessageList from "../component/MessageList.tsx";
import MessageInput from "../component/MessageInput.tsx";

const Chat: React.FC = () => {

    const [messages, setMessages] = React.useState<IMessage[]>([]);
    const [writing, setWriting] = React.useState<boolean>(false);

    const handleSendMessage = (text: string) => {
        const id = Date.now().toString();
        const newMessage:IMessage = { id, text, from: 'user' };
        setMessages((prev) => [...prev, newMessage]);


        // 模拟响应数据
        setTimeout(() => {
            setWriting(true);
            const botMessage: IMessage = { id: Date.now().toString(), text: ``, from: 'bot', typing: true  };
            setMessages((prev) => [...prev, botMessage]);

            let index = 0;
            const response = `我只会鹦鹉学舌,${text}`;
            // 模拟逐字回复
            const interval = setInterval(() =>{
                if(index < response.length) {
                    setMessages((prev:IMessage[]) => {
                        return prev.map((msg:IMessage) =>
                            msg.id == botMessage.id ? {
                                ...msg,
                                text: msg.text + response[index++]
                            }: msg
                        )
                    })
                } else {
                    // 回复完成，移除 typing 状态
                    setMessages((prev) =>
                        prev.map((msg) =>
                            msg.id === botMessage.id ? { ...msg, typing: false } : msg
                        )
                    );
                    setWriting(false);
                    clearInterval(interval);
                }
            }, 50)
        },1000)
    }



    return (
        <Layout style={{ height: `50vh`, width: '50vw',borderRadius: 10, overflow: 'hidden'}}>
            <Header style={{ color: 'white', textAlign: 'center' }}>GPT对话模拟</Header>
            <Content style={{ padding: '16px', overflow: 'auto' }}>
                <MessageList messages={messages} />
            </Content>
            <Footer style={{padding: '16px'}}>
                <MessageInput onSend={handleSendMessage} isWriting={writing}></MessageInput>
            </Footer>
        </Layout>
    )
}


export default Chat;