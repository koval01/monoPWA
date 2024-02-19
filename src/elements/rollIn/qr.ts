import { MonoAPI } from '../../utils/mono';
import { rollInData } from "../../store";
import QRCode from "qrcode";

interface RollInResponse {
    success: boolean;
    data?: {
        token: string;
        url: string;
        qr?: string;
    };
}

export const getQR = async () => {
    try {
        const response: RollInResponse = await MonoAPI.rollIn();
        const { data, success } = response;

        if (!success || !data) {
            throw new Error('Failed to retrieve roll-in data');
        }

        rollInData.set({ token: data.token, loading: false });

        const url: string = await new Promise((resolve, reject) => {
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

        if (url) {
            data.qr = url;
        } else {
            throw new Error('Failed to generate QR code URL');
        }
    } catch (error) {
        console.error('Error while getting QR code:', error.message);
    }
}
