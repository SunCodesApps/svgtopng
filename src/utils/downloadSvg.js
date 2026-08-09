import { toPng } from "html-to-image";
import JSZip from "jszip";

export async function downloadSvg(element, filename) {
  const dataUrl = await toPng(element);

  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = dataUrl;
  link.click();
}

export async function downloadSvgPack(files, previewRefs) {
  const zip = new JSZip();

  for (const file of files) {
    const element = previewRefs.current[file.name];

    if (!element) continue;

    const dataUrl = await toPng(element);
    const base64 = dataUrl.split(",")[1];

    const filename = file.name.replace(/\.svg$/i, "");

    zip.file(`${filename}.png`, base64, {
      base64: true,
    });
  }

  const blob = await zip.generateAsync({
    type: "blob",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "svgtopng.zip";
  link.click();

  URL.revokeObjectURL(url);
}