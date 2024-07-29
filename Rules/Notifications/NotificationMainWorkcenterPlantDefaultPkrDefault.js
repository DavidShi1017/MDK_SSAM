import libVal from '../Common/Library/ValidationLibrary';
import Logger from '../Log/Logger';

export default function NotificationMainWorkcenterPlantDefaultPkrDefault(context) {
    //let binding = context.binding;
    try {

        let plant = '';

        if (context.getValue().length > 0) {
            plant = context.getValue()[0].ReturnValue;
            let plannerGroupListPicker = context.getPageProxy().evaluateTargetPathForAPI('#Control:MainWorkCenterListPicker');
            let plannerGroupListPickerSpecifier = plannerGroupListPicker.getTargetSpecifier();
            let plannerGroupQueryOptions = `$orderby=PlantId&$filter=PlantId eq '${plant}' `;
            plannerGroupListPickerSpecifier.setEntitySet('WorkCenters');
            plannerGroupListPickerSpecifier.setQueryOptions(plannerGroupQueryOptions);
            plannerGroupListPickerSpecifier.setReturnValue('{WorkCenterId}');
            plannerGroupListPickerSpecifier.setDisplayValue('{ExternalWorkCenterId} - {PlantId}');
            plannerGroupListPicker.setTargetSpecifier(plannerGroupListPickerSpecifier);
        }
        return true;
    } catch (err) {
        /**Implementing our Logger class*/
        Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryParts.global').getValue(),`PartLibrary.partCreateUpdateOnChange(PlantLstPkr) error: ${err}`);
    }
}
