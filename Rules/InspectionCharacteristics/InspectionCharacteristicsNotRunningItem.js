import inspCharLib from './Update/InspectionCharacteristics';
import common from '../Common/Library/CommonLibrary';
import NotificationTypeLstPkrDefault from '../Notifications/NotificationTypePkrDefault';
import QMNotificationDefectType from '../Notifications/QMNotificationDefectType';
import PreloadHierarchyListPickerValues from '../HierarchyControl/PreloadHierarchyListPickerValues';
import InspectionCharacteristicsEDTLibrary from './Update/InspectionCharacteristicsEDTLibrary';
export default async function InspectionCharacteristicsNotRunningItem(context) {
    let clientAPI = context._control.getTable().context.clientAPI;
    //common.setOnChangesetFlag(clientAPI, true);
    //common.resetChangeSetActionCounter(clientAPI);
    //common.setOnCreateUpdateFlag(clientAPI, 'CREATE');
    let valuationStatus;
    let style;
    let binding = context.binding;
    let newBinding = binding;
    let valuationReadlink = '';
    let valueCell = context._control.getTable().getRowCellByName(context._control.getRow(), 'Quantitive');
    let valuationCell = context._control.getTable().getRowCellByName(context._control.getRow(), 'Valuation');
    let RemarksCell = context._control.getTable().getRowCellByName(context._control.getRow(), 'Remarks');
    if (inspCharLib.isQuantitative(binding)) {
        valueCell = context._control.getTable().getRowCellByName(context._control.getRow(), 'Quantitive');
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
            

    }else if (inspCharLib.isQualitative(binding)) {
        valueCell = context._control.getTable().getRowCellByName(context._control.getRow(), 'Qualitative');
        let readLink = context._control.getValue();
        //valuationCell.setValue(0);
        let listPickerValue = '';
        let listPickerDisplayValue = '';
        let filter = '$orderby=Code asc&$filter=(SelectedSet eq \'' + binding.SelectedSet + '\' and Plant eq \'' + binding.SelectedSetPlant + '\' and Catalog eq \'' + binding.Catalog + '\' and Code eq \'NR\')';
        let CodeGroup = await context.read('/SAPAssetManager/Services/AssetManager.service', 'InspectionCodes', [], filter).then(valuationResult => {
            if (valuationResult && valuationResult.getItem(0)) {
                return valuationResult.getItem(0).CodeGroup;
            }
            return '';
        });
        listPickerValue = `InspectionCodes(Plant='${binding.SelectedSetPlant}',SelectedSet='${binding.SelectedSet}',Catalog='${binding.Catalog}',CodeGroup='${CodeGroup}',Code='NR')`;
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
    //clientAPI.getPageProxy().redraw();
    
    return new Promise(resolve => {
        resolve({ "Success": true });
    });
}
