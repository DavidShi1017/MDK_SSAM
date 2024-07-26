import libVal from '../Common/Library/ValidationLibrary';
import Logger from '../Log/Logger';

export default function NotificationMainPlannerGoupDefaultPkrDefault(context) {
    let binding = context.binding;
    if (libVal.evalIsEmpty(binding.PlanningGroup)) {
        return null;
    }
    let formCellContainer = context.getControl('FormCellContainer');
    Logger.debug("formCellContainer---->" + formCellContainer);
    let formCellSection1 = formCellContainer.getControl('FormCellSection1')
    Logger.debug("formCellSection1---->" + formCellSection1);
    var plant = formCellSection1.getControl('PlanningPlantLstPkr').getValue();
    let value = plant.length ? plant[0].ReturnValue : '';
    let filterQuery = `$filter=PlannerGroup eq '${binding.PlanningGroup}' and PlanningPlant eq '${value}'`;
    return context.read('/SAPAssetManager/Services/AssetManager.service', 'PlannerGroups', [], filterQuery).then(function(result) {
        if (result && result.length > 0) {
            return result.getItem(0).PlanningGroup + "-" + result.getItem(0).PlanningPlant;
        }
        return null;
    });
}
