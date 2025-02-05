import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";
import { ProgressSpinner } from "primereact/progressspinner";

const WalletBalance = () => {
    const [document, setDocument] = useState("");
    const [name, setName] = useState("");
    const [balance, setBalance] = useState<number | null>(null);
    const [currency, setCurrency] = useState("");
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useRef<Toast>(null);

    const handleCheckBalance = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem('accessToken');

            const response = await axios.get('http://localhost:5000/api/wallet/balance', {
                headers: { Authorization: `Bearer ${token}` },
            });

            setDocument(response.data.data.document);
            setName(response.data.data.customerName);
            setBalance(response.data.data.balance);
            setCurrency(response.data.data.currency);

            toast.current?.show({
                severity: 'success',
                summary: 'Consulta Exitosa',
                detail: `Tu saldo es de ${response.data.data.balance} ${response.data.data.currency}`,
                life: 5000,
            });
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.message || 'No se pudo consultar el saldo.',
                life: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleCheckBalance();
    }, []);

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
                    <label>{t("page.dashboard.wallet.confirmation.name")}</label>
                    <InputText value={name} readOnly />
                </div>
                <div className="p-field">
                    <label>{t("page.dashboard.wallet.document")}</label>
                    <InputText value={document} readOnly />
                </div>
                {balance !== null &&
                    <div className="p-field">
                        <label>{t("page.dashboard.wallet.balance")}</label>
                        <InputText value={balance + " " + currency} readOnly />
                    </div>
                }
            </div>
            <Toast ref={toast} />
        </div>
    );
};

export default WalletBalance;