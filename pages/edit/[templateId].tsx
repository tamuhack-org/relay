import Editor from "@/components/editor/editor";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const templateId = router.query.templateId;
  const [initialTemplateJson, setInitialTemplateJson] = useState<string | null>(null);
  const [failedToFetchTemplate, setFailedToFetchTemplate] = useState(false);
  const [templateName, setTemplateName] = useState<string | null>(null);

  useEffect(() => {
    if (!templateId) {
      return;
    }
    async function fetchInitialTemplateJson()
    {
      const response = await fetch(`/api/template/${templateId}`);
      if (!response.ok) {
        setFailedToFetchTemplate(true);
        return;
      }
      const responseData = await response.json();
      setInitialTemplateJson(responseData.data);
      setTemplateName(responseData.name);
    }
    fetchInitialTemplateJson();
  }, [templateId]);

  function saveTemplate(data: string) {
    fetch(`/api/template/${templateId}`, {
      method: "POST",
      body: JSON.stringify({ name: templateName, data: data }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  if (!templateId) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <h1 className="text-4xl">Relay Editor</h1>
      {initialTemplateJson ?
        <div>
          <input className="border-2" type="text" value={templateName || ""} onChange={(e) => setTemplateName(e.target.value)} />
          <Editor templateJson={initialTemplateJson} saveTemplate={saveTemplate} exportHtml={(html: string) => {alert(html)}} />
        </div> :
        <div>Loading Template...</div>
      }
      {failedToFetchTemplate && <div>Failed to fetch template</div>}
    </>
  );
}
