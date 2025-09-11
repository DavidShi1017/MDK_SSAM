/**
* Get Sync State
* @param {IClientAPI} context
*/
import IsAutoSyncInProgress from './IsAutoSyncInProgress';

export default function SyncIcon(context) {
    return IsAutoSyncInProgress(context) ?
        '$(PLT, /SAPAssetManager/Images/auto-sync.pdf, /SAPAssetManager/Images/auto-sync.android.png)' :
        '$(PLT, sap-icon://synchronize, sap-icon://synchronize)';
}
