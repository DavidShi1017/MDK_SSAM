import libCommon from '../../Common/Library/CommonLibrary';



export default function WorkOrderShutdownOne(clientAPI) {
    //Remove variable FollowUpFlagPage before create
   
    let binding = clientAPI.binding;

    if(binding){
        binding.OrderHeaderReadLink = "MyWorkOrderHeaders('" + binding.OrderId + "')";
        //return clientAPI.executeAction('/SAPAssetManager/Actions/WorkOrders/CreateUpdate/WorkOrderShutdown.action');
        return context.executeAction({'Name': '/SAPAssetManager/Actions/WorkOrders/CreateUpdate/WorkOrderShutdown.action', 'Properties': {
            'Target': {
                'EntitySet': 'MyWorkOrderHeaders',
                'Service': '/SAPAssetManager/Services/AssetManager.service',
                'ReadLink': binding.OrderHeaderReadLink,
            },
            'Properties': {
                'Phase': 'X – Shutdown'
            },
        
        }});
    }
}
