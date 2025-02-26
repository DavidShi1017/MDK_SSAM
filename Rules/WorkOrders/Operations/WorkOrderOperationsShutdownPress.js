import libCommon from '../../Common/Library/CommonLibrary';
import ConfirmationsIsEnabled from '../../Confirmations/ConfirmationsIsEnabled';
import GenerateLocalConfirmationNum from '../../Confirmations/CreateUpdate/OnCommit/GenerateLocalConfirmationNum';
import SupervisorLibrary from '../../Supervisor/SupervisorLibrary';
import GenerateTimeEntryID from '../../TimeSheets/GenerateTimeEntryID';
import TimeSheetsIsEnabled from '../../TimeSheets/TimeSheetsIsEnabled';
import IsOperationLevelAssigmentType from './IsOperationLevelAssigmentType';
import ExecuteActionWithAutoSync from '../../ApplicationEvents/AutoSync/ExecuteActionWithAutoSync';
export default function WorkOrderOperationsShutdown(context) {
    context.getPageProxy().showActivityIndicator();

    const selectedOperations = libCommon.getStateVariable(context, 'selectedOperations');
    
    if (selectedOperations.length === 0) {
        context.getPageProxy().dismissActivityIndicator();
        return context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/WorkOrderOperationsNoSelectedMessage.action');
    }else{
        return context.executeAction(
            {
                'Name': '/SAPAssetManager/Actions/Common/GenericWarningDialog.action',
                'Properties': {
                    'Title': 'Shutdown',
                    'Message': 'Do you want to Shutdown these Work Order?',
                    'OKCaption': context.localizeText('ok'),
                    'CancelCaption': context.localizeText('cancel'),
                    'OnOK': '/SAPAssetManager/Rules/WorkOrders/Operations/WorkOrderOperationsShutdown.js',
                },
            },
        );    
        
    }
}
