import libCommon from '../../Common/Library/CommonLibrary';


import ExecuteActionWithAutoSync from '../../ApplicationEvents/AutoSync/ExecuteActionWithAutoSync';
import NativeScriptObject from '../../Common/Library/NativeScriptObject';
export default function WorkOrderShutdownOne(clientAPI) {
    //Remove variable FollowUpFlagPage before create
   
    let binding = clientAPI.binding;

    if(binding){
        // binding.OrderHeaderReadLink = "MyWorkOrderHeaders('" + binding.OrderId + "')";
        // //return clientAPI.executeAction('/SAPAssetManager/Actions/WorkOrders/CreateUpdate/WorkOrderShutdown.action');
        // return clientAPI.executeAction({'Name': '/SAPAssetManager/Actions/WorkOrders/CreateUpdate/WorkOrderShutdown.action', 'Properties': {
        //     'Target': {
        //         'EntitySet': 'MyWorkOrderHeaders',
        //         'Service': '/SAPAssetManager/Services/AssetManager.service',
        //         'ReadLink': binding.OrderHeaderReadLink,
        //     },
        //     'Properties': {
        //         'ZSystemCondition': 'X'
        //     },
        
        // }}).then( result => {
        //     if(result){
        //         return ExecuteActionWithAutoSync(clientAPI, '/SAPAssetManager/Actions/CreateUpdateDelete/UpdateEntitySuccessMessage.action');
        //     }
        // });

        
        let jsonData = { "name": "David", "age": 30, "city": "Shanghai" };
        let tempFolder = NativeScriptObject.getNativeScriptObject(clientAPI).fileSystemModule.knownFolders.documents();
        let documentPath = NativeScriptObject.getNativeScriptObject(clientAPI).fileSystemModule.path.join(tempFolder.path, '1234', 'data.json');// 共享目录
            
        let content = JSON.stringify(jsonData, null, 2);
        var documentFileObject = NativeScriptObject.getNativeScriptObject(clientAPI).fileSystemModule.File.fromPath(documentPath);
        documentFileObject.writeSync(content, () => {
            return clientAPI.executeAction('/SAPAssetManager/Actions/Documents/DownloadMediaFailure.action');
        });
    }
}
