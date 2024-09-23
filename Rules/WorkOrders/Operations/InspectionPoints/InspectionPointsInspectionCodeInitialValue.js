import libVal from '../../../Common/Library/ValidationLibrary';
import InspectionLotSetUsageQueryOptions from '../../InspectionLot/SetUsage/InspectionLotSetUsageQueryOptions';
import libCommon from '../../../Common/Library/CommonLibrary';
import Logger from '../../../Log/Logger';

export default async function InspectionPointsInspectionCodeInitialValue(context) {
    let code = '';
    let codeGroup = '';
    let catalog = '';
    let plant = '';
    let selectedSet = '';
    if (Object.prototype.hasOwnProperty.call(context.binding,'InspCode_Nav') && !libVal.evalIsEmpty(context.binding.InspCode_Nav)) {
        // let ClientData = {};
        // ClientData.Valuation = context.binding.InspCode_Nav.ValuationStatus;
        // ClientData.ValSelectedSet=context.binding.InspCode_Nav.SelectedSet;
        // ClientData.ValCatalog=context.binding.InspCode_Nav.Catalog;
        // ClientData.ValCode=context.binding.InspCode_Nav.Code;
        // ClientData.ValCodeGroup=context.binding.InspCode_Nav.CodeGroup;
        // ClientData.Plant=context.binding.InspCode_Nav.Plant;
        // context.binding.ClientData = ClientData;
        // return context.binding.InspCode_Nav['@odata.readLink'];
        code = context.binding.InspCode_Nav.Code;
        codeGroup = context.binding.InspCode_Nav.CodeGroup;
        catalog = context.binding.InspCode_Nav.Catalog;
        plant = context.binding.InspCode_Nav.Plant;
        selectedSet = context.binding.InspCode_Nav.SelectedSet;
        return getDefaultValue();
    }else{
        return getDefaultValue();
    }
    async function  getDefaultValue(){
        let inspectionChar = context.binding.InspectionChar_Nav;
        let isPass = 'Y';
        for (let i = 0; i < inspectionChar.length; i++) {
            if (inspectionChar[i].Valuation === '') {
                isPass = '';
                break; 
            }
            if (inspectionChar[i].Valuation !== 'A') {
                isPass = 'N';
            }
        }
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
        
        if(isPass === 'Y'){
            ClientData.Valuation = sortedItems[0].ValuationStatus;
            ClientData.ValSelectedSet = sortedItems[0].SelectedSet;
            ClientData.ValCatalog = sortedItems[0].Catalog;
            ClientData.ValCode = sortedItems[0].Code;
            ClientData.ValCodeGroup = sortedItems[0].CodeGroup;
            ClientData.Plant = sortedItems[0].Plant;
            context.binding.ClientData = ClientData;
            Logger.debug("ValuationStatus----->" + sortedItems[0].ValuationStatus);
            Logger.debug("@odata.readLink----->" + sortedItems[0]['@odata.readLink']);
            let link = libCommon.decodeReadLink(sortedItems[0]['@odata.readLink']);
            Logger.debug("link----->" + link);
            return libCommon.decodeReadLink(sortedItems[0]['@odata.readLink']);
        }else if(isPass === 'N'){
            ClientData.Valuation = sortedItems[1].ValuationStatus;
            ClientData.ValSelectedSet = sortedItems[1].SelectedSet;
            ClientData.ValCatalog = sortedItems[1].Catalog;
            ClientData.ValCode = sortedItems[1].Code;
            ClientData.ValCodeGroup = sortedItems[1].CodeGroup;
            ClientData.Plant = sortedItems[1].Plant;
            context.binding.ClientData = ClientData;
            let link = libCommon.decodeReadLink(sortedItems[1]['@odata.readLink']);
            Logger.debug("link----->" + link);
            return libCommon.decodeReadLink(sortedItems[1]['@odata.readLink']);
        }else{
            if (Object.prototype.hasOwnProperty.call(context.binding,'InspCode_Nav') && !libVal.evalIsEmpty(context.binding.InspCode_Nav)) {
                context.binding.InspCode_Nav.CodeDesc = '';
                context.binding.InspCode_Nav.ValuationStatus = '';
            }
            
            ClientData.Valuation = '';
            ClientData.ValSelectedSet = sortedItems[1].SelectedSet;
            ClientData.ValCatalog = sortedItems[1].Catalog;
            ClientData.ValCode = sortedItems[1].Code;
            ClientData.ValCodeGroup = sortedItems[1].CodeGroup;
            ClientData.Plant = sortedItems[1].Plant;
            context.binding.ClientData = ClientData;
            return '';
        }
    }
}
