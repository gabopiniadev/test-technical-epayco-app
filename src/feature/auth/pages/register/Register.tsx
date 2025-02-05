import "../../../../assets/css/register.css";
import RegisterForm from "../../components/RegisterForm.tsx";
import NoteRegister from "../../components/NoteRegister.tsx";


const RegisterPage = () => {
    return (
        <div className="register-container">
            <div className="register-container-info">
                <NoteRegister />
            </div>
            <div className="register-container-form">
                <RegisterForm />
            </div>
        </div>
    );
}

export default RegisterPage;