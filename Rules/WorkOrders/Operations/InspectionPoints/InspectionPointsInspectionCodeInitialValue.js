import libVal from '../../../Common/Library/ValidationLibrary';
import InspectionLotSetUsageQueryOptions from '../../InspectionLot/SetUsage/InspectionLotSetUsageQueryOptions';
export default async function InspectionPointsInspectionCodeInitialValue(context) {
    if (Object.prototype.hasOwnProperty.call(context.binding,'InspCode_Nav') && !libVal.evalIsEmpty(context.binding.InspCode_Nav)) {
        let ClientData = {};
        ClientData.Valuation = context.binding.InspCode_Nav.ValuationStatus;
        ClientData.ValSelectedSet=context.binding.InspCode_Nav.SelectedSet;
        ClientData.ValCatalog=context.binding.InspCode_Nav.Catalog;
        ClientData.ValCode=context.binding.InspCode_Nav.Code;
        ClientData.ValCodeGroup=context.binding.InspCode_Nav.CodeGroup;
        ClientData.Plant=context.binding.InspCode_Nav.Plant;
        context.binding.ClientData = ClientData;
        return context.binding.InspCode_Nav['@odata.readLink'];
    }else{
        let inspectionChar = context.binding.InspectionChar_Nav;
        let isPass = true;
        inspectionChar.map((item) => {
            if(item.Valuation !== 'A'){
                isPass = false;
            }
        });
        const queryOptions = await InspectionLotSetUsageQueryOptions(context);

        if(isPass){

        }else{

        }
    }
}
