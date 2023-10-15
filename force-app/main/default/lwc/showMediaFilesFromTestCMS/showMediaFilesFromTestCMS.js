import { LightningElement, track, wire } from 'lwc';
import retrieveMediaFromCMS from '@salesforce/apex/CMSConnectApiHelper.retrieveMediaFromCMSStore';

export default class DisplayMediaFilesFromCMS extends LightningElement {
    channelName = 'CMS Channel';
    @track results=[];
    @wire(retrieveMediaFromCMS,{channelName: '$channelName'})
    wiredData({ error, data }) {
        if (data) {
            let objStr = JSON.parse(data);
            console.log('showMediaFilesFromTestCMS  objStr ',objStr);
            objStr.map(element=>{
                this.results = [...this.results,{title:element.title,
                                                url:element.url}]
            });  
            this.error = undefined;            
        } else if (error) {
            this.error = error;
            this.results = undefined;
        }
    }
}