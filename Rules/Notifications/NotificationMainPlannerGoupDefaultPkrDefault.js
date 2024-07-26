import libVal from '../Common/Library/ValidationLibrary';

export default function NotificationMainPlannerGoupDefaultPkrDefault(context) {
    let binding = context.binding;
    if (libVal.evalIsEmpty(binding.PlanningGroup)) {
        return null;
    }

    let filterQuery = `$filter=PlannerGroup eq '${binding.PlanningGroup}'`;
    return context.read('/SAPAssetManager/Services/AssetManager.service', 'PlannerGroups', [], filterQuery).then(function(result) {
        if (result && result.length > 0) {
            return result.getItem(0).PlanningGroup + "-" + result.getItem(0).PlanningPlant;
        }
        return null;
    });
}
