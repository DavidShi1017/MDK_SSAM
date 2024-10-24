import CommonLibrary from '../../../Common/Library/CommonLibrary';
import WorkOrderCompletionLibrary from '../../../WorkOrders/Complete/WorkOrderCompletionLibrary';

export default async function NavOnCompleteServiceItemPage(context, actionBinding) {
    let binding = actionBinding || CommonLibrary.getBindingObject(context);

    WorkOrderCompletionLibrary.getInstance().setCompletionFlow('service_item');
    await WorkOrderCompletionLibrary.getInstance().initSteps(context);
    WorkOrderCompletionLibrary.getInstance().setBinding(context, binding);
    WorkOrderCompletionLibrary.getInstance().setCompleteFlag(context, true);

    return WorkOrderCompletionLibrary.getInstance().openMainPage(context, false);
}
