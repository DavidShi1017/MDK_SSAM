import libCommon from '../../Common/Library/CommonLibrary';
/**
* Formatting output value for MovementTypes component
* @param {IClientAPI} context
*/
export default function FilterType(context) {
    let binding = context.binding;
    return `${binding.OrderType} - ${binding.PlantDescription}`;
    
}
