import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
    const [emailDetails, setEmailDetails] = useState({
        companyEmail: '',
        subject: '',
        content: ''
    });

    const handleChange = (e) => {
        setEmailDetails({ ...emailDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/sendEmail', emailDetails);
            console.log('Email envoyé avec succès:', response.data);
            // Réinitialiser les champs du formulaire après l'envoi de l'e-mail
            setEmailDetails({
                companyEmail: '',
                subject: '',
                content: ''
            });
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Adresse e-mail de l'entreprise:
                <input type="email" name="companyEmail" value={emailDetails.companyEmail} onChange={handleChange} />
            </label>
            <label>
                Sujet:
                <input type="text" name="subject" value={emailDetails.subject} onChange={handleChange} />
            </label>
            <label>
                Contenu:
                <textarea name="content" value={emailDetails.content} onChange={handleChange} />
            </label>
            <button type="submit">Envoyer l'e-mail</button>
        </form>
    );
};

export default EmailForm;
