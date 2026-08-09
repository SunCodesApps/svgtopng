function SvgFileInput({ onChange }) {
  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const svgFiles = files
      .filter(
        (file) =>
          file.type === "image/svg+xml" ||
          file.name.toLowerCase().endsWith(".svg")
      )
      .map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
              resolve({
                name: file.name,
                svg: reader.result,
              });
            };

            reader.onerror = reject;

            reader.readAsText(file);
          })
      );

    Promise.all(svgFiles)
      .then(onChange)
      .catch((error) => {
        console.error("Error reading SVG files:", error);
      });
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="svg_files"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        SVG Files
      </label>

      <input
        id="svg_files"
        type="file"
        accept=".svg,image/svg+xml"
        multiple
        onChange={handleChange}
        className="block w-full rounded border border-gray-300 px-3 py-2 text-sm"
      />
    </div>
  );
}

export default SvgFileInput;