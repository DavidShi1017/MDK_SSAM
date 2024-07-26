import libVal from '../Common/Library/ValidationLibrary';
import Logger from '../Log/Logger';

export default function NotificationMainPlannerGoupDefaultPkrDefault(context) {
    let binding = context.binding;
    if (libVal.evalIsEmpty(binding.PlanningGroup)) {
        return null;
    }

    let value = binding.PlanningPlant;
    Logger.debug("value---->  " + value);
    let filterQuery = `$filter=PlannerGroup eq '${binding.PlanningGroup}' and PlanningPlant eq '${value}'`;
    Logger.debug("filterQuery---->  " + filterQuery);
    return context.read('/SAPAssetManager/Services/AssetManager.service', 'PlannerGroups', [], filterQuery).then(function(result) {
        
        if (result && result.length > 0) {
            Logger.debug("result---->  " + result.getItem(0).PlanningPlant);
            Logger.debug("result---->  " + JSON.parse(result));
            return result.getItem(0).PlanningGroup + "-" + result.getItem(0).PlanningPlant;
        }
        return null;
    });
}
