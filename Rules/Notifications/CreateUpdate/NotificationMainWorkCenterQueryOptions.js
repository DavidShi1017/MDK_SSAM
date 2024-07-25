import NotificationLibrary from '../NotificationLibrary';

export default function NotificationMainWorkCenterQueryOptions(context) {
    const defaultPlant = NotificationLibrary.NotificationCreateDefaultPlant(context);
    if (defaultPlant) {
        return `$filter=PlantId eq '${defaultPlant}'&$orderby=PlantId`;
    } else {
        return '$orderby=PlantId';
    }
}
