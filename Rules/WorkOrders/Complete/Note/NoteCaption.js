/*
*&---------------------------------------------------------------------*
*&                         MODIFICATION HISTORY                        *
*&---------------------------------------------------------------------*
*&    Date     | Modified By | Description                             *
*&---------------------------------------------------------------------*
*& 23.04.2026    JBATALLONES   SRV000879 / CRQ000305 / CHG00032371     *
*&                             Reverted changes. Logic is retained     *
*&                             and commented out for future reference. *
*&---------------------------------------------------------------------*
*/
import WorkOrderCompletionLibrary from '.././WorkOrderCompletionLibrary';
import SupervisorLibrary from '../../../Supervisor/SupervisorLibrary';

export default function NoteCaption(context) {
    let binding = WorkOrderCompletionLibrary.getInstance().getBinding(context);

    return SupervisorLibrary.checkReviewRequired(context, binding).then((isReviewRequired) => { 
        if (isReviewRequired) {
            return context.localizeText('notes');
        } else {
// BEGIN of DEL - SRV000879 -  JBATALLONES - 23.04.2026
// Revert the changes made under this change request and reinstate old logic.
// The original logic is added after this comment block
//           if(binding.WOHeader){
//               let orderType = binding.WOHeader.OrderType;
//               if('KM01' === orderType || 'KM03' === orderType){
//                   return context.localizeText('notes');
//               }else{
//                   return context.localizeText('supervisor_name');
//               }
//           }
//          return context.localizeText('notes');
//
// END of DEL - SRV000879 -  JBATALLONES - 23.04.2026
            if(binding.WOHeader){
                let orderType = binding.WOHeader.OrderType;
                if('KM01' === orderType || 'KM03' === orderType){
                    return context.localizeText('notes');
                }else{
                    return context.localizeText('supervisor_name');
                }
            }
            return context.localizeText('supervisor_name');
        }
    });
}
