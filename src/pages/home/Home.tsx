import "../../assets/css/home.css"
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Payment} from "../../shared/interfaces/payment.interface.ts";
import PaymentConfirmation from "../payment-confirmation/PaymentConfirmation.tsx";
import {Toast} from "primereact/toast";
import { Dialog } from "primereact/dialog";

const Home = () => {
    const [name, setName] = useState("");
    const [last, setLast] = useState("");
    const [status, setStatus] = useState("");
    const [payments, setPayments] = useState([]);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const toast = useRef<Toast>(null);

    const {t} = useTranslation();

    const handleGetInfoProfile = async () => {
        try {
            const token = localStorage.getItem('accessToken');

            const response = await axios.get('http://localhost:5000/api/auth/info', {
                headers: {Authorization: `Bearer ${token}`},
            });

            const history = await axios.get('http://localhost:5000/api/wallet/transactions/history', {
                headers: {Authorization: `Bearer ${token}`},
            });

            setPayments(history.data.data);

            console.log(payments);

            if (response) {
                setName(response.data.data.name);
                setLast(response.data.data.last);
                setStatus(response.data.data.wallet);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                handleGetInfoProfile();
            }
        };
        fetchUser();
    }, []);

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const handleOpenDialog = (rowData:any) => {
        setSelectedPayment(rowData);
        setIsDialogVisible(true);
    };

    const handleCloseDialog = (shouldRefresh = false) => {
        setSelectedPayment(null);
        setIsDialogVisible(false);

        if(shouldRefresh) {
            handleGetInfoProfile();
        }
    };

    return (
        <div className="home-container">
            <div className="welcome">
                <div className="user-info">
                    <span>{t("page.dashboard.profile.welcome")} {name}</span>
                    <span>{t("page.dashboard.profile.lastConnect")} {formatDate(last)}</span>
                    <span>{t("page.dashboard.profile.status")} <span
                        style={{color: status === "active" ? "green" : "red"}}> {status} </span></span>
                </div>
                <div className="table-history">
                    <DataTable value={payments} paginator rows={5} rowsPerPageOptions={[5, 10]}
                               tableStyle={{minWidth: '90rem'}}>
                        <Column field="transactionReference" header="Id Transaccion" style={{width: '10%'}}></Column>
                        <Column field="email" header="Email Pago" style={{width: '10%'}}></Column>
                        <Column field="type" header="Tipo de pago" style={{width: '15%'}}></Column>
                        <Column field="amount" header="Monto de Pago" style={{width: '15%'}}></Column>
                        <Column field="currency" header="Moneda" style={{width: '10%'}}></Column>
                        <Column
                            field="createdAt"
                            header="Fecha de Creación"
                            style={{ width: '15%' }}
                            body={(rowData) => {
                                return formatDate(rowData.createdAt);
                            }}
                        ></Column>
                        <Column
                            field="status"
                            header="Status de Pago"
                            style={{width: '10%'}}
                            body={(rowData) => (
                                <span
                                    className={`status-badge ${rowData.status === 'pending' ? 'pending' : 'completed'}`}
                                >   {rowData.status}</span>)}
                        ></Column>
                        <Column
                            header="Action"
                            style={{width: '10%'}}
                            body={(rowData) => (
                                <button
                                    onClick={() => handleOpenDialog(rowData)}
                                    disabled={rowData.status !== "pending"}
                                    className={`action-button ${rowData.status !== "pending" ? "disabled" : ""}`}
                                >
                                    Procesar
                                </button>
                            )}
                        ></Column>
                    </DataTable>

                    <Dialog
                        header="Confirmación de Pago"
                        visible={isDialogVisible}
                        style={{ width: "50vw" }}
                        onHide={handleCloseDialog}
                    >
                        {selectedPayment && (
                            <PaymentConfirmation
                                payment={selectedPayment}
                                toast={toast}
                                onClose={(shouldRefresh:boolean) => handleCloseDialog(shouldRefresh)}
                            />
                        )}
                    </Dialog>
                    <Toast ref={toast} />
                </div>
            </div>
        </div>
    );
}

export default Home;