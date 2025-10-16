import libCom from '../../Common/Library/CommonLibrary';
import ConfirmationCreateUpdateNav from './ConfirmationCreateUpdateNav';
import ODataDate from '../../Common/Date/ODataDate';
import OperationMobileStatus from '../../MobileStatus/OperationMobileStatus';
// Sets default order, operation and current datetime to binding before navigation to confirmation creation
export default function ConfirmationCreateFromOperation(context) {

    // let status = OperationMobileStatus(context);
    // let woStarted = libCom.getAppParam(context, 'MOBILESTATUS', context.getGlobalDefinition('/SAPAssetManager/Globals/MobileStatus/ParameterNames/StartParameterName.global').getValue());
    // let woStartedLocalizeText = context.localizeText(woStarted) 
    // if(status !== woStartedLocalizeText){
    //     return context.executeAction(
    //         {
    //             'Name': '/SAPAssetManager/Actions/Common/GenericErrorDialog.action',
    //             'Properties': {
    //                 'Title': context.localizeText('validation_warning'),
    //                 'Message': 'test',
    //                 'OKCaption': context.localizeText('close'),
    //             },
    //         },
    //     );
    // }else{
        let currentDate = new Date();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        if (hours < 10) hours = `0${hours}`;
        if (minutes < 10) minutes = `0${minutes}`;
        let timeStr = `${hours}:${minutes}:00`;
        let postingDate = context.getBindingObject().PostingDate;
        let odataDate = new ODataDate(postingDate, timeStr);
        let binding = context.binding;
        let actionBinding;
        if (context.getPageProxy() && context.getPageProxy().getActionBinding()) {
            actionBinding = context.getPageProxy().getActionBinding();
        }
        if (!binding || (actionBinding && binding.OrderId !== actionBinding.OrderId)) {
            binding = actionBinding;
        }
        let override = {
            'PostingDate': odataDate,
            'Operation': binding.OperationNo,
            'OrderID': binding.OrderId,
            'IsWorkOrderChangable': false,
            'IsOperationChangable': false,
        };

        return ConfirmationCreateUpdateNav(context, override, odataDate.date(), odataDate.date());
    //}

}
