public with sharing class RenderPdfLWCHelper {
    @AuraEnabled
    public static Attachment generatePDF(String txtValue){
        
        Pagereference pg = Page.renderAsPdfPage;
        pg.getParameters().put('renderText', txtValue);

        Contact con = new Contact(Id='0032v00003RkBkYAAV');
        Attachment objAttachment = new Attachment();
        objAttachment.Name = 'sampleLWC.pdf';
        objAttachment.ParentId = con.Id;
        objAttachment.Body = pg.getContentaspdf();   
        objAttachment.IsPrivate = false;
        insert objAttachment;
        return objAttachment;
    }

}