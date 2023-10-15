({
    handleFilterChange: function(component, event) {
        var filters1 = event.getParam('attr1');
         var filters2 = event.getParam('attr2');
        console.log('filters1 =' + filters1);
        console.log('filters2 =' + filters2);
        component.set('v.message', filters1.length > 0 ? 
                      'Selected ContactId from Child LWC: ' + filters1 + ' With ID '+filters2 :
                      'No selection from Child LWC');
    },
})
