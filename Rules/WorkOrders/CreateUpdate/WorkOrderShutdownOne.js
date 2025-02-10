import libCommon from '../../Common/Library/CommonLibrary';


import ExecuteActionWithAutoSync from '../../ApplicationEvents/AutoSync/ExecuteActionWithAutoSync';

export default function WorkOrderShutdownOne(clientAPI) {
    //Remove variable FollowUpFlagPage before create
   
    let binding = clientAPI.binding;

    if(binding){
        binding.OrderHeaderReadLink = "MyWorkOrderHeaders('" + binding.OrderId + "')";
        //return clientAPI.executeAction('/SAPAssetManager/Actions/WorkOrders/CreateUpdate/WorkOrderShutdown.action');
        return clientAPI.executeAction({'Name': '/SAPAssetManager/Actions/WorkOrders/CreateUpdate/WorkOrderShutdown.action', 'Properties': {
            'Target': {
                'EntitySet': 'MyWorkOrderHeaders',
                'Service': '/SAPAssetManager/Services/AssetManager.service',
                'ReadLink': binding.OrderHeaderReadLink,
            },
            'Properties': {
                'ZSystemCondition': 'X'
            },
        
        }}).then( result => {
            if(result){
                return ExecuteActionWithAutoSync(clientAPI, '/SAPAssetManager/Actions/CreateUpdateDelete/UpdateEntitySuccessMessage.action');
            }
        });
    }
}
