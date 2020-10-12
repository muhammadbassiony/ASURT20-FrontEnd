import { Component,OnDestroy,OnInit,TemplateRef,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css'],
})
export class ErrorModalComponent implements OnInit,OnDestroy {
 ErrorMsg: string;
  @ViewChild('content') content: TemplateRef<NgbModal>;
  modalReference: NgbModalRef;
  subscription: Subscription;
  closeResult: any;

//built in modal service and  error service to get the error message from another components 
  constructor(
    private modalService: NgbModal,
    private ErrService: ErrorService,
    private router : Router
  ) { }

  // function to open modal from ng bootstrap documentation
  openModal() {
    this.modalReference = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', centered: true });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
//this function close the modal and the user must be redirected after it 
  closeModal() {
    this.modalService.dismissAll();
  }

//subscribe to the subject that pass the errorMsg and the url that the user should be redirected to  another page or the same page  
  ngOnInit(): void {
    this.subscription = this.ErrService.ErrorCaught.subscribe(
      (ErrorObject) => {
        this.ErrorMsg = ErrorObject.ErrorMsg;
        this.openModal();
        setTimeout(() => {
          //closing the modal
          let localRef = this.modalReference;
          localRef.close(this.content);
          //redirect to the url 
          this.router.navigate([ErrorObject.Url]);
        }, 3000);
      });
  }
//unsubscribe to the subject
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
