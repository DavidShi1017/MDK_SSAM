import EnableInspectionLotSetUsage from './SetUsage/EnableInspectionLotSetUsage';
import CommonLibrary from '../../Common/Library/CommonLibrary';
export default function InspectionLotDetailsOnReturning(context) {

    if (context.binding['@odata.type'] === '#sap_mobile.InspectionLot') {
        return context.read('/SAPAssetManager/Services/AssetManager.service', context.binding['@odata.readLink'], [], '$expand=InspectionPoints_Nav').then ((inspectionLotObject) => {
            if (inspectionLotObject.length > 0) {
                CommonLibrary.setStateVariable(context, context.binding.OrderId, inspectionLotObject);
                context.evaluateTargetPathForAPI('#Page:WorkOrderOperationDetailsPage').getClientData().inspectionPointNav = inspectionLotObject;
                context._context.binding = inspectionLotObject.getItem(0);
                return context.setActionBarItemVisible(0, EnableInspectionLotSetUsage(context));
            } else {
                return context.setActionBarItemVisible(0, false);
            }
        });
    }
}
