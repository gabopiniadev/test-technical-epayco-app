import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "../../../../assets/css/dashboard.css";
import WalletRecharge from "../../../../pages/wallet-recharge/Wallet.tsx";
import Payment from "../../../../pages/payment/Payment.tsx";
import PaymentConfirmation from "../../../../pages/payment-confirmation/PaymentConfirmation.tsx";
import WalletBalance from "../../../../pages/wallet-balance/WalletBalance.tsx";
import Home from "../../../../pages/home/Home.tsx";
import {useTranslation} from "react-i18next";
import {useState} from "react";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [currentSection, setCurrentSection] = useState("profile");
    const { t, i18n } = useTranslation();

    const isSpanish: boolean = i18n.language === "es";

    const sidebarItems = [
        { key: "home", label: t("page.dashboard.menu.home"), icon: "pi pi-home", component: <Home /> },
        { key: "recharge", label: t("page.dashboard.menu.recharge") , icon: "pi pi-wallet", component: <WalletRecharge /> },
        { key: "payment",  label: t("page.dashboard.menu.payment"), icon: "pi pi-dollar", component: <Payment /> },
        { key: "confirm",  label: t("page.dashboard.menu.payment-confirmation"), icon: "pi pi-check", component: <PaymentConfirmation /> },
        { key: "balance",  label: t("page.dashboard.menu.balance"), icon: "pi pi-cash", component: <WalletBalance /> },
    ];

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/");
    };

    const renderMenuItems = () => {
        return sidebarItems.map(item => (
            <Button
                key={item.key}
                label={isSidebarExpanded ? item.label : ""}
                icon={item.icon}
                className="p-button-text p-mb-3"
                onClick={() => setCurrentSection(item.key)}
            />
        ));
    };

    const renderContent = () => {
        const activeItem = sidebarItems.find(item => item.key === currentSection);
        return activeItem?.component || <Home />;
    };

    const toggleLanguage = () => {
        i18n.changeLanguage(isSpanish ? "en" : "es");
    };


    return (
        <div className="dashboard">
            <Menubar
                className="p-shadow-4"
                start={<h3 className="dashboard-title">{t("page.dashboard.menu.home")}</h3>}
                end={
                    <div>
                        <img
                            src={`/src/assets/img/lang/${isSpanish ? "es" : "en"}.png`}
                            alt={isSpanish ? "Cambiar a Inglés" : "Switch to Spanish"}
                            width={32}
                            height={32}
                            onClick={toggleLanguage}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                }
            />

            <div className="dashboard-main">
                <div className={`sidebar ${isSidebarExpanded ? "expanded" : "collapsed"}`}>
                    <Button
                        icon="pi pi-bars"
                        className="hamburger p-button-text"
                        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                    />

                    <div className="menu-items">{renderMenuItems()}</div>

                    <div className="logout">
                        <Button
                            label={isSidebarExpanded ? t("page.dashboard.menu.session") : ""}
                            icon="pi pi-power-off"
                            className="p-button-danger p-button-text"
                            onClick={handleLogout}
                        />
                    </div>
                </div>

                <div className="content">{renderContent()}</div>
            </div>
        </div>
    );
};

export default DashboardPage;