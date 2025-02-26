import libCommon from '../../Common/Library/CommonLibrary';


import ExecuteActionWithAutoSync from '../../ApplicationEvents/AutoSync/ExecuteActionWithAutoSync';
import NativeScriptObject from '../../Common/Library/NativeScriptObject';
export default function WorkOrderShutdownOnePress(clientAPI) {
    //Remove variable FollowUpFlagPage before create
    return clientAPI.executeAction(
        {
            'Name': '/SAPAssetManager/Actions/Common/GenericWarningDialog.action',
            'Properties': {
                'Title': 'Shutdown',
                'Message': 'Do you want to Shutdown this Work Order?',
                'OKCaption': clientAPI.localizeText('yes'),
                'CancelCaption': clientAPI.localizeText('no'),
                'OnOK': '/SAPAssetManager/Rules/WorkOrders/CreateUpdate/WorkOrderShutdownOne.js',
            },
        },
    );    
    
        
        // let jsonData = { "name": "David", "age": 30, "city": "Shanghai" };
        // let tempFolder = NativeScriptObject.getNativeScriptObject(clientAPI).fileSystemModule.knownFolders.temp();
        // let documentPath = NativeScriptObject.getNativeScriptObject(clientAPI).fileSystemModule.path.join(tempFolder.path, '1234', 'data.json');// 共享目录
            
        // let content = JSON.stringify(jsonData, null, 2);
        // var documentFileObject = NativeScriptObject.getNativeScriptObject(clientAPI).fileSystemModule.File.fromPath(documentPath);

        // documentFileObject.writeText(content).then((result) => {
        // // Succeeded writing to the file.
        // console.log(result);

        // documentFileObject.readText().then((res) => {
        //     // Succeeded read from file.
        //     console.log(`File content:  ${res}`);
        // });
        // }).catch((err) => {
        //     console.log(err.stack);
        // });
    
}
