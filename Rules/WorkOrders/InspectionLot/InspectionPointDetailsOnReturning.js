import EnableInspectionLotSetUsage from './SetUsage/EnableInspectionLotSetUsage';
import CommonLibrary from '../../Common/Library/CommonLibrary';
export default function InspectionPointDetailsOnReturning(context) {

    if (context.binding['@odata.type'] === '#sap_mobile.InspectionPoint') {
        let readLink = context.binding.InspectionLot_Nav["@odata.readLink"];
        return context.read('/SAPAssetManager/Services/AssetManager.service', readLink, [], '$expand=InspectionPoints_Nav').then ((inspectionLotObject) => {
            if (inspectionLotObject.length > 0) {
                CommonLibrary.setStateVariable(context, context.binding.OrderId, inspectionLotObject);
                //return context.setActionBarItemVisible(0, true);
            } else {
                //return context.setActionBarItemVisible(0, true);
            }
        });
    }
}
