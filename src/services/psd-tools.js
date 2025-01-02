import { findSequence } from "./findSequence";

export async function extractPsdThumbnail(file) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = function (event) {
      try {
        const inData = new Uint8Array(event.target.result);
        let offset = 0;
        let outFilesize = 0;

        // Define the PSD signature as a byte sequence
        const psdSignature = [56, 66, 80, 83]; // ASCII codes for '8BPS'

        // Check for PSD signature
        if (findSequence(psdSignature, inData) !== 0) {
          reject(new Error("Not a PSD file"));
          return;
        }

        // Define the target sequences
        const targetSequences = [
          [56, 66, 73, 77, 4, 9], // '8BIM' + valid pattern 1
          [56, 66, 73, 77, 4, 12], // '8BIM' + valid pattern 2
        ];

        for (const sequence of targetSequences) {
          const matchIndex = findSequence(sequence, inData);
          if (matchIndex !== -1) {
            offset = matchIndex + 8; // Found the sequence; calculate offset
            break;
          }
        }

        // Calculate the size of the thumbnail
        for (let i = 0, l = 3; i <= 4; i++) {
          let byte = inData[offset++];
          byte += byte < 0 ? 256 : 0;
          outFilesize += byte * Math.pow(256, 3 - i);
        }

        offset += 27;
        outFilesize -= 28;

        const outData = inData.slice(offset, offset + outFilesize);
        resolve(new Blob([outData], { type: "image/jpeg" }));
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = function () {
      reject(new Error("Error reading file"));
    };

    reader.readAsArrayBuffer(file);
  });
}
