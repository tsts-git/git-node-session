import {useSelector} from "react-redux"
import {jwtDecode} from "jwt-decode"

const useAuth=()=>{
    console.log(" i am ");
    const token=useSelector((state)=>state.auth.token)
    console.log(" i am 1");
    const obj=jwtDecode(token);
    console.log(" i am 2");
    const {roles,userName,email,fullname} =obj;
    return [obj]
}

export default useAuth;