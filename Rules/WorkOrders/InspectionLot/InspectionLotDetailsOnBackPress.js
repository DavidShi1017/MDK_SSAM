import EnableInspectionLotSetUsage from './SetUsage/EnableInspectionLotSetUsage';

export default function InspectionLotDetailsOnBackPress(context) {

    if (context.binding['@odata.type'] === '#sap_mobile.InspectionLot') {
        return context.read('/SAPAssetManager/Services/AssetManager.service', context.binding['@odata.readLink'], [], '$expand=InspectionPoints_Nav').then ((inspectionLotObject) => {
            if (inspectionLotObject.length > 0) {
                context.evaluateTargetPathForAPI('#Page:WorkOrderDetailsPage').getClientData().inspectionPointNav = inspectionLotObject;
            } 
        });
    }
    return clientAPI.executeAction('/SAPAssetManager/Actions/Page/CancelPage.action');
}
