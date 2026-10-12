import { useMessageStore } from '../store/useMessageStore'
import { useUserStore } from '../store/useUserStore'
import MessageCard from './MessageCard'
import { useEffect, useState } from 'react'

const Feed = ({ title = 'Сообщения', showOwn= false }) => {
    const {messages, getMessages }= useMessageStore()
    const {session}= useUserStore()
    const [isLoading, setIsLoading] =useState(false)
    const [error, setError] = useState(null)
    const [timerId, setTimerId] = useState(undefined)

    useEffect(() =>{
    const load = async () =>{
    setIsLoading(true)
    try {
    await getMessages()
        getMessages()
    } catch (error) {
        console.error(error)
        setError(error.message || "чтото пошло не так")}
     finally{
    setIsLoading(false)
    } }
     load()
     setTimerId(setInterval(()=>{
        try {
            getMessages()
        } catch (error) {}
     },10000))
       return ()=> {
        clearInterval(timerId)
       } 
    },[])

    return (
        <>
            <div className="messages-section">
                <div className="container">
                    <h2 className="section-title">{title}</h2>
                    {isLoading && <p>загрузка..</p>}
                    {!isLoading && error && <p>{error}</p>}
                    {!isLoading && !error && messages && (
                    <div className="messages-grid">
                        {showOwn ? messages.filter(el =>el.userId === session?.user.id ).map((message, i) => (
                            <MessageCard key={i} {...message} />))
                        : messages.map((message, i) => (
                            <MessageCard key={i} {...message} />
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Feed
