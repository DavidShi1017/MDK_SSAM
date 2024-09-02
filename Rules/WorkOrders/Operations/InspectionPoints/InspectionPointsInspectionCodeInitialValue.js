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
        let sortedItems ;
        sortedItems = await context.read('/SAPAssetManager/Services/AssetManager.service', 'InspectionCodes', [], queryOptions).then((result) => {
            sortedItems = [...result].sort((a,b) => {
                const codeA = a.Code;
                const codeB = b.Code;
    
                // compare as strings if one of items not numeric or or numeric with prefix 0 ('0001' and '1'), otherwise compare as numbers
                if (`${+codeA}` !== codeA || `${+codeB}` !== codeB) {
                    return codeA.localeCompare(codeB);
                } else {
                    return codeA - codeB;
                }
            });
    
            return sortedItems;
        });
        let ClientData = {};
        if(isPass){
            ClientData.Valuation = sortedItems.getItem(0).ValuationStatus;
            ClientData.ValSelectedSet=sortedItems.getItem(0).SelectedSet;
            ClientData.ValCatalog=sortedItems.getItem(0).Catalog;
            ClientData.ValCode=sortedItems.getItem(0).Code;
            ClientData.ValCodeGroup=sortedItems.getItem(0).CodeGroup;
            ClientData.Plant=sortedItems.getItem(0).Plant;
            binding.ClientData = ClientData;
            return libCommon.decodeReadLink(sortedItems.getItem(0)['@odata.readLink']);
        }else{
            ClientData.Valuation = sortedItems.getItem(1).ValuationStatus;
            ClientData.ValSelectedSet=sortedItems.getItem(1).SelectedSet;
            ClientData.ValCatalog=sortedItems.getItem(1).Catalog;
            ClientData.ValCode=sortedItems.getItem(1).Code;
            ClientData.ValCodeGroup=sortedItems.getItem(1).CodeGroup;
            ClientData.Plant=sortedItems.getItem(1).Plant;
            binding.ClientData = ClientData;
            return libCommon.decodeReadLink(sortedItems.getItem(1)['@odata.readLink']);
        }
    }
}
