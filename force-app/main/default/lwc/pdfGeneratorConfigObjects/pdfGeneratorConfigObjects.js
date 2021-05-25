import { LightningElement } from 'lwc';

const columns = [
    { label: 'Label', fieldName: 'name' },
    { label: 'Developer Name', fieldName: 'website', type: 'url' },
    { label: 'Template', fieldName: 'phone', type: 'phone' },
    { label: 'Last Modified', fieldName: 'amount', type: 'currency' },
    { label: 'Created', fieldName: 'closeAt', type: 'date' },
];

export default class PdfGeneratorConfigObjects extends LightningElement {
    data = [];
    columns = columns;

    clickNew(event){
        
    }
}