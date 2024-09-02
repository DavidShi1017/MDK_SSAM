import hideCancel from '../../../ErrorArchive/HideCancelForErrorArchiveFix';

/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function InspectionPointsOnLoaded(context) {
    hideCancel(context);
    let picker = context.evaluateTargetPath("#Page:InspectionLotDetailsPage/#Control:Valuation");
    hideCancel(context);
    picker.setSelectedIndex(1);
}
