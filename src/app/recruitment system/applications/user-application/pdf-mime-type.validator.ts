import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

export const pdfMimeType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  // console.log('MIME CONTROL :: \n', control);
  if (typeof(control.value) === 'string') {
    // console.log('MIME CONTROL here:: \n', control.value);
    return of(null);
  }
//   console.log('MIMEEEEEE');
  const file = control.value as File;
  const fileReader = new FileReader();

  const frObs = new Observable(
    (observer: Observer<{ [key: string]: any }>) => {
    
    fileReader.onload = () => {
        const arr = new Uint8Array(<ArrayBuffer>fileReader.result).subarray(0, 4);
        let header = "";
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        switch (header) {
          case "25504446":
            isValid = true;
            break;
          default:
            isValid = false;
            break;
        }
        if (isValid) {
          // console.log('MIME CONTROL valid:: \n');
          observer.next(null);
        } else {
          // console.log('MIME CONTROL :: invalid\n');
          observer.next({ invalidMimeType: true });
        }
        observer.complete();
      };

      fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};
