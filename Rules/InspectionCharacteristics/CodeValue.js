import {ValueIfExists} from '../Common/Library/Formatter';

export default function CodeValue(context) {
    if (context.binding.QuantitativeFlag) {
        return context.formatNumber(context.binding.ResultValue, '');
    } else {
        return ValueIfExists(context.binding.InspectionCode_Nav, '-', function(value) {
            if(!context.binding.Valuation){
                return '';
            }
            return value.CodeDesc;
        });
    }
}
