export class ViewGenerator {
  tagName: string;
  attributes: Record<string, string>;
  children: (ViewGenerator | string)[];
  eventListeners: Record<string, EventListener[]>;
  constructor(
    tagName: string,
    attributes: Record<string, string> = {},
    children: (ViewGenerator | string)[] = [],
  ) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.children = children;
    this.eventListeners = {};
  }

  generate(): string {
    const attributeString = Object.entries(this.attributes)
      .map(([key, value]) => `${key}='${value}'`)
      .join(' ');

    const childHTML = this.children
      .map((child) => {
        if (child instanceof ViewGenerator)
          return child.generate();
        else
          return child;
      })
      .join('');

    return `<${this.tagName} ${attributeString}>${childHTML}</${this.tagName}>`;
  }

  parse() {
    const htmlString = this.generate();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.firstChild as HTMLElement;
  }

  addEventListener(eventType: string, listener: EventListener): void {
    if (!this.eventListeners[eventType])
      this.eventListeners[eventType] = [];

    this.eventListeners[eventType].push(listener);
  }

  attachEventListeners(element: HTMLElement): void {
    Object.entries(this.eventListeners).forEach(([eventType, listeners]) => {
      listeners.forEach((listener) => {
        element.addEventListener(eventType, listener);
      });
    });
  }
}
