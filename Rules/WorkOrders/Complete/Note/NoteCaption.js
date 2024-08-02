import WorkOrderCompletionLibrary from '.././WorkOrderCompletionLibrary';
import SupervisorLibrary from '../../../Supervisor/SupervisorLibrary';

export default function NoteCaption(context) {
    let binding = WorkOrderCompletionLibrary.getInstance().getBinding(context);

    return SupervisorLibrary.checkReviewRequired(context, binding).then((isReviewRequired) => { 
        if (isReviewRequired) {
            return context.localizeText('notes');
        } else {
            return context.localizeText('supervisor_name');
        }
    });
}
