import AppVersionInfo from '../UserProfile/AppVersionInfo';
/**
* Check for unsaved changes before closing or canceling a page
* @param {IClientAPI} context
*/
export default function InspectionCharacteristicsEDTCheckForChangesBeforeClose(context) {
    const confirmCloseAction = '/SAPAssetManager/Actions/Page/ConfirmClosePage.action';
    let sections = context.getPageProxy().getControls()[0].getSections();
    const appVersion = AppVersionInfo(context).split('.')[0];
    let num = parseInt(appVersion);
    
    for (let section of sections) {
        let extension;
        let values;
        if(num >= 2410){
            if (section.getExtension() && section.getExtension().constructor && section.getExtension().constructor.name === 'EditableDataTableViewExtension') {
                extension = section.getExtension();
                values = extension.getUpdatedValues();
            }
        }else{
            if (section.getExtensions() && section.getExtensions()[0] && section.getExtensions()[0].constructor && section.getExtensions()[0].constructor.name === 'EditableDataTableViewExtension') {
                extension = section.getExtensions()[0];
                values = extension.getUpdatedValues();
            }
        }  
        if (values && values.length > 0) {
            return context.executeAction(confirmCloseAction);
        }
        
    }
    return context.executeAction('/SAPAssetManager/Actions/Page/ClosePage.action');
}
