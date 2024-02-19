import { MonoAPI } from '../../utils/mono';
import { rollInData } from "../../store";
import QRCode from "qrcode";

interface RollInResponseData {
    token: string;
    url: string;
    qr: string;
}

interface QRRollInResponse {
    success: boolean;
    data?: RollInResponseData;
}

export const getQR = async () => {
    try {
        const response: QRRollInResponse = await MonoAPI.rollIn();
        const { data, success } = response;

        if (!success || !data) {
            throw new Error('Failed to retrieve roll-in data');
        }

        const QRcode: string = await new Promise((resolve, reject) => {
            QRCode.toDataURL(
                data.url, { 
                    margin: 0, 
                    scale: 8, 
                    color: { 
                        dark: "#ffffff", 
                        light: "#00000000" 
                    } 
                }, 
                (err: any, url: string) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(url);
                    }
                }
            );
        });

        if (QRcode) {
            data.qr = QRcode;
        } else {
            throw new Error('Failed to generate QR code URL');
        }

        rollInData.set({ ...data, loading: false });

        return true;
    } catch (error) {
        console.error('Error while getting QR code:', error.message);
        return false;
    }
}
