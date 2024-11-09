
export type IMessage = {
    id: string;
    text: string;
    from: 'user' | 'bot';
    typing?: boolean;
}

export interface IMessageInputProps {
    onSend: (message: string) => void;
    isWriting: boolean;
}

export interface IMessageListProps {
    messages: IMessage[];
}
