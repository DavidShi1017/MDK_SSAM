
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
    }
    
    
    let notifTypePromise = binding.EAMChecklist_Nav ? NotificationTypeLstPkrDefault(clientAPI, binding) : QMNotificationDefectType(clientAPI, binding);
    return notifTypePromise.then(type => {
        // Add HeaderFunctionLocation and HeaderEquipment to new binding
        // Forces Notification Create page to default pickers
        newBinding = binding;
        newBinding.HeaderFunctionLocation = binding.InspectionLot_Nav.FunctionalLocation;
        newBinding.HeaderEquipment = binding.InspectionLot_Nav.Equipment;
        newBinding.NotificationType = type;
        clientAPI.getPageProxy().setActionBinding(newBinding);
        common.setStateVariable(clientAPI, 'LocalId', ''); //Reset before starting create
        common.setStateVariable(clientAPI, 'lastLocalItemNumber', '');
     
        if (binding.EAMChecklist_Nav) {
            PreloadHierarchyListPickerValues(clientAPI, '/SAPAssetManager/Pages/Notifications/NotificationCreateUpdate.page');
            return clientAPI.getPageProxy().executeAction('/SAPAssetManager/Actions/Notifications/CreateUpdate/NotificationCreateUpdateNav.action');
        } else {
            PreloadHierarchyListPickerValues(clientAPI, '/SAPAssetManager/Pages/Notifications/QMDefectCreateUpdate.page');
            return clientAPI.getPageProxy().executeAction('/SAPAssetManager/Actions/Notifications/QMDefectCreateNav.action');
        }
    });
}
