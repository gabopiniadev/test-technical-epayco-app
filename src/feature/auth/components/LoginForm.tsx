import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { authenticateUser } from "../services/AuthService";
import "../../../assets/css/login.css";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { t, i18n } = useTranslation();
    const toast = useRef<Toast>(null);

    const isSpanish: boolean = i18n.language === "es";

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const toggleLanguage = () => {
        const newLang = isSpanish ? "en" : "es";
        i18n.changeLanguage(newLang);
    };

    const showToast = (severity: "success" | "error", summary: string, detail: string = "", life: number = 5000) => {
        toast.current?.show({ severity, summary, detail, life });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authenticateUser({ email, password });
            localStorage.setItem("accessToken", response.token);
            showToast("success", t("page.login.success"));
            navigate("/dashboard");
        } catch (err: any) {
            showToast("error", t("page.error.title"), err.message);
        } finally {
            setLoading(false);
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
                    <h2>{t("page.login.title")}</h2>
                </div>

                <div className="select-lang">
                    <img
                        src={`/src/assets/img/lang/${isSpanish ? "es" : "en"}.png`}
                        alt={isSpanish ? "Cambiar a inglés" : "Switch to Spanish"}
                        width={32}
                        height={32}
                        onClick={toggleLanguage}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="p-field">
                    <label htmlFor="email">{t("page.login.email")}</label>
                    <InputText
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("page.login.email")}
                        required
                        autoFocus
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="password">{t("page.login.password")}</label>
                    <Password
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("page.login.password")}
                        required
                        feedback={false}
                    />
                </div>

                <div className="recovery">
          <span>
            {t("page.login.recovery")}{" "}
              <a href="/reset-password">{t("page.login.recover")}</a>
          </span>
                </div>

                <Button
                    type="submit"
                    label={loading ? t("page.login.loading") : t("page.login.log")}
                    icon="pi pi-check"
                    severity="secondary"
                    disabled={loading}
                />

                <div className="register">
          <span>
            {t("page.login.logout")}{" "}
              <a href="/register">{t("page.login.register")}</a>
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

export default LoginForm;