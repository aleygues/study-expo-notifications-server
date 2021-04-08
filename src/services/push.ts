import { Expo } from 'expo-server-sdk';

export class PushService {
    private static expo = new Expo();

    public static sendNewMessage(registrationIds: string[], message: string, messageId: string) {
        return this.sendNotification(registrationIds, `Nouveau message`, message, { messageId });
    }

    private static async sendNotification(registrationIds: string[], title: string, body: string, data: any) {
        try {
            const ticketChunk = await this.expo.sendPushNotificationsAsync([{
                title,
                body,
                data,
                to: registrationIds
            }]);
            console.log(ticketChunk);
        } catch (e) {
            console.error(e);
        }
    }
}
