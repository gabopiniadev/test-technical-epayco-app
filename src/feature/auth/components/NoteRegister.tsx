import "../../../assets/css/register.css";
import { useTranslation } from "react-i18next";

const NoteRegister  = () => {

    const { t } = useTranslation();

    return (
        <div className="notice-container">
            <div className="header-content">
                <img src="../../../src/assets/img/logo-white-ePayco-banners.png"  alt=""/>
            </div>
            <div className="content">
                <div className="icon-image">
                    <img src="../../../src/assets/img/banner-ePayco.png" alt="" />
                </div>
                <div className="description-image">
                    <div className="title">
                        <p
                            className="title-banner"
                            dangerouslySetInnerHTML={{ __html: t("page.login.slider.items.1.title") }}
                        />
                    </div>
                    <div className="description">
                        <p
                            className="title-banner"
                            dangerouslySetInnerHTML={{ __html: t("page.login.slider.items.1.description") }}
                        />
                    </div>
                </div>
            </div>
            <div className="footer-content">
                <p
                    className="title-banner"
                    dangerouslySetInnerHTML={{ __html: t("page.login.slider.items.1.footer") }}
                />
            </div>
        </div>
    );
}

export default NoteRegister;