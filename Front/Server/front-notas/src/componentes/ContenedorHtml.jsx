import React, { useEffect, useState } from 'react';
// import paginaSimu from './paginaSimu.html'


export function ContenedorHtml() {

    const [htmlContent, setHtmlContent] = useState('');
    // const htmlContent = require(paginaSimu);

    useEffect(() => {
        fetch('./paginaSimu.html')
            .then(response => response.text())
            .then(data => {
                setHtmlContent(data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div > 
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
}

export default ContenedorHtml;