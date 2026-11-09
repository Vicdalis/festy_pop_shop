import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'FestyPOP | Piñatería y artículos para fiestas en Caracas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Imagen por defecto para compartir (Open Graph y Twitter); las paginas sin imagen propia la heredan
export default async function OpengraphImage() {
    const logo = await readFile(path.join(process.cwd(), 'public/brand/logo_fiesta3.png'));
    const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #8a3dc1 0%, #e7467d 100%)',
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoSrc} width={980} height={286} alt="" />
                <div style={{ marginTop: 24, fontSize: 40, fontWeight: 700, color: 'white' }}>
                    Piñatería y artículos para fiestas en Caracas
                </div>
            </div>
        ),
        size,
    );
}
