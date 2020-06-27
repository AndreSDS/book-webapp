import React, { useEffect } from 'react';
import Quagga from 'quagga';

import { validateIsbn } from '../../../services/books';

import { Video, Container, ScanMarker } from './styles';

function Scanner() {
  let scannerAttemps = 0;

  const onDetected = result => {
    Quagga.offDetected(onDetected);

    const isbn = result.codeResult.code;
    //if isbn válido
    if (validateIsbn(isbn)) {
      alert(`${isbn} : ISBN válido.`);
      return;
    } else {
      if (scannerAttemps >= 5) {
        alert('Não é possível ler o código do livro. Tente novamente.');
      }
    }
    scannerAttemps++;
    Quagga.onDetected(onDetected);
  };

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.querySelector('#video'),
            constraints: {
              facingMode: 'environment',
            },
          },
          numOfWorkers: 1,
          locate: true,
          decoder: {
            readers: ['ean_reader'],
          },
        },
        err => {
          if (err) {
            console.log(err);
            alert('Favor permitir abertura da câmera!');
            return;
          }
          Quagga.start();
        }
      ); //fim do quagga init
      Quagga.onDetected(onDetected);
    } //fim do if
  });

  return (
    <>
      <Video id="video" />
      <Container>
        <ScanMarker>
          <img
            width="260"
            height="260"
            src="../../../assets/scanmarker.svg"
            alt="área para leitura do código de barras"
          />
          <p className="label">Aponte para o código de barras do livro</p>
        </ScanMarker>
        <img
          width="137"
          height="69"
          src="../../../assets/logo.svg"
          alt="logo marca"
        />
      </Container>
    </>
  );
}

export default Scanner;
