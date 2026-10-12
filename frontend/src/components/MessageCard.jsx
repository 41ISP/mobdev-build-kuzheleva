import { api } from "../api/api"
import { useUserStore } from "../store/useUserStore"

const MessageCard = ({ id, userId, likes, likedBy,content, username, createdAt }) => {
    const {session} = useUserStore()
    const handleDelete= async() => {
       await api.deleteMessage(id)
    }
    const handleReport= async() => {
    await api.reportMessage(id)
    }
    const handleLike= async() => {
        await api.likeMessage(id)    
    }

    return (
        <div className="message-card">
            <div className="message-content">{content}</div>
            <div className="message-meta">
                <span className="message-author">@{username}</span>
                <span className="message-time">{createdAt}</span>
            </div>
            <div className="message-actions">
             { session?.user && (
                <><button onClick={handleLike} className="action-button">
                    <span>{likes} {likedBy.includes(session.user.id) ?"💗":"🤍"}</span>
                    <span>Нравится</span>
                </button> </>)}
                {session?.user &&
                <button onClick={handleReport} className="action-button">
                    <span>🚩</span>
                    <span>Пожаловаться</span>
                </button>
                }
                {
                userId === session?.user.id && <button onClick={handleDelete} className="action-button delete">
                    <span>❌</span>
                    <span>Удалить</span>
                </button>
                }
            </div>
        </div>
    )
}

export default MessageCard
