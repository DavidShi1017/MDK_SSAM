import libVal from '../Common/Library/ValidationLibrary';
import Logger from '../Log/Logger';

export default function NotificationMainWorkcenterPlantDefaultPkrDefault(context) {
    //let binding = context.binding;
    try {

        let plant = '';

        if (context.getValue().length > 0) {
            plant = context.getValue()[0].ReturnValue;
            let plannerGroupListPicker = context.getPageProxy().evaluateTargetPathForAPI('#Control:WorkCenterPlantLstPkr');
            let plannerGroupListPickerSpecifier = plannerGroupListPicker.getTargetSpecifier();
            let plannerGroupQueryOptions = `$orderby=PlantId&$filter=PlantId eq '${plant}' `;
            plannerGroupListPickerSpecifier.setEntitySet('WorkCenters');
            plannerGroupListPickerSpecifier.setQueryOptions(plannerGroupQueryOptions);
            plannerGroupListPickerSpecifier.setReturnValue('{PlantId}');
            plannerGroupListPickerSpecifier.setDisplayValue('{PlantId} - {WorkCenterName}');
            plannerGroupListPicker.setTargetSpecifier(plannerGroupListPickerSpecifier);
        }
        return true;
    } catch (err) {
        /**Implementing our Logger class*/
        Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryParts.global').getValue(),`PartLibrary.partCreateUpdateOnChange(PlantLstPkr) error: ${err}`);
    }
}
