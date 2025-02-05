import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/register.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ProgressSpinner } from "primereact/progressspinner";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import axios from "axios";

const typeDocumentOptions = (t: (key: string) => string) => [
    { name: t("page.register.type.natural"), code: "PRN" },
    { name: t("page.register.type.juridica"), code: "PRJ" },
];

const RegisterForm = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const toast = useRef<Toast>(null);

    const [formData, setFormData] = useState({
        typeDocument: "",
        document: "",
        nameCustomer: "",
        phone: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);

    const isSpanish: boolean = i18n.language === "es";

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const toggleLanguage = () => {
        i18n.changeLanguage(isSpanish ? "en" : "es");
    };

    const showToast = (
        severity: "success" | "error",
        summary: string,
        detail?: string,
        life: number = 5000
    ) => {
        toast.current?.show({ severity, summary, detail, life });
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target || e;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { typeDocument, document, email, password } = formData;
        if (!typeDocument || !document || !email || !password) {
            showToast(
                "error",
                t("page.register.error"),
                t("page.register.error.missingFields")
            );
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            await axios.post("http://localhost:5000/api/auth/register", formData);
            showToast(
                "success",
                t("page.success.title"),
                t("page.success.detail")
            );
            setTimeout(() => {
                setLoading(false);
                navigate("/");
            }, 2000);
        } catch (error: any) {
            showToast(
                "error",
                t("page.error.title"),
                error.response?.data?.message
            );
            console.error("Error:", error);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <div className="container-form">
            {loading && (
                <div className="screen-loading">
                    <ProgressSpinner />
                </div>
            )}

            <div className="header-form">
                <div className="title-form">
                    <h2>{t("page.register.title")}</h2>
                </div>

                <div className="select-lang">
                    <img
                        src={`/src/assets/img/lang/${isSpanish ? "es" : "en"}.png`}
                        alt={isSpanish ? "Cambiar a Inglés" : "Switch to Spanish"}
                        width={32}
                        height={32}
                        onClick={toggleLanguage}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="p-field">
                    <label htmlFor="typeDocument">{t("page.register.document.type")}</label>
                    <Dropdown
                        value={typeDocumentOptions(t).find(
                            (type) => type.code === formData.typeDocument
                        )}
                        onChange={(e) => handleInputChange({ name: "typeDocument", value: e.value.code })}
                        options={typeDocumentOptions(t)}
                        optionLabel="name"
                        placeholder={t("page.register.type.select")}
                        className="w-full"
                        name="typeDocument"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="document">{t("page.register.document.title")}</label>
                    <InputText
                        id="document"
                        name="document"
                        value={formData.document}
                        onChange={handleInputChange}
                        placeholder={t("page.register.document.title")}
                    />
                </div>


                <div className="p-field">
                    <label htmlFor="nameCustomer">{t("page.register.name")}</label>
                    <InputText
                        id="nameCustomer"
                        name="nameCustomer"
                        value={formData.nameCustomer}
                        onChange={handleInputChange}
                        placeholder={t("page.register.name")}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="phone">{t("page.register.phone")}</label>
                    <InputText
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t("page.register.phone")}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="email">{t("page.register.email")}</label>
                    <InputText
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("page.register.email")}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="password">{t("page.register.password")}</label>
                    <Password
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder={t("page.login.password")}
                        feedback={false}
                    />
                </div>

                <Button
                    type="submit"
                    label={loading ? t("page.login.loading") : t("page.login.log")}
                    icon="pi pi-check"
                    disabled={loading}
                    severity="secondary"
                />

                <div className="login">
          <span>
            {t("page.register.have.account")}{" "}
              <a href="/">{t("page.register.login")}</a>
          </span>
                </div>

                <div className="copyright">
                    <div className="text">{t("page.login.copyright")}</div>
                    <div className="img">
                        <img
                            src="../../../src/assets/img/logo_pci_dss.png"
                            alt="Certificado PCI DSS"
                        />
                    </div>
                </div>
            </form>
            <Toast ref={toast} />
        </div>
    );
};

export default RegisterForm;