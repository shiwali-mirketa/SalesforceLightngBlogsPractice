public with sharing class SignatureHelper {
    @AuraEnabled
    public static Attachment saveSign(String strSignElement){
            Contact con = new Contact(Id='0032v00003OIRUQAA5');//Contact where your signature get saved as attachemnt 
            Attachment objAttachment = new Attachment();
            objAttachment.Name = 'Demo-Signature.png';
            objAttachment.ParentId = con.Id;
            objAttachment.ContentType = 'image/png';
            objAttachment.Body = EncodingUtil.base64Decode(strSignElement);        
            insert objAttachment;
            return objAttachment;       
    }
}