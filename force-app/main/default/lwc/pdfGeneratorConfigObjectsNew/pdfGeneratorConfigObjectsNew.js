import { LightningElement, api } from 'lwc';
import saveRecord from '@salesforce/apex/ControllerSetupObjects.saveNewRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PdfGeneratorConfigObjectsNew extends LightningElement {
    modalNew = false;
    objects;
    templates;
    isLoading = false;

    saveRecord(){
        saveRecord()
        .then(result => {
            if (result) {
                
            }else{
                console.log('ERROR!');
                console.log('result: ',result);
            }
        })
        .catch((error) => {
            console.log(error);
        }); 
    }

    //Actions
    saveRecordConfirm(event){
        //this.saveRecord();
    }
    closeModalNew(event){
        this.modalNew = false;
    }
    @api
    openModalNew(){
        this.modalNew = true;
    }
}