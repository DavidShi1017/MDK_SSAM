import commonLib from '../Library/CommonLibrary';

export default function DetailsPageSystemCondition(context) {
    let statusObject;
    let binding = context.binding;
    if(binding.ZSystemCondition && binding.ZSystemCondition === 'X'){
        return binding.ZSystemCondition + " - Shutdown";
    }else{
        if(binding.WOHeader && binding.WOHeader.ZSystemCondition && binding.WOHeader.ZSystemCondition === 'X'){
            return binding.WOHeader.ZSystemCondition + " - Shutdown";
        }
    }

    return '-';
}

