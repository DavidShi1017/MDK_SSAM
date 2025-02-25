import libVal from '../../Common/Library/ValidationLibrary';

export default function NotificationDetailsActivityType(context) {
    var binding = context.binding;
    if (libVal.evalIsEmpty(binding.ZMaintActivType)) {
        return '-';
    }

    return binding.ZMaintActivType;
}
