import libCommon from '../../Common/Library/CommonLibrary';
/**
* Formatting output value for MovementTypes component
* @param {IClientAPI} context
*/
export default function FilterTypeWorkcent(context) {
    let binding = context.binding;
    let plant = binding.PlantId;
    var queryOptions = "$filter=Plant eq '" + plant +"'";
    let workcenterId = binding.ExternalWorkCenterId;
    return context.read('/SAPAssetManager/Services/AssetManager.service', 'Plants', [], queryOptions).then((result) => {
        if (result && result.length) {
            let item = result.getItem(0);
            return `${workcenterId} - ${plant} - ${item.PlantDescription}`;
        }
        return '-';
    });
}
