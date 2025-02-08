import commonLib from '../Library/CommonLibrary';

export default function DetailsPageSystemCondition(context) {
    const entityType = commonLib.getEntitySetName(context);
    let statusObject;
    let binding = context.binding;
    switch (entityType) {
        case 'MyWorkOrderHeaders':
            statusObject = context.binding.OrderMobileStatus_Nav;
            break;
        case 'MyWorkOrderOperations':
            statusObject = context.binding.OperationMobileStatus_Nav;
            break;
        case 'MyNotificationHeaders':
            statusObject = context.binding.NotifMobileStatus_Nav;
            break;
        default:
            break;
    }

    return {
        UserStatusText: 'X -',
        SystemStatusText: results[1].join(', ') || '-',
    };

}

