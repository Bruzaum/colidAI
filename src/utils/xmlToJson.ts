export function xmlToJson(xmlString: string) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, "application/xml");

  function parseNode(node: Element): any {
    const obj: any = {};

    // atributos
    if (node.attributes.length > 0) {
      obj["@attributes"] = {};
      Array.from(node.attributes).forEach((attr) => {
        obj["@attributes"][attr.name] = attr.value;
      });
    }

    // filhos
    Array.from(node.children).forEach((child) => {
      const childObj = parseNode(child);

      if (obj[child.nodeName]) {
        if (!Array.isArray(obj[child.nodeName])) {
          obj[child.nodeName] = [obj[child.nodeName]];
        }
        obj[child.nodeName].push(childObj);
      } else {
        obj[child.nodeName] = childObj;
      }
    });

    // texto
    const text = node.textContent?.trim();
    if (node.children.length === 0 && text) {
      return text;
    }

    return obj;
  }

  return {
    [xml.documentElement.nodeName]: parseNode(xml.documentElement),
  };
}
