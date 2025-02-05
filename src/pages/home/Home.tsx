import "../../assets/css/home.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";

const Home = () => {
    const [name, setName ] = useState("");
    const [last, setLast] = useState("");
    const [status, setStatus] = useState("");
    const { t } = useTranslation();

    const handleGetInfoProfile = async () => {
        try {
            const token = localStorage.getItem('accessToken');

            const response = await axios.get('http://localhost:5000/api/auth/info', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if(response) {
                setName(response.data.data.name);
                setLast(response.data.data.last);
                setStatus(response.data.data.wallet);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                handleGetInfoProfile();
            }
        };
        fetchUser();
    }, []);

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };


    return (
        <div className="home-container">
            <div className="welcome">
                <div className="user-info">
                    <span>{t("page.dashboard.profile.welcome")} { name }</span>
                    <span>{t("page.dashboard.profile.lastConnect")} {formatDate(last)}</span>
                    <span>{t("page.dashboard.profile.status")} <span style={{ color: status === "active" ? "green" : "red" }}> {status} </span></span>
                </div>
            </div>
        </div>
    );
}

export default Home;