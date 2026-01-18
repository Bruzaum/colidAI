import { useState } from "react";
import { TextInput } from "../components/TextInput";
import { FileInput } from "../components/FileInput";
import { Button } from "../components/Button";
import { JsonResponse } from "../components/JsonResponse";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { xmlToJson } from "../utils/xmlToJson";

export function Home() {
  const [name, setName] = useState("");
  const [xmlContent, setXmlContent] = useState("");
  const [jsonResult, setJsonResult] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProcess = async () => {
    if (!xmlContent) return;

    setIsLoading(true);
    setJsonResult(null);

    // Simula processamento (preparado pra async / worker)
    await new Promise((resolve) => setTimeout(resolve, 600));

    const json = xmlToJson(xmlContent);
    setJsonResult(json);
    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-8">
      <h1 className="text-3xl font-bold text-emerald-400">
        Processador de XML
      </h1>

      <TextInput label="Nome" value={name} onChange={setName} />

      <FileInput label="Arquivo XML" onFileLoad={setXmlContent} />

      <Button label="Processar" onClick={handleProcess} />

      {isLoading && <LoadingSpinner />}

      {!isLoading && <JsonResponse data={jsonResult} />}
    </div>
  );
}
