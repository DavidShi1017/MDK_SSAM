import commonLib from '../Library/CommonLibrary';

export default function DetailsPageSystemCondition(context) {
    let statusObject;
    let binding = context.binding;
    if(binding.ZSystemCondition || binding.WOHeader.ZSystemCondition){
        return binding.ZSystemCondition + " - Shutdown";
    }

    return '-';
}

