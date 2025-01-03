// Home.js

import React from 'react';
import FeatureItem from '../../components/Home/featureItem';
import iconChat from '../../assets/img/icon-chat.png'
import iconMoney from '../../assets/img/icon-money.png'
import iconSecurity from '../../assets/img/icon-security.png'
import { useDispatch } from 'react-redux'

const featuresList = [
    {
        iconSrc: iconChat,
        iconAlt: "Chat Icon",
        title: "You are our #1 priority",
        description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
    },
    {
        iconSrc: iconMoney,
        iconAlt: "Money Icon",
        title: "More savings means higher rates",
        description: "The more you save with us, the higher your interest rate will be!"
    },
    {
        iconSrc: iconSecurity,
        iconAlt: "Security Icon",
        title: "Security you can trust",
        description: " We use top of the line encryption to make sure your data and money is always safe."
    }

]


function Home() {
    const dispatch = useDispatch();
    dispatch({ type: "Chargement" });
    return (

        <main>
            <div className="hero">
                <section className="hero-content">
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">Open a savings account with Argent Bank today!</p>
                </section>
            </div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {featuresList.map((featureItem, featureIndex) => {
                    return (
                        <FeatureItem featureItem={featureItem} key={featureIndex} />
                    )
                })}
            </section>
        </main>

    );
}

export default Home;
