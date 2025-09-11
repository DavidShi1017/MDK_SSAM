/**
* This rule first gets the child count for the current object, saves it and then calls navigation action to the hierarcy control page
* @param {IClientAPI} context
*/
import QueryBuilder from '../Common/Query/QueryBuilder';
import libCom from '../Common/Library/CommonLibrary';

export default async function EquipmentHierarchyPageNav(context) {
    const binding = context.getPageProxy().binding || {};

    let equipId = binding.EquipId;
    let funcLocId = binding.FuncLocIdIntern;
    let superiorEquipId = binding.SuperiorEquip;

    await context.read('/SAPAssetManager/Services/AssetManager.service', binding['@odata.id'], [], '').then(results => {
        if (results.length > 0) {
            funcLocId = results.getItem(0).FuncLocIdIntern;
            superiorEquipId = results.getItem(0).SuperiorEquip;
        }
    });

    const queryOptions = new QueryBuilder([`SuperiorEquip eq '${equipId}'`], '', '', ['orderby=SuperiorEquip']);

    const childCount = await libCom.getEntitySetCount(context, 'MyEquipments', queryOptions.build());

    binding.HC_ROOT_CHILDCOUNT = childCount;
    // workaround for MDK bug
    binding.FuncLocIdIntern = funcLocId;
    binding.SuperiorEquip = superiorEquipId;
    context.getPageProxy().setActionBinding(binding);

    return context.executeAction('/SAPAssetManager/Actions/HierarchyControl/HierarchyControlPageNav.action');
}
