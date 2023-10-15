public with sharing class RenderPDFVFPageController {
    public String renderText {get; set;}
    public RenderPDFVFPageController() {
        renderText = String.escapeSingleQuotes(
            ApexPages.currentPage().getParameters().get('renderText'));
    }   
   
}