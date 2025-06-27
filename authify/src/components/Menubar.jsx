import logohome from '../assets/logohome.jpg';

export const Menubar=()=>{
    return(
     <nav className="navbar bg-secondary px-5 py-4 d-flex justify-content-between align-items-center">
<div className="d-flex align-items-center gap-2">
    <img src={logohome} alt="logohome" width={36} height={36} />
    <span className="fw-bold fs-4 text-dark">Authify</span>
</div>
     </nav>
    )
}