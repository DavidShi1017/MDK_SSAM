import updateGroupPickers from './UpdateGroupPickers';
import libVal from '../../Common/Library/ValidationLibrary';
import updateSoldToPartyPickers from './NotificationCreateUpdateSoldToPartyPickers';
import Logger from '../../Log/Logger';


export default function NotificationCreateUpdateWorkcenterPlantItems(clientAPI, controlProxy) {
    let formCellContainer = clientAPI.getControl('FormCellContainer');
    //let formCellContainer = context.getControl('FormCellContainer');

   // let value = formCellContainer.getControl('MainWorkCenterListPicker').getValue();
    let filter = "$filter=WorkcenterId eq '" + "111" + "'" + "&$orderby=PlantId";
    return controlProxy.read('/SAPAssetManager/Services/AssetManager.service', 'WorkCenters', [], filter).then(function(obArray) {
        var jsonResult = [];
        obArray.forEach(function(element) {
            jsonResult.push(
                {
                    'DisplayValue': `${element.PlantId} - ${element.WorkCenterName}`,
                    'ReturnValue': element.PlantId,
                });
        });
        const uniqueSet = new Set(jsonResult.map(item => JSON.stringify(item)));
        let finalResult = [...uniqueSet].map(item => JSON.parse(item));
        return finalResult;
    });
   
}
