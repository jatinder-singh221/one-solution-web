import { useContext, useEffect } from "react"
import { store } from "../App"

export default function Messages(props) {
  const storeState = useContext(store) ?? false
  const { message, setmessage } = storeState

  useEffect(() => {
    setTimeout(() => {
      setmessage({
        hidden: true,
        message:''
      })
    }, 5000);
  }, [setmessage])
  

  return (
    <div className='fixed w-auto py-2 px-4 rounded text-white bg-violet-600 z-50 capitalize bottom-1 left-1 '>
      {message.message}
    </div>
  )
}