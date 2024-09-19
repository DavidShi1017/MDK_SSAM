import {FDCSectionHelper} from '../../../FDC/DynamicPageGenerator';
import InspectionPointUpdateValidation from './InspectionPointUpdateValidation';
import InspectionPointsChangeSetOnSuccess from './InspectionPointsChangeSetOnSuccess';
import libVal from '../../../Common/Library/ValidationLibrary';
import Logger from '../../../Log/Logger';
export default function InspectionPointsFDCUpdateDone(context) {
    let fdcHelper = new FDCSectionHelper(context);
    // Validate all sections first
    //eslint-disable-next-line no-unused-vars
    return fdcHelper.run((sectionBinding, section) => {
        return InspectionPointUpdateValidation(context, section);
    }).then(validationPass => {
        if (validationPass.every(value => value === true)) {
            return fdcHelper.run(async sectionBinding => {
                let createLinks = [];
                let client_data = sectionBinding.ClientData;
                Logger.debug("client_data-----" + client_data);
                let plant = sectionBinding.Plant;
                Logger.debug("plant-----" + plant);
                if (Object.prototype.hasOwnProperty.call(sectionBinding,'InspCode_Nav') && libVal.evalIsEmpty(sectionBinding.InspCode_Nav)) {
                    createLinks.push({
                        'Property': 'InspCode_Nav',
                        'Target': {
                            'EntitySet': 'InspectionCodes',
                            'ReadLink': `InspectionCodes(Plant='${sectionBinding.ClientData.Plant}',SelectedSet='${sectionBinding.ClientData.ValSelectedSet}',Catalog='${sectionBinding.ClientData.ValCatalog}',CodeGroup='${sectionBinding.ClientData.ValCodeGroup}',Code='${sectionBinding.ClientData.ValCode}')`,
                        },
                    });
                }
        
                if (Object.prototype.hasOwnProperty.call(sectionBinding,'InspValuation_Nav') && (libVal.evalIsEmpty(sectionBinding.InspValuation_Nav) || libVal.evalIsEmpty(sectionBinding.InspValuation_Nav.Valuation))) {
                    createLinks.push({
                        'Property': 'InspValuation_Nav',
                        'Target': {
                            'EntitySet': 'InspectionCatalogValuations',
                            'ReadLink': `InspectionCatalogValuations('${sectionBinding.ClientData.Valuation}')`,
                        },
                    });
                }

                let updateLinks = [];
                if (Object.prototype.hasOwnProperty.call(sectionBinding,'InspCode_Nav') && !libVal.evalIsEmpty(sectionBinding.InspCode_Nav)) {
                    let plant = libVal.evalIsEmpty(sectionBinding.ClientData.Plant)? sectionBinding.Plant : sectionBinding.ClientData.Plant;
                    let valSelectedSet = libVal.evalIsEmpty(sectionBinding.ClientData.ValSelectedSet)? sectionBinding.ValSelectedSet : sectionBinding.ClientData.ValSelectedSet;
                    let valCatalog = libVal.evalIsEmpty(sectionBinding.ClientData.ValCatalog)? sectionBinding.ValCatalog : sectionBinding.ClientData.ValCatalog;
                    let valCodeGroup = libVal.evalIsEmpty(sectionBinding.ClientData.ValCodeGroup)? sectionBinding.ValCodeGroup : sectionBinding.ClientData.ValCodeGroup;
                    let valCode = libVal.evalIsEmpty(sectionBinding.ClientData.ValCode)? sectionBinding.ValCode : sectionBinding.ClientData.ValCode;
                    updateLinks.push({
                        'Property': 'InspCode_Nav',
                        'Target': {
                            'EntitySet': 'InspectionCodes',
                            'ReadLink': `InspectionCodes(Plant='${plant}',SelectedSet='${valSelectedSet}',Catalog='${valCatalog}',CodeGroup='${valCodeGroup}',Code='${valCode}')`,
                        },
                        // 'Properties':
                        // {
                        //     'CodeDesc': sectionBinding.InspCode_Nav.CodeDesc,
                        //     'ValuationStatus': sectionBinding.InspCode_Nav.ValuationStatus,
                        // },
                    });
                }
                if (Object.prototype.hasOwnProperty.call(sectionBinding,'InspCode_Nav') && !libVal.evalIsEmpty(sectionBinding.InspValuation_Nav)) {
                    updateLinks.push({
                        'Property': 'InspValuation_Nav',
                        'Target': {
                            'EntitySet': 'InspectionCatalogValuations',
                            'ReadLink': `InspectionCatalogValuations('${sectionBinding.ClientData.Valuation}')`,
                        },
                    });
                }

                return context.executeAction({'Name': '/SAPAssetManager/Actions/WorkOrders/Operations/InspectionPoints/InspectionPointValuationUpdate.action', 'Properties': {
                    'Target':
                    {
                        'EntitySet' : 'InspectionPoints',
                        'Service' : '/SAPAssetManager/Services/AssetManager.service',
                        'ReadLink': sectionBinding['@odata.readLink'],
                    },
                    'Properties':
                    {
                        'ValSelectedSet': sectionBinding.ClientData.ValSelectedSet,
                        'ValCatalog': sectionBinding.ClientData.ValCatalog,
                        'ValCode': sectionBinding.ClientData.ValCode,
                        'ValCodeGroup': sectionBinding.ClientData.ValCodeGroup,
                        'ValuationStatus': sectionBinding.ClientData.Valuation,
                        'Plant': sectionBinding.ClientData.Plant,
                    },
                    'Headers':
                    {
                        'OfflineOData.TransactionID': '{{#Property:InspectionLot}}',
                    },
                    'ValidationRule': '',
                    'CreateLinks': createLinks,
                    'UpdateLinks': updateLinks,
                    'DeleteLinks':  `InspectionCodes(Plant='${plant}',SelectedSet='${valSelectedSet}',Catalog='${valCatalog}',CodeGroup='${valCodeGroup}',Code='${valCode}')`,
                }}).catch(() => {
                    return Promise.resolve();
                });
            });
        }
        return Promise.resolve();
    }).then(() => {
        return InspectionPointsChangeSetOnSuccess(context);
    });

}
