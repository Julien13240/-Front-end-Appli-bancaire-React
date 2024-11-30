import React from 'react';
const Transaction = ({ transaction }) => {
    return (

        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{transaction.title}</h3>
                <p className="account-amount">{transaction.amount}</p>
                <p className="account-amount-description">{transaction.description}</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
        </section>

    )
}
export default Transaction;