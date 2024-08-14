import libCommon from '../../Common/Library/CommonLibrary';
/**
* Formatting output value for MovementTypes component
* @param {IClientAPI} context
*/
export default function FilterTypeWorkcent(context) {
    let binding = context.binding;
    let plant = binding.PlantId;
    let query = `$filter=PlantId eq '${plant}'`;
    let workcenterId = binding.ExternalWorkCenterId;
    return context.read('/SAPAssetManager/Services/AssetManager.service', 'Plants', [], query).then(data => {
        if (data && data.length) {
            let item = data.getItem(0);
            return `${workcenterId} - ${item.PlantId} - ${item.PlantDescription}`;
        }
        return '-';
    });
    
    
}
