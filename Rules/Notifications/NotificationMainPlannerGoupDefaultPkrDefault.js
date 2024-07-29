import libVal from '../Common/Library/ValidationLibrary';
import Logger from '../Log/Logger';

export default function NotificationMainPlannerGoupDefaultPkrDefault(context) {
    //let binding = context.binding;
    try {

        let plant = '';

        if (context.getValue().length > 0) {
            plant = context.getValue()[0].ReturnValue;
            let plannerGroupListPicker = context.getPageProxy().evaluateTargetPathForAPI('#Control:PlannerGroupListPicker');
            let plannerGroupListPickerSpecifier = plannerGroupListPicker.getTargetSpecifier();
            let plannerGroupQueryOptions = `$orderby=PlanningPlant&$filter=PlanningPlant eq '${plant}' `;
            plannerGroupListPickerSpecifier.setEntitySet('PlannerGroups');
            plannerGroupListPickerSpecifier.setQueryOptions(plannerGroupQueryOptions);
            plannerGroupListPickerSpecifier.setReturnValue('{PlannerGroup}');
            plannerGroupListPickerSpecifier.setDisplayValue('{PlannerGroup} - {PlannerGroupName} - {PlanningPlant}');
            plannerGroupListPicker.setTargetSpecifier(plannerGroupListPickerSpecifier);
        }
        return true;
    } catch (err) {
        /**Implementing our Logger class*/
        Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryParts.global').getValue(),`PartLibrary.partCreateUpdateOnChange(PlantLstPkr) error: ${err}`);
    }
}
