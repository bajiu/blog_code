import {Button, Input, Space} from "antd";
import {useState} from "react";
import {IMessageInputProps} from "../types/IChat.ts";

const MessageInput:React.FC<IMessageInputProps> = ({onSend, isWriting}) => {
    const [text, setText] = useState<string>('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text.trim());
            setText('');
        }
    }

    return (
        <Space.Compact  style={{ width: 'calc(100% - 80px)'}}>
            <Input
                disabled={isWriting}
                placeholder="请输入内容..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onPressEnter={handleSend}
            ></Input>
            <Button disabled={isWriting} type="primary" onClick={handleSend} style={{fontSize: 20}}>
                <b>&rarr;</b>
            </Button>
        </Space.Compact>
    )
}

export default MessageInput;