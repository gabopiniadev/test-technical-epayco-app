import { useState} from "react";
import axios from "axios";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useTranslation} from "react-i18next";
import {ProgressSpinner} from "primereact/progressspinner";

const PaymentConfirmation = ({ payment, toast, onClose }) => {
    const [sessionId, setSessionId] = useState("");
    const [confirmationCode, setToken] = useState("");
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);

    const handleConfirmation = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('accessToken');

            const response = await axios.post("http://localhost:5000/api/wallet/payment/confirm",
                {
                sessionId,
                confirmationCode,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.current?.show({
                severity: "success",
                summary: t("page.success.details"),
                detail: response.data.message,
                life: 5000,
            });
            setLoading(false);
            onClose(true);
        } catch (error: any) {
            toast.current?.show({
                severity: "error",
                summary: t("page.register.error"),
                detail: error.response?.data?.message,
                life: 5000,
            });
        } finally {
            setSessionId("");
            setToken("");
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && (
                <div className="screen-loading">
                    <ProgressSpinner />
                </div>
            )}
            <div className="wallet">
                <h2>{t("page.dashboard.wallet.confirmation.title")}</h2>
                <div className="p-field">
                    <label>{t("page.dashboard.wallet.confirmation.session")}</label>
                    <InputText value={sessionId} onChange={(e) => setSessionId( e.target.value )}/>
                </div>
                <div className="p-field">
                    <label>{t("page.dashboard.wallet.confirmation.token")}</label>
                    <InputText value={confirmationCode} onChange={(e) => setToken(e.target.value)} />
                </div>
                <Button
                    label={t("page.dashboard.wallet.confirmation.pay")}
                    onClick={handleConfirmation}
                    className="p-mt-3"
                />
            </div>
        </div>
    );
};

export default PaymentConfirmation;