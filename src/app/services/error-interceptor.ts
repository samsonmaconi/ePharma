import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgbModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
//import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { MatDialog } from '@angular/material';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private dialog: NgbModal){}
    intercept(req: HttpRequest<any>, next: HttpHandler){

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) =>{
                let em = "Unknown error";
                if(error.error.message){
                    em = error.error.message;
                }
                //this.dialog.open(ErrorHandlingComponent);
                return throwError(error);
            })
        );
    }
}