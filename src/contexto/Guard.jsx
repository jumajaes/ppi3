import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./variables";

const Guard = ({ children }) => {
    const navigate = useNavigate();
    const { usuario } = useData()
    console.log(usuario,'666666666666666666666666666666')
    useEffect(() => {
        if (!usuario) {
            navigate("/sesion");
        }
    }, [usuario, navigate]);

    return <>{usuario ? children : null}</>;
};

export default Guard;
