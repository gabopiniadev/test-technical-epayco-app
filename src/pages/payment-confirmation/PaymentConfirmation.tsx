import {useRef, useState} from "react";
import axios from "axios";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {useTranslation} from "react-i18next";
import {ProgressSpinner} from "primereact/progressspinner";

const PaymentConfirmation = () => {
    const [sessionId, setSessionId] = useState("");
    const [confirmationCode, setToken] = useState("");
    const toast = useRef<Toast>(null);
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);

    const handleConfirmation = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/wallet/payment/confirm", {
                sessionId,
                confirmationCode,
            });
            toast.current?.show({
                severity: "success",
                summary: t("page.register.success"),
                detail: response.data.message,
                life: 5000,
            });
        } catch (error: any) {
            console.error(error);
            toast.current?.show({
                severity: "error",
                summary: t("page.register.error"),
                detail: error.response?.data?.message,
                life: 5000,
            });
        }finally {
            setSessionId("");
            setToken("");
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }
    };

    return (
        <div className="home-container">
            {loading && (
                <div className="screen-loading">
                    <ProgressSpinner />
                </div>
            )}
            <div className="wallet">
                <h2>{t("page.dashboard.wallet.confirmation.title")}</h2>
                <div className="p-field">
                    <label>{t("page.dashboard.wallet.confirmation.session")}</label>
                    <InputText value={sessionId} onChange={(e) => setSessionId(e.target.value)}/>
                </div>
                <div className="p-field">
                    <label>{t("page.dashboard.wallet.confirmation.token")}</label>
                    <InputText value={confirmationCode} onChange={(e) => setToken(e.target.value)}/>
                </div>
                <Button label={t("page.dashboard.wallet.confirmation.pay")} onClick={handleConfirmation} className="p-mt-3"/>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

export default PaymentConfirmation;