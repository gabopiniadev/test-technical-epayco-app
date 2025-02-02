import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Slider : React.FC = () => {

    const { t } = useTranslation();

    const [currentIndex, setCurrentIndex] = useState(0);

    const items = [
        {
            id: 1,
            headerImg: "../../../../src/assets/img/logo-white-ePayco-banners.png",
            contentImg: "../../../../src/assets/img/banner-ePayco.png",
            title: "page.login.slider.items.1.title",
            titleImg: "",
            description: "page.login.slider.items.1.description",
            footer: "page.login.slider.items.1.footer",
        },
        {
            id: 2,
            headerImg: "../../../../src/assets/img/logo-black-ePayco-banners.png",
            contentImg: "../../../../src/assets/img/banner-security.png",
            title: "page.login.slider.items.2.title",
            titleImg: "",
            description: "page.login.slider.items.2.description",
            footer: "page.login.slider.items.2.footer",
        },
        {
            id: 3,
            headerImg: "../../../../src/assets/img/logo-white-ePayco-banners.png",
            contentImg: "../../../../src/assets/img/banner-link-cobro.png",
            title: "page.login.slider.items.3.title",
            titleImg: "",
            description: "page.login.slider.items.3.description",
            footer: "page.login.slider.items.3.footer",
        },
        {
            id: 4,
            headerImg: "../../../../src/assets/img/logo-black-ePayco-banners.png",
            contentImg: "../../../../src/assets/img/banner-payPal.png",
            title: ``,
            titleImg: "../../../../src/assets/img/logo-payPal-banners.png",
            description: "page.login.slider.items.4.description",
            footer: "page.login.slider.items.4.footer",
        },
        {
            id: 5,
            headerImg: "../../../../src/assets/img/logo-white-ePayco-banners.png",
            contentImg: "../../../../src/assets/img/banner-shopify.png",
            title: ``,
            titleImg: "../../../../src/assets/img/logo-shopify-banners.png",
            description: "page.login.slider.items.5.description",
            footer: "page.login.slider.items.5.footer",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === items.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, items.length]);


    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };


    return (
        <div className="container-login">
            <div
                className="slider-login-items"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {items.map((item, index) => (
                    <div key={item.id} className="slider-item">

                        <div className="row-header">
                            <img
                                className="logo-header"
                                src={item.headerImg}
                                alt={`Logo ${index + 1}`}
                            />
                        </div>

                        <div className="row-content">
                            <div className="icon-image">
                                <img
                                    className="img-contant"
                                    src={item.contentImg}
                                    alt={`Imagen del contenido ${index + 1}`}
                                />
                            </div>

                            <div className="text-image">
                                {item.title ? (
                                    <p
                                        className="title-banner"
                                        dangerouslySetInnerHTML={{ __html: t(item.title) }}
                                    />
                                ) : (
                                    item.titleImg && (
                                        <img
                                            className="title-image"
                                            src={item.titleImg}
                                            alt={`Título como imagen ${index + 1}`}
                                        />
                                    )
                                )}

                                <p
                                    className="content-banner"
                                    dangerouslySetInnerHTML={{ __html: t(item.description) }}
                                />
                            </div>
                        </div>

                        <div className="row-footer">
                            <p
                                className="text-footer"
                                dangerouslySetInnerHTML={{ __html: t(item.footer) }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <ol className="carousel-indicators">
                {items.map((_item, index) => (
                    <li
                        key={index}
                        data-slide-to={index}
                        className={currentIndex === index ? "active" : ""}
                        onClick={() => goToSlide(index)}
                    ></li>
                ))}
            </ol>
        </div>
    );
}

export default Slider;