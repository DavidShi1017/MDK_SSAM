import inspCharLib from './Update/InspectionCharacteristics';
import common from '../Common/Library/CommonLibrary';
import NotificationTypeLstPkrDefault from '../Notifications/NotificationTypePkrDefault';
import QMNotificationDefectType from '../Notifications/QMNotificationDefectType';
import PreloadHierarchyListPickerValues from '../HierarchyControl/PreloadHierarchyListPickerValues';
import InspectionCharacteristicsEDTLibrary from './Update/InspectionCharacteristicsEDTLibrary';
import AppVersionInfo from '../UserProfile/AppVersionInfo';
export default async function InspectionCharacteristicsNotRunningAll(context) {
    let clientAPI = context._control.getTable().context.clientAPI;
    //common.setOnChangesetFlag(clientAPI, true);
    //common.resetChangeSetActionCounter(clientAPI);
    //common.setOnCreateUpdateFlag(clientAPI, 'CREATE');
    let binding = context.binding;

    let sections = context.getPageProxy().getControls()[0].getSections();
    let extension;
    const appVersion = AppVersionInfo(context).split('.')[0];
    let num = parseInt(appVersion);
    if (sections && sections.length > 0) {
        for (let section of sections) {

            if (num >= 2410) {
                if (section.getExtension() && section.getExtension().constructor && section.getExtension().constructor.name === 'EditableDataTableViewExtension') {
                    extension = section.getExtension();
                }
            } else {
                if (section.getExtensions() && section.getExtensions()[0] && section.getExtensions()[0].constructor && section.getExtensions()[0].constructor.name === 'EditableDataTableViewExtension') {
                    extension = section.getExtensions()[0];
                }
            }
            if (extension) {
                let rows = extension.getRows();
                let valuationStatus;
                let style;
                if(rows){
                   
                    for (let i = 0; i < rows.length; i++) {
                        let valueCell = rows[i][3];
                        let valuationCell = rows[i][4];
                        let RemarksCell = rows[i][5];
                        if(valueCell && valueCell._cell){
                            let valuationReadlink = '';
                           
                            if(valueCell._cell.Name === 'Quantitive'){
                                
                                valueCell.setValue(0);
                                RemarksCell.setValue('NR');                       
                                binding.Valuation = 'A';
                                valuationStatus = binding.Valuation;
                                style = { FontColor: '107e3e' };
                        
                                valuationReadlink = `InspectionResultValuations('${valuationStatus}')`;
                                let valuation = await context.read('/SAPAssetManager/Services/AssetManager.service', valuationReadlink, [], '').then(valuationResult => {
                                    if (valuationResult && valuationResult.getItem(0)) {
                                        return valuationResult.getItem(0).ShortText;
                                    }
                                    return '';
                                });
                                valuationCell.clearValidation();
                                valuationCell.setValue(valuation);
                                if (style) {
                                    valuationCell.setStyle(style);
                                }
                        
                                let statusText = inspCharLib.checkEDTReadingCounts(context, context._control.getTable());
                                InspectionCharacteristicsEDTLibrary.findHeaderSection(clientAPI, context._control.getTable()).setStatusText(statusText);
                            }else if(valueCell._cell.Name === 'Qualitative'){
                                valueCell = context._control.getTable().getRowCellByName(context._control.getRow(), 'Qualitative');
                                let readLink = context._control.getValue();
                                //valuationCell.setValue(0);
                                let listPickerValue = '';
                                let listPickerDisplayValue = '';
                                let filter = '$orderby=Code asc&$filter=(SelectedSet eq \'' + binding.SelectedSet + '\' and Plant eq \'' + binding.SelectedSetPlant + '\' and Catalog eq \'' + binding.Catalog + '\' and Code eq \'N0\')';
                                let CodeGroup = await context.read('/SAPAssetManager/Services/AssetManager.service', 'InspectionCodes', [], filter).then(valuationResult => {
                                    if (valuationResult && valuationResult.getItem(0)) {
                                        return valuationResult.getItem(0).CodeGroup;
                                    }
                                    return '';
                                });
                                listPickerValue = `InspectionCodes(Plant='${binding.SelectedSetPlant}',SelectedSet='${binding.SelectedSet}',Catalog='${binding.Catalog}',CodeGroup='${CodeGroup}',Code='N0')`;
                                listPickerDisplayValue = 'Not Operating';
                        
                                valueCell.setValue(listPickerValue);
                                valueCell.setDisplayValue(listPickerDisplayValue);
                        
                                binding.Valuation = 'A';
                                valuationStatus = binding.Valuation;
                                style = { FontColor: '107e3e' };
                                valuationReadlink = `InspectionResultValuations('A')`;
                                let valuation = await context.read('/SAPAssetManager/Services/AssetManager.service', valuationReadlink, [], '').then(valuationResult => {
                                    if (valuationResult && valuationResult.getItem(0)) {
                                        return valuationResult.getItem(0).ShortText;
                                    }
                                    return '';
                                });
                                valuationCell.clearValidation();
                                valuationCell.setValue(valuation);
                                if (style) {
                                    valuationCell.setStyle(style);
                                }
                        
                                let statusText = inspCharLib.checkEDTReadingCounts(context, context._control.getTable());
                                InspectionCharacteristicsEDTLibrary.findHeaderSection(clientAPI, context._control.getTable()).setStatusText(statusText);
                            }
                        }
                    }
                }
            }
        }
    }
    
    
    return clientAPI.getPageProxy().executeAction('');
}
