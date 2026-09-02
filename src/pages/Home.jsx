import React, { useRef, useState } from "react";
import BasePage from "../layouts/BasePage";

import SvgCodeInput from "../components/svgToPng/SvgCodeInput";
import SvgCodePreview from "../components/svgToPng/SvgCodePreview";
import SvgFilesPreview from "../components/svgToPng/SvgFilesPreview";

import { downloadSvg } from "../utils/downloadSvg";

export default function SvgToPngPage() {
  const [svgCode, setSvgCode] = useState();
  const [svgFiles, setSvgFiles] = useState([]);

  const previewRef = useRef(null);
  const previewRefs = useRef({});

  return (
    <BasePage
      title="Free SVG to PNG converter"
      description="Convert SVG files to PNG with accurate dimensions and no distortion."
      canonical="https://suncodesapps.github.io/svgtopng/"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "SvgToPng",
        description: "Convert SVG files to PNG with accurate dimensions and no distortion.",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        url: "https://suncodesapps.github.io/svgtopng/",
      }}
    >
      {/* Hero */}
      <section className="py-10 text-center">
        <h1 className="text-4xl font-bold">SvgToPng</h1>

        <p className="mt-4 text-lg text-gray-600">
          Convert SVG files to PNG without distortion.
        </p>
      </section>

      {/* Input */}
      <section className="px-6 pb-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {/* Multiple files */}
          <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
            <SvgFilesPreview
              files={svgFiles}
              previewRefs={previewRefs}
              onChange={setSvgFiles}
            />
          </div>

          {/* SVG code */}
          <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
            <SvgCodeInput svg={svgCode} onChange={setSvgCode} />
            {svgCode && (
              <>
                {/* Code preview */}
                <div className="flex flex-col items-center mt-6 bg-checkred p-5">
                  <SvgCodePreview svg={svgCode} ref={previewRef} />

                  <button
                    onClick={() => downloadSvg(previewRef.current, "svgToPng")}
                    className="mt-6 rounded bg-black px-5 py-2 text-white"
                  >
                    Download
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </BasePage>
  );
}
