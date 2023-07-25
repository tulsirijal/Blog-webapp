import {ReactNode} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../slices/store'
import Error from '../pages/Error';
interface PropType {
    children:ReactNode
}
export default function PrivateRoute({children}:PropType) {
    const {token} = useSelector((state:RootState)=>state.auth);
    if(token) {
        return children
    } else {
        return <Error/>
    }
}
