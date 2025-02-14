import commonLib from '../Library/CommonLibrary';

export default function DetailsPageSystemCondition(context) {
    let statusObject;
    let binding = context.binding;
    var id ;
    if(binding.OrderId){
        id = binding.OrderId
    }else{
        id = binding.WOHeader.OrderId;
    }
    let filterQuery = `$filter=OrderId eq '${id}'`;
    return context.read('/SAPAssetManager/Services/AssetManager.service', 'MyWorkOrderHeaders', [], filterQuery).then(function(result) {
        if (result && result.length > 0 && result.getItem(0)) {
           if(result.getItem(0).ZSystemCondition){
                return result.getItem(0).ZSystemCondition + " - Shutdown";
           }
        }
        return '-';
    });
    //if(binding.ZSystemCondition && binding.ZSystemCondition === 'X'){
    //    return binding.ZSystemCondition + " - Shutdown";
    //}else{
    //    if(binding.WOHeader && binding.WOHeader.ZSystemCondition && binding.WOHeader.ZSystemCondition === 'X'){
            return binding.WOHeader.ZSystemCondition + " - Shutdown";
    //    }
    //}

    //return '-';
}

