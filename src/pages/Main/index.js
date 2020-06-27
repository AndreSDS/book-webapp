import React, { useEffect } from 'react';
import Quagga from 'quagga';

import { Video } from './styles';

function Main() {
  const onDetected = result => {
    Quagga.offDetected(onDetected);

    let isbn = result.codeResult.code;

    alert(isbn);
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

  return <Video id="video" />;
}

export default Main;
