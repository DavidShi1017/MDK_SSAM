import libCommon from '../../../Common/Library/CommonLibrary';

export default function IsWONotificationComplete(context, binding) {
    if (binding) {
        return context.read('/SAPAssetManager/Services/AssetManager.service', `MyNotificationHeaders('${binding.NotifNum}')`, [], '$expand=Items,Items/ItemCauses').then(results => {
            if (results && results.length > 0) {
                let notif = results.getItem(0);
                if(notif && notif.Items && notif.Items.length > 0){
                    let item = notif.Items[0];
                    if(item.DamageCode === ''){
                        return Promise.resolve(false);                                                             
                    }
                    if(item.ObjectPartCodeGroup === ''){
                        return Promise.resolve(false);    
                    }
                    let cause = item.ItemCauses[0]
                    if(cause.CauseCode === ''){
                        return Promise.resolve(false);    
                    }
                }else{
                    return Promise.resolve(false);    
                }
                return Promise.resolve(true);    
            }
            return Promise.resolve(false);    
        });
    }

    return Promise.resolve(false);
}
