export default function PDF() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="mt-30 mb-30">
        <object
          data="/assets/images/Top 10 Most Wanted Skills.pdf"
          type="application/pdf"
          width="100%"
          height="700px"
        >
          <p className="text-center">
            您的浏览器不支持 PDF 文件。{" "}
            <a
              className="underline"
              href="/assets/images/Top 10 Most Wanted Skills.pdf"
            >
              下载 PDF
            </a>
            。
          </p>
        </object>
      </div>
    </div>
  );
}
