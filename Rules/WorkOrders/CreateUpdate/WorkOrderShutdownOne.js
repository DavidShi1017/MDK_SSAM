import libCommon from '../../Common/Library/CommonLibrary';



export default function WorkOrderShutdownOne(clientAPI) {
    //Remove variable FollowUpFlagPage before create
   
    let binding = clientAPI.binding;

    if(binding){
        return clientAPI.executeAction('/SAPAssetManager/Actions/WorkOrders/CreateUpdate/WorkOrderShutdown.action');
    }
}
