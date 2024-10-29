/**
* Get the Technical Object Id and Description
* @param {IClientAPI} context
*/
import libVal from '../../../Common/Library/ValidationLibrary';
export default function InspectionPointValuationDesc(context) {

    let binding = context.binding;
    
    if (binding) {
        if (libVal.evalIsEmpty(binding.InspValuation_Nav.Valuation)) {
            return '';
        }else{
            return binding.InspCode_Nav.CodeDesc;
        }
    }

    return '';

}
