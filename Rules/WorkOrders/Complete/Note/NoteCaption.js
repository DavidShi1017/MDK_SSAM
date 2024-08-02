import WorkOrderCompletionLibrary from './WorkOrderCompletionLibrary';
import SupervisorLibrary from '../../Supervisor/SupervisorLibrary';

export default function NoteCaption(context) {
    let binding = WorkOrderCompletionLibrary.getInstance().getBinding(context);

    if (WorkOrderCompletionLibrary.getInstance().isWOFlow()) {
        return SupervisorLibrary.checkReviewRequired(context, binding).then((isReviewRequired) => { 
            if (isReviewRequired) {
                return context.localizeText('notes');
            } else {
                return context.read('/SAPAssetManager/Services/AssetManager.service', 'OrderTypes', [], `$filter=PlanningPlant eq '${binding.PlanningPlant}' and OrderType eq '${binding.OrderType}'`).then((result) => {
                    if (result.length > 0 && result.getItem(0).ServiceType === 'X') {
                        return context.localizeText('supervisor_name');
                    }
        
                    return context.localizeText('supervisor_name');
                });
            }
        });
    }

    if (WorkOrderCompletionLibrary.getInstance().isSubOperationFlow()) {
        return context.localizeText('supervisor_name');
    }

    if (WorkOrderCompletionLibrary.getInstance().isServiceOrderFlow()) {
        return SupervisorLibrary.checkReviewRequired(context, binding).then((isReviewRequired) => { 
            if (isReviewRequired) {
                return context.localizeText('notes');
            } else {
                return context.localizeText('supervisor_name');
            }
        });
    }
    
    if (WorkOrderCompletionLibrary.getInstance().isServiceItemFlow()) {
        return context.localizeText('supervisor_name');
    }

    return SupervisorLibrary.checkReviewRequired(context, binding).then((isReviewRequired) => { 
        if (isReviewRequired) {
            return context.localizeText('notes');
        } else {
            return context.localizeText('supervisor_name');
        }
    });
}
