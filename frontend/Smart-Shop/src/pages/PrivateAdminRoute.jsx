import {Navigate,useLocation} from "react-router-dom"

const PrivateAdminRoute = ({children}) =>{
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user && user.role !== 'admin'){
        return <Navigate  to="/" replace state={{from : location}}/>;
    }
    return children;
}

export default PrivateAdminRoute ;
