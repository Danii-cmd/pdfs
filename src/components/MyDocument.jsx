import React, { useState, useEffect } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export const MyDocument = ({ pdfName }) => {
  const [pdfUrl, setPdfUrl] = useState(''); // Estado para almacenar la URL del PDF
  const [pdfError, setPdfError] = useState(''); // Estado para manejar errores

  useEffect(() => {
    // Validar que el nombre del PDF no esté vacío
    if (pdfName.trim() === '') {
      setPdfError('El nombre del PDF no puede estar vacío.');
      return;
    }

    // Hacer una solicitud al servidor de reenvío para obtener el PDF
    fetch('http://localhost:3001/pdf') // Cambia la URL si es necesario
      .then((response) => {
        if (response.ok) {
          // Si la solicitud es exitosa, abre el PDF
          response.blob().then((blob) => {
            const pdfUrl = URL.createObjectURL(blob);
            setPdfError('');
            setPdfUrl(pdfUrl); // Establece la URL del PDF
          });
        } else {
          // Si la solicitud falla, muestra un error
          setPdfError('Error al obtener el PDF.');
        }
      })
      .catch((error) => {
        console.error(error);
        setPdfError('Error al obtener el PDF.');
      });
  }, [pdfName]);

  return (
    <div className="container">
      <br />
      <h4>Visor de PDF</h4>
      <div className="pdf-container">
        {/* Mostrar el visor de PDF si la URL del PDF es válida */}
        {pdfUrl && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfUrl} />
          </Worker>
        )}

        {/* Mostrar mensaje de error si ocurrió un problema al obtener el PDF */}
        {pdfError && <div className="error-msg">{pdfError}</div>}
      </div>
    </div>
  );
};
