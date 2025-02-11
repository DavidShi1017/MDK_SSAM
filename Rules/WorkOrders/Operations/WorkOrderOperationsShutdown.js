import libCommon from '../../Common/Library/CommonLibrary';
import ConfirmationsIsEnabled from '../../Confirmations/ConfirmationsIsEnabled';
import GenerateLocalConfirmationNum from '../../Confirmations/CreateUpdate/OnCommit/GenerateLocalConfirmationNum';
import SupervisorLibrary from '../../Supervisor/SupervisorLibrary';
import GenerateTimeEntryID from '../../TimeSheets/GenerateTimeEntryID';
import TimeSheetsIsEnabled from '../../TimeSheets/TimeSheetsIsEnabled';
import IsOperationLevelAssigmentType from './IsOperationLevelAssigmentType';

export default function WorkOrderOperationsShutdown(context) {
    context.getPageProxy().showActivityIndicator();

    const selectedOperations = libCommon.getStateVariable(context, 'selectedOperations');
    
    if (selectedOperations.length === 0) {
        context.getPageProxy().dismissActivityIndicator();
        return context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/WorkOrderOperationsNoSelectedMessage.action');
    }

    let failedOperations = [];
    let promiseArr = [];


    for (let i = 0; i < operationsConfirmations.length; i++) {
       
        promiseArr.push(Shutdown(context, item, failedOperations, i));
    }

    return Promise.all(promiseArr).then(() => {

    }).finally(() => {
        //context.getPageProxy().dismissActivityIndicator();
        ExecuteActionWithAutoSync(clientAPI, '/SAPAssetManager/Actions/CreateUpdateDelete/UpdateEntitySuccessMessage.action');
    });
}

function Shutdown(context, item, failedOperations) {


    return beforeOperationChangeStatusPromise.then(() => {       
        context.binding.OrderHeaderReadLink = "MyWorkOrderHeaders('" + item.OrderId + "')";
                    //return clientAPI.executeAction('/SAPAssetManager/Actions/WorkOrders/CreateUpdate/WorkOrderShutdown.action');
                    return clientAPI.executeAction({'Name': '/SAPAssetManager/Actions/WorkOrders/CreateUpdate/WorkOrderShutdown.action', 'Properties': {
                        'Target': {
                            'EntitySet': 'MyWorkOrderHeaders',
                            'Service': '/SAPAssetManager/Services/AssetManager.service',
                            'ReadLink': context.binding.OrderHeaderReadLink,
                        },
                        'Properties': {
                            'ZSystemCondition': 'X'
                        },
                    
                    }}).then( result => {
                        if(result){
                            //return ExecuteActionWithAutoSync(clientAPI, '/SAPAssetManager/Actions/CreateUpdateDelete/UpdateEntitySuccessMessage.action');
                        }
                    });
    }).catch((error) => {
        item.error = error;
        failedOperations.push(item);
        return null;
    });
}


function getConfirmationsDataPromises(context, selectedOperations) {
    const isTimesheetEnabled = !ConfirmationsIsEnabled(context) && TimeSheetsIsEnabled(context);
    return selectedOperations.map((selectedContext, i) => {
        return SupervisorLibrary.checkReviewRequired(context, selectedContext.binding).then(isReviewRequired => {
            isReviewRequired = isReviewRequired && IsOperationLevelAssigmentType(context);
            let keyGenerationAction;
            if (isTimesheetEnabled) {
                keyGenerationAction = GenerateTimeEntryID(context, i);
            } else {
                keyGenerationAction = GenerateLocalConfirmationNum(context, i);
            }

            return keyGenerationAction.then(key => {
                let binding = selectedContext.binding;
                const duration = calculateDuration(context);
                let startTime = new Date();

                if (binding.UserTimeEntry_Nav && binding.UserTimeEntry_Nav.length) {
                    startTime = binding.UserTimeEntry_Nav.reduce((acc, item) => {
                        if (item.PreferenceGroup === 'START_TIME') {
                            return item.PreferenceValue ? new Date(item.PreferenceValue) : acc;
                        } else if (item.PreferenceGroup === 'END_TIME') {
                            return new Date();
                        }
                        return acc;
                    }, new Date());
                } else {
                    startTime.setMinutes(startTime.getMinutes() - duration);
                }

                let confirmCreateProperties = {
                    ...binding,
                    OperationReadlink: binding['@odata.readLink'],
                    ConfirmationNum: key,
                    SubOperation: binding.SubOperation || '',
                    VarianceReason: '',
                    StartTime: startTime,
                    ActualDuration: duration.toString(),
                    ActualDurationUOM: 'MIN',
                    ActualWork: duration.toString(),
                    ActualWorkUOM: 'MIN',
                    ActivityType: binding.ActivityType || '',
                    AccountingIndicator: '',
                    Description: '',
                    RemainingWorkUOM: 'H',
                    CompleteFlag: '',
                    FinalConfirmation: isReviewRequired ? '' : 'X',
                    Operation: binding.OperationNo,
                    OrderID: binding.OrderId,
                    PersonnelNumber: '',
                    Plant: binding.MainWorkCenterPlant || '',
                    ReverseIndicator: '',
                    OrderType: binding.WOHeader && binding.WOHeader.OrderType,
                    OperationMobileStatus_Nav: binding.OperationMobileStatus_Nav,
                    OperationShortText: binding.OperationShortText,
                    isReviewRequired: isReviewRequired,
                    Hours: 0.15,
                };
                let operationsToConfirm = libCommon.getStateVariable(context, 'OperationsToConfirm') || [];
                operationsToConfirm.push({
                    ...confirmCreateProperties,
                    WorkOrderHeader: binding.WOHeader,
                });
                libCommon.setStateVariable(context, 'OperationsToConfirm', operationsToConfirm);
            });
        });
    });
}

function calculateDuration(context) {
    const validNumbers = [1,5,10,15,30];
    let duration;

    if (TimeSheetsIsEnabled(context)) {
        duration = libCommon.getAppParam(context, 'TIMESHEET', 'CATSMinutesInterval');
    } else {
        duration = libCommon.getAppParam(context, 'PMCONFIRMATION', 'LaborTimeMinutesInterval');
    }

    duration = parseInt(Number(duration));

    if ((validNumbers.includes(duration))) {
        return duration;
    }

    return 15;
}
