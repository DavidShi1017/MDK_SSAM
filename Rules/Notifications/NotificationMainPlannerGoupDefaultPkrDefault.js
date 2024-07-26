import libVal from '../Common/Library/ValidationLibrary';

export default function NotificationMainPlannerGoupDefaultPkrDefault(context) {
    let binding = context.binding;
    if (libVal.evalIsEmpty(binding.PlanningGroup)) {
        return null;
    }
    let formCellContainer = context.getControl('FormCellContainer');
    var plant = formCellContainer.getControl('PlanningPlantLstPkr').getValue();
    let value = plant.length ? plant[0].ReturnValue : '';
    let filterQuery = `$filter=PlannerGroup eq '${binding.PlanningGroup}' and PlanningPlant eq '${value}'`;
    return context.read('/SAPAssetManager/Services/AssetManager.service', 'PlannerGroups', [], filterQuery).then(function(result) {
        if (result && result.length > 0) {
            return result.getItem(0).PlanningGroup + "-" + result.getItem(0).PlanningPlant;
        }
        return null;
    });
}
