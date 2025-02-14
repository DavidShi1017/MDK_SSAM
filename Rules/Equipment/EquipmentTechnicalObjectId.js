export default function EquipmentTechnicalObjectId(context) {
    if (context.binding.TechnicalID) {
        return context.localizeText('tech_id') + ': ' + context.binding.TechnicalID;
    }else if(context.binding.Equip_Nav.TechnicalID){
        return context.localizeText('tech_id') + ': ' + context.binding.Equip_Nav.TechnicalID;
    }
}
