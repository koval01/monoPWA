export const hashValue = async (val: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(val);
    const buffer = await crypto.subtle.digest('SHA-256', data);
    
    const hexArray = Array.from(new Uint8Array(buffer)).map(b =>
      b.toString(16).padStart(2, '0')
    );
    
    return hexArray.join('');
}
