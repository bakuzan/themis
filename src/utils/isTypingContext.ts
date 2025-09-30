export default function isTypingContext(el: Element | null): boolean {
  if (!el) {
    return false;
  }

  const tag = el.tagName.toUpperCase();
  const editable = (el as HTMLElement).isContentEditable;

  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || editable;
}
