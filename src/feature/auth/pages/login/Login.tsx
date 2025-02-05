import LoginForm from "../../components/LoginForm";
import Slider from "../../components/Slider.tsx";

const LoginPage = () => {
    return (
        <div className="container-login">
            <div className="slider-container">
                <Slider />
            </div>

            <div className="login-form-container">
                <LoginForm />
            </div>
        </div>
    );

};

export default LoginPage;