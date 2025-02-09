import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";
import PaymentConfirmation from "../payment-confirmation/PaymentConfirmation";

const Payment = () => {
    const { t } = useTranslation();
    const toast = useRef<Toast>(null);

    const [formData, setFormData] = useState({
        document: "",
        phone: "",
        amount: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
    const [confirmationData, setConfirmationData] = useState(null);

    const API_URL = "http://localhost:5000/api/wallet/payment";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { document, phone, amount } = formData;

        if (!document || !phone || !amount) {
            toast.current?.show({
                severity: "warn",
                summary: t("page.wallet.payment.error"),
                detail: t("page.wallet.payment.requiredFields"),
                life: 5000,
            });
            return false;
        }
        if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            toast.current?.show({
                severity: "warn",
                summary: t("page.wallet.payment.error"),
                detail: t("page.wallet.payment.invalidAmount"),
                life: 5000,
            });
            return false;
        }
        return true;
    };

    const handlePayment = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);

            const token = localStorage.getItem("accessToken");
            if (!token) {
                throw new Error(t("page.wallet.payment.noToken"));
            }

            const response = await axios.post(
                API_URL,
                {
                    ...formData,
                    amount: parseFloat(formData.amount),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.current?.show({
                severity: "success",
                summary: t("page.wallet.confirmation.title"),
                detail: response.data.message,
                life: 5000,
            });

            setConfirmationData({
                paymentId: response.data.paymentId,
                amount: formData.amount,
                phone: formData.phone,
                document: formData.document,
            });
            setIsDialogVisible(true); 

            setFormData({ document: "", phone: "", amount: "" });
        } catch (error: any) {
            console.error("Payment Error:", error);

            const errorMessage =
                error.response?.data?.message ||
                t("page.wallet.payment.serverError");

            toast.current?.show({
                severity: "error",
                summary: t("page.wallet.payment.error"),
                detail: errorMessage,
                life: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseDialog = () => {
        setIsDialogVisible(false);
        setConfirmationData(null);
    };

    return (
        <div className="home-container">
            {loading && (
                <div className="screen-loading">
                    <ProgressSpinner />
                </div>
            )}
            <div className="wallet">
                <h2>{t("page.dashboard.wallet.payment.title")}</h2>

                <div className="p-field">
                    <label>{t("page.dashboard.wallet.payment.document")}</label>
                    <InputText
                        name="document"
                        value={formData.document}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="p-field">
                    <label>{t("page.dashboard.wallet.payment.phone")}</label>
                    <InputText
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="p-field">
                    <label>{t("page.dashboard.wallet.payment.mount")}</label>
                    <InputText
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <Button
                    label={t("page.dashboard.wallet.payment.pay")}
                    onClick={handlePayment}
                    className="p-mt-3"
                />
            </div>

            <Dialog
                header={t("page.dashboard.wallet.confirmation.title")}
                visible={isDialogVisible}
                style={{ width: "50vw" }}
                onHide={handleCloseDialog}
            >
                {confirmationData && (
                    <PaymentConfirmation
                        payment={confirmationData}
                        toast={toast}
                        onClose={handleCloseDialog}
                    />
                )}
            </Dialog>

            <Toast ref={toast} />
        </div>
    );
};

export default Payment;