import {IMessageListProps} from "../types/IChat.ts";
import {useEffect, useRef} from "react";
import {List, Typography} from "antd";

const MessageList:React.FC<IMessageListProps> = ({messages}) => {
    const listRef = useRef<HTMLDivElement>(null);

    // 自动滚到底部
    useEffect(() => {
        if(listRef.current){
            console.log("run this", listRef.current.scrollHeight)
            requestAnimationFrame(() => {
                listRef.current!.scrollTo({
                    top: listRef.current!.scrollHeight,
                    behavior: 'smooth',
                });
            });
            // listRef.current.scrollTo({
            //     top: listRef.current.scrollHeight,
            //     behavior: 'smooth' // 平滑滚动
            // })
        }
    }, [messages]);

    return (
        <div ref={listRef} style={{ maxHeight: 'calc(50vh - 200px)', overflowY: 'auto' }}>
            <List
                dataSource={messages}
                renderItem={(message) => (
                    <List.Item style={{ textAlign: message.from === 'user' ? 'right' : 'left', display: 'block' }}>
                        <Typography.Text
                            style={{
                                textAlign: 'left',
                                display: 'inline-block',
                                padding: '10px',
                                borderRadius: '12px',
                                background: message.from === 'user' ? '#1890ff' : '#f0f0f0',
                                color: message.from === 'user' ? '#fff' : '#000',
                            }}
                        >
                            {message.from === 'bot' &&
                                <strong>机器人:&nbsp;&nbsp;&nbsp;</strong>
                            }
                            {message.text}
                            {message.typing && (
                                <span
                                    style={{
                                        color: '#dadada',
                                        marginLeft: '6px',
                                        display: 'inline-block',
                                        animation: 'blink 1s step-start infinite',
                                    }}
                                >
                  |
                </span>
                            )}
                        </Typography.Text>
                    </List.Item>
                )}
            >
            </List>
        </div>
    )
}

export default MessageList;