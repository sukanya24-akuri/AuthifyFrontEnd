import { useNavigate } from 'react-router-dom';
import logohome from '../assets/logohome.jpg';

export const Menubar=()=>{
    const navigate = useNavigate();
    return(
     <nav className="navbar bg-secondary px-5 py-4 d-flex justify-content-between align-items-center">
<div className="d-flex align-items-center gap-2">
    <img src={logohome} alt="logohome" width={36} height={36} onClick={()=> navigate("/")} />
    <span className="fw-bold fs-4 text-dark">Authify</span>

</div>
<div className="btn btn-outline-dark rounded-pill px-3" onClick={()=>navigate("/login")}> 
Login <i className="bi bi-arrow-right ms-3"></i>
</div>
     </nav>
    )
}