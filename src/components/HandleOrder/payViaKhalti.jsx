// import React, { useState } from "react";
// import KhaltiCheckout from "khalti-checkout-web";
// import { KhaltiIcon } from "assets/KhaltiIcon";
// import { useTransaction } from "components/Contexts/TransactionContext";

// const PayViaKhalti = ({
//     food,
//     totalPrice,
//     deliveryCharge,
//     transactionUuid,
// }) => {
//     const [amount, setAmount] = useState(1000);
//     const { saveTransactionToFirebase } = useTransaction();
//     const config = {
//         publicKey: "test_public_key_05473b5817a14e76ba897b05f990be28",
//         productIdentity: "1234567890",
//         productName: "Dragon",
//         productUrl: "http://gameofthrones.wikia.com/wiki/Dragons",
//         paymentPreference: [
//             "KHALTI",
//             "EBANKING",
//             "MOBILE_BANKING",
//             "CONNECT_IPS",
//             "SCT",
//         ],
//         eventHandler: {
//             onSuccess(payload) {
//                 console.log(payload);
//                 fetch("/verify-payment", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(payload),
//                 })
//                     .then((response) => response.json())
//                     .then((data) => console.log(data))
//                     .catch((error) => console.error(error));
//             },
//             onError(error) {
//                 console.log(error);
//             },
//             onClose() {
//                 console.log("widget is closing");
//             },
//         },
//     };

//     const checkout = new KhaltiCheckout(config);

//     const handlePayment = async () => {
//         try {
//             await saveTransactionToFirebase(user.uid, {
//                 ...food,
//                 amount: totalPrice,
//                 deliveryCharge: deliveryCharge,
//                 transactionUuid: transactionUuid,
//                 status: "pending",
//                 method: "Khalti",
//                 date: new Date().toISOString().slice(0, 10),
//             });
//         } catch (error) {
//             console.log(error);
//         }
//         checkout.show({ amount });
//     };

//     const buttonStyle = {
//         display: "inline-flex",
//         alignItems: "center",
//         backgroundColor: "#5e4cae",
//         color: "white",
//         padding: "10px 20px",
//         fontSize: "16px",
//         fontWeight: "bold",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//         transition: "background-color 0.3s ease",
//     };

//     const iconStyle = {
//         marginLeft: "10px",
//         border: "none",
//         height: "20px",
//     };

//     const buttonHoverStyle = {
//         backgroundColor: "#5445a0",
//     };

//     return (
//         <div>
//             <button
//                 style={buttonStyle}
//                 onMouseOver={(e) =>
//                     (e.currentTarget.style.backgroundColor =
//                         buttonHoverStyle.backgroundColor)
//                 }
//                 onMouseOut={(e) =>
//                     (e.currentTarget.style.backgroundColor =
//                         buttonStyle.backgroundColor)
//                 }
//                 onClick={handlePayment}
//             >
//                 Pay via&nbsp;
//                 <KhaltiIcon />
//             </button>
//         </div>
//     );
// };

// export default PayViaKhalti;

// import React, { useState } from 'react';
// import axios from 'axios';
// import KhaltiCheckout from 'khalti-checkout-web';

// src/components/KhaltiPayment.js
import React from 'react';
import KhaltiCheckout from 'khalti-checkout-web';
import axios from 'axios';

const KhaltiPayment = ({food, total}) => {
    const handlePayment = async () => {
        const paymentData = {
            public_key: '3ef83e6bbad34b14a713bd9cb700a625',
            txn_amount: 1000,
            txn_currency: 'NPR',
            product_name: 'Sample Product',
            product_id: 'product_001',
            product_url: 'http://yourwebsite.com/product_001',
            additional_data: {}
        };
        const config = {
            publicKey: '3ef83e6bbad34b14a713bd9cb700a625',
            productIdentity: 'unique_product_id',
            productName: 'Product Name',
            productUrl: 'http://your-app.com',
            eventHandler: {
                onSuccess(payload) {
                    console.log('Payment successful:', payload);
                    // Send payload to server for further processing
                    axios.post('http://localhost:3000/payment/initiate/', paymentData)
        .then(response => {
            console.log('Payment initiation successful:', response.data);
            // Handle success
        })
        .catch(error => {
            console.error('Payment initiation error:', error.response.data);
            // Handle error
        });
                },
                onError(error) {
                    console.error('Payment error:', error);
                },
                onClose() {
                    console.log('Payment window closed.');
                }
            }
        };

        const checkout = new KhaltiCheckout(config);

        // Amount in paisa (e.g., 1000 paisa = 10 NPR)
        const amount = 1000;
        checkout.show({ amount });
    };

    return (
        <div>
            <h2>Khalti Payment Gateway Integration</h2>
            <button onClick={handlePayment}>Pay with Khalti</button>
        </div>
    );
};

export default KhaltiPayment;
