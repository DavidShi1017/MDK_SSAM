import inspCharLib from './Update/InspectionCharacteristics';
import common from '../Common/Library/CommonLibrary';
import NotificationTypeLstPkrDefault from '../Notifications/NotificationTypePkrDefault';
import QMNotificationDefectType from '../Notifications/QMNotificationDefectType';
import PreloadHierarchyListPickerValues from '../HierarchyControl/PreloadHierarchyListPickerValues';
import InspectionCharacteristicsEDTLibrary from './Update/InspectionCharacteristicsEDTLibrary';
import AppVersionInfo from '../UserProfile/AppVersionInfo';
export default async function InspectionCharacteristicsNotRunningAll(context) {
    //let clientAPI = context._control.getTable();
    //common.setOnChangesetFlag(clientAPI, true);
    //common.resetChangeSetActionCounter(clientAPI);
    //common.setOnCreateUpdateFlag(clientAPI, 'CREATE');
    let binding = context.binding;
    let index = context._control._params.UserData.Index;
    //let sections = context.getPageProxy().getControls()[0].getSections();
    let currentSectionHeader = context.getPageProxy().getControls()[0].getSections()[index * 2];
    let currentSection = context.getPageProxy().getControls()[0].getSections()[index * 2 + 1];
    const appVersion = AppVersionInfo(context).split('.')[0];
    let num = parseInt(appVersion);
    let SelectedSet = common.getStateVariable(context, 'SelectedSet');
    let SelectedSetPlant = common.getStateVariable(context, 'SelectedSetPlant');
    let Catalog = common.getStateVariable(context, 'Catalog');
    if (currentSectionHeader && currentSection) {
        //for (let section of sections) {
        let extension;
        let extensionHeader;
        let statusText;
        if (num >= 2410) {
            if (currentSection.getExtension() && currentSection.getExtension().constructor && currentSection.getExtension().constructor.name === 'EditableDataTableViewExtension') {
                extension = currentSection.getExtension();
            }
            if (currentSectionHeader.getExtension() && currentSectionHeader.getExtension().constructor && currentSectionHeader.getExtension().constructor.name === 'SectionHeaderViewExtension') {
                extensionHeader = currentSectionHeader.getExtension();
            }
        } else {
            if (currentSection.getExtensions() && currentSection.getExtensions()[0] && currentSection.getExtensions()[0].constructor && currentSection.getExtensions()[0].constructor.name === 'EditableDataTableViewExtension') {
                extension = currentSection.getExtensions()[0];
            }
            if (currentSectionHeader.getExtensions() && currentSectionHeader.getExtensions()[0] && currentSectionHeader.getExtensions()[0].constructor && currentSectionHeader.getExtensions()[0].constructor.name === 'SectionHeaderViewExtension') {
                extensionHeader = currentSectionHeader.getExtensions()[0];
            }
        }
        // if(!extensionHeader){
        //     continue;
        // }
        // let headerIndex = extensionHeader._params.UserData.Index
        // if(headerIndex != index){
        //     continue;
        // }
        if (extension) {
            let rowCount = 0;
            let rows = extension.getRows();
            let valuationStatus;
            let style;
            if(rows){
                
                for (let i = 0; i < rows.length; i++) {
                    if(rows[i].length > 0){
                        rowCount++;
                    }else{
                        continue;
                    }
                    
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

                        }else if(valueCell._cell.Name === 'Qualitative'){
                            //valueCell = context._control.getTable().getRowCellByName(context._control.getRow(), 'Qualitative');
                            //let readLink = context._control.getValue();
                            //valuationCell.setValue(0);
                            let listPickerValue = '';
                            let listPickerDisplayValue = '';
                            let filter = '$orderby=Code asc&$filter=(SelectedSet eq \'' + SelectedSet + '\' and Plant eq \'' + SelectedSetPlant + '\' and Catalog eq \'' + Catalog + '\' and Code eq \'NR\')';
                            let CodeGroup = await context.read('/SAPAssetManager/Services/AssetManager.service', 'InspectionCodes', [], filter).then(valuationResult => {
                                if (valuationResult && valuationResult.getItem(0)) {
                                    return valuationResult.getItem(0).CodeGroup;
                                }
                                return '';
                            });
                            listPickerValue = `InspectionCodes(Plant='${SelectedSetPlant}',SelectedSet='${SelectedSet}',Catalog='${Catalog}',CodeGroup='${CodeGroup}',Code='NR')`;
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
                    
                            
                        }
                    }
                }
            }
        
            if(extensionHeader){
                statusText = context.localizeText('x_of_x_complete', [rowCount, rowCount]);
                extensionHeader.setStatusText(statusText);
            }
        }
        //}
    }
    
    
    return Promise.resolve(true);
}
