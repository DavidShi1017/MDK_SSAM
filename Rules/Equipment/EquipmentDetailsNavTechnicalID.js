import { EquipmentLibrary as libEquipment } from './EquipmentLibrary';
import Logger from '../Log/Logger';
import userFeaturesLib from '../UserFeatures/UserFeaturesLibrary';

export default function EquipmentDetailsNavTechnicalID(context) {
    let binding = context.binding;
    if(binding && binding.Equip_Nav.TechnicalID){
        return binding.Equip_Nav.TechnicalID;
    }
    return "";
   
}
