import libPersona from '../Persona/PersonaLibrary';

export default function WorkOrderIdDisplayValue(context) {
    const isFST = libPersona.isFieldServiceTechnician(context);

    return isFST ? context.localizeText('serviceorder_id') : 'Work Order ID Ascd';
}
