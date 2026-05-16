import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

export async function convertDocxToPdf(docxPath: string): Promise<string | null> {
  const ext = path.extname(docxPath).toLowerCase();
  if (ext !== '.docx' && ext !== '.doc') return null;

  const outputDir = path.dirname(docxPath);
  const baseName = path.basename(docxPath, ext);
  const pdfPath = path.join(outputDir, `${baseName}.pdf`);

  const libreofficeCmd = process.platform === 'darwin'
    ? '/Applications/LibreOffice.app/Contents/MacOS/soffice'
    : 'libreoffice';

  try {
    await execAsync(`which ${libreofficeCmd} 2>/dev/null || ls "${libreofficeCmd}" 2>/dev/null`);
  } catch {
    console.log('LibreOffice not found, skipping PDF conversion');
    return null;
  }

  try {
    await execAsync(
      `"${libreofficeCmd}" --headless --convert-to pdf --outdir "${outputDir}" "${docxPath}"`
    );
    if (fs.existsSync(pdfPath)) {
      return pdfPath;
    }
    return null;
  } catch (err) {
    console.error('PDF conversion failed:', err);
    return null;
  }
}
