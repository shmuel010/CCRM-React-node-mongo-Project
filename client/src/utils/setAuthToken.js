import axios from "axios";

const setAuthToken = token=>{
    if(token){
       axios.defaults.headers.common['x-auth-token']=token

        console.log("yes token setauthToken : ")
    }
    else {
        console.log("no token")

        delete axios.defaults.headers.common['x-auth-token']

    }
}
export default setAuthToken