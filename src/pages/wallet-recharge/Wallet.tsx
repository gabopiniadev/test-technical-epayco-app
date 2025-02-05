import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { Toast } from "primereact/toast";
import {useTranslation} from "react-i18next";
import {ProgressSpinner} from "primereact/progressspinner";

const WalletRecharge = () => {
    const [document, setDocument] = useState('');
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const toast = useRef<Toast>(null);
    const { t  } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);

    const handleRecharge = async () => {
        if (!document || !phone || !amount) {
            setResponseMessage('Por favor complete todos los campos');
            return;
        }

        if (isNaN(Number(amount)) || parseFloat(amount) <= 0) {
            setResponseMessage('El monto debe ser un número mayor a 0');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/wallet/recharge', {
                document,
                phone,
                amount: parseFloat(amount),
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
            setDocument("");
            setAmount("");
            setPhone("");
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }
    };

    const handleInfoUser = async () => {
        try {
            const token = localStorage.getItem('accessToken');

            const response = await axios.get('http://localhost:5000/api/auth/info', {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log(response.data.data)

            setPhone(response.data.data.phone);
            setDocument(response.data.data.document);
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleInfoUser();
    }, []);

    return (
        <div className="home-container">
            {loading && (
                <div className="screen-loading">
                    <ProgressSpinner />
                </div>
            )}
            <div className="wallet">
                <h2>{t("page.dashboard.wallet.recharge")}</h2>
                <div className="p-field">
                    <label>{t("page.dashboard.wallet.document")}</label>
                    <InputText value={document} readOnly/>
                </div>
                <div className="p-field">
                    <label>{t("page.dashboard.wallet.phone")}</label>
                    <InputText value={phone} readOnly/>
                </div>
                <div className="p-field">
                    <label>{t("page.dashboard.wallet.mount")}</label>
                    <InputText value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <Button label={t("page.dashboard.wallet.pay")} onClick={handleRecharge} className="p-mt-3" />
                {responseMessage && <p>{responseMessage}</p>}
            </div>
            <Toast ref={toast} />
        </div>
    );
};

export default WalletRecharge;