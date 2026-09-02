import SvgFilesInput from "./SvgFilesInput";
import SvgCodePreview from "./SvgCodePreview";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import { downloadSvg, downloadSvgPack } from "../../utils/downloadSvg";

function SvgFilesPreview({ files, previewRefs, onChange }) {
  return (
    <>
      <SvgFilesInput onChange={onChange} />

      {files.length > 0 && (
        <>
          <div className="my-6 flex">
            <button
              onClick={() => downloadSvgPack(files, previewRefs)}
              className="rounded bg-black px-5 py-2 text-white"
            >
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              Download All
            </button>
          </div>

          <hr />

          <section className="p-5">
            <div className="flex flex-wrap items-start justify-center gap-8 mt-6">
              {files.map((file) => (
                <div key={file.name} className="flex flex-col items-center bg-checkred">
                  <h3 className="mb-3 font-medium text-gray-700">
                    {file.name}
                  </h3>

                  <SvgCodePreview
                    svg={file.svg}
                    ref={(element) => {
                      previewRefs.current[file.name] = element;
                    }}
                  />
                  <button
                    onClick={() =>
                      downloadSvg(
                        previewRefs.current[file.name],
                        file.name.replace(/\.svg$/i, "")
                      )
                    }
                    className="mt-4 rounded bg-black px-5 py-2 text-white"
                  >
                    <FontAwesomeIcon
                      icon={faDownload}
                      className="mr-2"
                    />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default SvgFilesPreview;