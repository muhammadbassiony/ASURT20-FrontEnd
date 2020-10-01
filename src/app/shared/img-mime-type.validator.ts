import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

export const ImgMimeType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  console.log('ENTERED MIME TYPE VALIDATOR\nCONTROL?? :: ', control);
  if (typeof(control.value) === 'string') {
    console.log('MIME TYPE - NULL IF??\nCONTROL.VALUE ::', control.value);
    return of(null);
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = new Observable(
    (observer: Observer<{ [key: string]: any }>) => {
        //   fileReader.addEventListener("loadend", () => {
        fileReader.onload = () => {
          // console.log('MIME V - FILE READ FINISHED');
            const arr = new Uint8Array(<ArrayBuffer>fileReader.result).subarray(0, 4);
            let header = "";
            let isValid = false;
            for (let i = 0; i < arr.length; i++) {
              header += arr[i].toString(16);
            }
            // console.log('MIME V - BEFORE SWITCH');
            switch (header) {
              case "89504e47":
                isValid = true;
                break;
              case "ffd8ffe0":
              case "ffd8ffe1":
              case "ffd8ffe2":
              case "ffd8ffe3":
              case "ffd8ffe8":
                isValid = true;
                break;
              default:
                isValid = false; // Or you can use the blob.type as fallback
                break;
            }
            if (isValid) {
              // console.log('MIME VALID CHECK');
              observer.next(null);
            } else {
              // console.log('INVALID MIME TYPE CHECK');
              observer.next({ invalidMimeType: true });
            }
            // console.log('MIME V - AFTER SWITCH');
            observer.complete();
          };
    
          fileReader.readAsArrayBuffer(file);
        }
      );
      return frObs;
    };
    




//       fileReader.addEventListener("loadend", () => {
//         const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
//         let header = "";
//         let isValid = false;
//         for (let i = 0; i < arr.length; i++) {
//           header += arr[i].toString(16);
//         }
//         switch (header) {
//           case "89504e47":
//             isValid = true;
//             break;
//           case "ffd8ffe0":
//           case "ffd8ffe1":
//           case "ffd8ffe2":
//           case "ffd8ffe3":
//           case "ffd8ffe8":
//             isValid = true;
//             break;
//           default:
//             isValid = false; // Or you can use the blob.type as fallback
//             break;
//         }
//         if (isValid) {
//           observer.next(null);
//         } else {
//           observer.next({ invalidMimeType: true });
//         }
//         observer.complete();
//       });
//       fileReader.readAsArrayBuffer(file);
//     }
//   );
//   return frObs;
// };

